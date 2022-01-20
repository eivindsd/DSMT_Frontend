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
import SendIcon from '@material-ui/icons/Send';


const ChatRoom = () => {

    const [message, setMessage] = useState<string | undefined>();
    const [messages, setMessages] = useState<(string|undefined)[]>([]);

    const {userName} = useContext(LoggedInContext);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessages([...messages, message])
      }

      const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
      };

    return (
        <div>
            <Box style={{height: "300px"}}>
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
                            <Chip avatar={<Avatar>{userName?.charAt(0)}</Avatar>} label={message} color="primary"></Chip>
                        </Stack>
                    ))}
                </List>
            </Box>
            <Divider style={{marginTop: "2vw"}}/>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Stack direction="column">
                    <TextField
                        style={{width: "25%", marginLeft: "1vw"}}
                        margin="normal"
                        label="Message"
                        onChange={handleMessageChange}
                    />
                    <Button
                        style={{width: "25%", marginLeft: "1vw"}}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 1 }}
                    >
                        Send message 
                        <SendIcon />
                    </Button>
                </Stack>
                
            </Box>
        </div>
    );
};

export default ChatRoom;