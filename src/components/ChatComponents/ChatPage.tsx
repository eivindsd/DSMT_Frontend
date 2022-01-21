import React, { useContext, useEffect, useState } from 'react';
import Header from '../HeaderComponent/Header';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Quote from '../QuoteComponent/Quote';
import CreateChatRoom from './CreateChatRoom';
import { LoggedInContext } from '../LoggedInContext';

const ChatPage = () => {

    const {chatRooms} = useContext(LoggedInContext);

    return (
        <div>
            <Header />
            {chatRooms && chatRooms.map((chatroom) => (
                <Button 
                variant="contained" 
                style={{marginTop: "1vw", marginLeft: "1vw"}}>
                    <Link to={`/chatroom/${chatroom}`} style={{ textDecoration: 'none', color: "white"}}>
                        {chatroom}
                    </Link>
            </Button>
            ))}
            <CreateChatRoom />
            <Quote />
        </div>
    );
};

export default ChatPage;