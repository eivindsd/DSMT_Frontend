import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import ChatPage from "../ChatComponent/ChatPage";
import { LoggedInContext } from "../LoggedInContext";
import { Alert } from '@mui/material';


const theme = createTheme();

const Login = () => {

    const [name, setName] = useState<string>("");
    const [missingName, setMissingName] = useState(false);

    const { isLoggedIn, setIsLoggedIn, setUserName } = React.useContext(LoggedInContext);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(name) {
            setIsLoggedIn(true);
            setUserName(name); 
            setMissingName(false);
        }
        setMissingName(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };


  return (
    <div>
      {isLoggedIn && <ChatPage />}
      {!isLoggedIn && (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Join chat app
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleNameChange}
              />
              { missingName && (
                <Alert severity="error">Insert username</Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log in
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      )}
    </div>
  );
}

export default Login;