import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import { LoggedInContext } from '../LoggedInContext';
import { Divider } from '@material-ui/core';
import Header from '../HeaderComponent/Header';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';


const ChatRoom = () => {
    let {name} = useParams();
    const [message, setMessage] = useState<string|undefined>();
    const [messages, setMessages] = useState<(string|undefined)[]>([]);
    const [emptyMessage, setEmptyMessage] = useState<boolean>(false);
    const {userName} = useContext(LoggedInContext);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(message) {
            setMessages([...messages, message])
            setEmptyMessage(false);
        }
        else {
            setEmptyMessage(true);
        }
      }

      const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
      };

    return (
        <div>
            <Header />
            <Typography style={{fontSize: "50px", fontFamily: "'Indie Flower', cursive", textAlign: "center"}}>&#128075; {name} &#128172;</Typography>
            <Divider style={{marginTop: "1vw"}}/>
            <Box style={{height: "300px",}}>
                <List sx={{
                        width: "100%",
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        }} 
                >
                    {messages && messages.map((message)=> (
                        <Stack direction="row" style={{marginTop: "1vw", marginLeft: "1vw"}}>
                            <Chip 
                                avatar={<Avatar>{userName?.charAt(0)}</Avatar>} 
                                label={message} color="primary" 
                                style={{fontFamily: "'Itim', cursive"}}></Chip>
                        </Stack>
                    ))}
                </List>
            </Box>
            <Divider style={{marginTop: "2vw"}}/>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Stack direction="column">
                    <TextField
                        style={{marginLeft: "1vw", marginRight: "1vw"}}
                        margin="normal"
                        label="Message"
                        onChange={handleMessageChange}
                    />
                    { emptyMessage && 
                        (<Alert severity="error">Empty messages are not allowed &#128548;</Alert>)}
                    <Button
                        style={{marginLeft: "1vw", marginRight: "1vw", fontSize: "15px"}}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Send message to room &#9997;
                    </Button>
                </Stack>
            </Box>
        </div>
    );
};

export default ChatRoom;