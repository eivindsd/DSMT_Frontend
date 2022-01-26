import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from "react-router-dom";

interface Message {
    name: string;
    message: string;
}

const ChatRoom = () => {
    const {userName} = useContext(LoggedInContext);
    let {name} = useParams();
    const [message, setMessage] = useState<string|undefined>();
    const [messages, setMessages] = useState<(Message|undefined)[]>([]);
    const [emptyMessage, setEmptyMessage] = useState<boolean>(false);
    const [users, setUsers] = useState<(string|undefined)[]>([]);

    useEffect(() => {
        const getUsersAndMessages = async () => {
            if(name) {
                setUsers(await (await axios.get(`http://localhost:8080/api/joinroom/${name}`)).data);
            }
          }
        getUsersAndMessages();
      }, []);

     setTimeout(async () => {
         setMessages(await (await axios.get(`http://localhost:8080/api/getmessages`)).data);
     }, 10000)
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(message) {
            await axios.post("http://localhost:8080/api/sendmessage", {
                message: message
            });
            //setMessages([...messages, message])
            setEmptyMessage(false);
        }
        else {
            setEmptyMessage(true);
        }
      }

      const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
      };

      const leaveRoom = async () => {
        await axios.get("http://localhost:8080/api/exitroom");
      }

      const checkIfEqual = (nameOfMesseger: string | undefined) => {
          console.log("Navnet på avsender " + nameOfMesseger?.substring(1, nameOfMesseger?.length - 1));
          console.log("Navnet på bruker " + userName);
        if (nameOfMesseger?.substring(1, nameOfMesseger?.length - 1) === userName) {
            console.log("Its true")
            return true;
        }else {
            console.log("Its false");
            return false;
        }
      }
    return (
        <div>
            <Header />
            <Typography 
                style={{fontSize: "50px", fontFamily: "'Indie Flower', cursive", textAlign: "center"}}>
                    &#128075; {name} &#128172;  
            </Typography>
            <Button 
                variant="contained" 
                style={{marginLeft: "90%"}}>
                <Link to="/" onClick={leaveRoom} style={{ textDecoration: 'none', color: 'white'}}>Exit room</Link>
            </Button>
            <Divider style={{marginTop: "1vw"}}/>
            <Box style={{height: "300px", display: 'flex', flexDirection: 'row'}}>
            <List style={{width: "25%"}} 
                  sx={{
                        width: "100%",
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        }} 
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Users in the chatroom
                    </ListSubheader>
                    }
                >
                    {users && users.map((user)=> (
                        <Stack direction="row" style={{marginTop: "1vw", marginLeft: "1vw"}}>
                            <Chip 
                                avatar={<Avatar style={{fontFamily: "'Swanky and Moo Moo', cursive", fontSize: "18px"}}>{user?.charAt(0)}</Avatar>} 
                                label={user} color="primary" 
                                style={{fontFamily: "'Itim', cursive"}}></Chip>
                        </Stack>
                    ))}
                </List>
                <Divider style={{marginRight: "1vw"}}/>
                <List style={{flexGrow: 5}} sx={{
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
                                avatar={<Avatar style={{fontFamily: "'Swanky and Moo Moo', cursive", fontSize: "18px"}}>{message?.name?.charAt(1)}</Avatar>} 
                                label={message?.message.substring(1, message.message.length - 1)} 
                                color={ checkIfEqual(message?.name) ? "info" : "primary"} 
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