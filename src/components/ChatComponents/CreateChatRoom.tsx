import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { LoggedInContext } from '../LoggedInContext';
import { Button } from '@mui/material';

const CreateChatRoom = () => {
    const [newRoom, setNewRoom] = useState<string|undefined>();
    const [missingName, setMissingName] = useState(false);
    const [exists, setExists] = useState(false);
    const {chatRooms, setChatRooms} = useContext(LoggedInContext);
    
    const handleNewRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoom(e.currentTarget.value);
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if(newRoom && !chatRooms.includes(newRoom)) {
            setChatRooms([...chatRooms, newRoom]);
            setMissingName(false);
            setExists(false);
          }
          else if (chatRooms.includes(newRoom)) {
            setExists(true);
          }
          else{
            setMissingName(true);
          }
      }
    return (
        <div>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name of new chatroom"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleNewRoomChange}
              />
              {missingName && (
                <Alert severity="error">The name of the new chatroom cannot be empty &#9757;</Alert>
              )}
              {exists && (
                <Alert severity="error">This chatroom already exists &#128373;</Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create a chatroom &#9996;
              </Button>
            </Box>
        </div>
    );
};

export default CreateChatRoom;