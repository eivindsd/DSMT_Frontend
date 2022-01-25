import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { LoggedInContext } from '../LoggedInContext';
import { Button } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateChatRoom = () => {
    const [newRoom, setNewRoom] = useState<string|undefined>();
    const [missingName, setMissingName] = useState(false);
    const [exists, setExists] = useState(false);
    const {chatRooms, setChatRooms} = useContext(LoggedInContext);
    
    const handleNewRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRoom(e.currentTarget.value);
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if(newRoom && !chatRooms.includes(newRoom)) {
            await axios.post("http://localhost:8080/api/rooms", {
              room: newRoom
            }).then(
              async function(response) {
                if(response.status === 201) {
                  setChatRooms(await (await axios.get("http://localhost:8080/api/rooms")).data)
                }
              }
            )
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
                <Link to={`/chatroom/${newRoom}`} style={{ textDecoration: 'none', color: "blue"}}>
                        Create and join chatroom
                </Link>
            </Box>
        </div>
    );
};

export default CreateChatRoom;