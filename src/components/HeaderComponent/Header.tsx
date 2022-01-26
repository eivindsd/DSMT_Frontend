import { useContext }  from 'react';
import { LoggedInContext } from "../LoggedInContext";
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import axios from 'axios';


const Header = () => {
    const { setIsLoggedIn, userName, setChatRooms} = useContext(LoggedInContext);

    const getRooms = async () => {
        setChatRooms(await (await axios.get("http://localhost:8080/api/rooms")).data);
      }
     
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h5" onClick={getRooms} component="div" sx={{ flexGrow: 1 }} style={{fontFamily: "'Fontdiner Swanky', cursive", cursor: "pointer"}}>
                             ChatApp
                        </Typography>
                        <Typography  variant="h5" component="div" sx={{ flexGrow: 1 }} style={{fontFamily: "'Swanky and Moo Moo', cursive", fontSize: "30px"}}>
                            &#128123; - {userName}
                        </Typography>
                        <Button 
                            color="inherit" 
                            onClick={() => setIsLoggedIn(false)}>
                                <Link 
                                    to={`/`} 
                                    style={{ textDecoration: 'none', color: 'white', fontFamily: "'Orbitron', sans-serif" }}>
                                        Logout &#128405;
                                </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default Header;