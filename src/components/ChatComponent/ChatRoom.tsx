import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';

const ChatRoom = () => {

    const [message, setMessage] = useState<string | undefined>();
    const [messages, setMessages] = useState<(string|undefined)[]>([]);
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessages([...messages, message])
        console.log(messages);
      }

      const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
      };

    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {messages && messages.map((message)=> (
                    <p>{message}</p>
                ))}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Message"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    onChange={handleMessageChange}
                />
                {/* { missingName && (
                    <Alert severity="error">Insert username</Alert>
                )} */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Send message
                </Button>
            </Box>
        </div>
    );
};

export default ChatRoom;