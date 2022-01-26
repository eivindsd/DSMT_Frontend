import { useContext, useEffect } from 'react';
import Header from '../HeaderComponent/Header';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Quote from '../QuoteComponent/Quote';
import CreateChatRoom from './CreateChatRoom';
import { LoggedInContext } from '../LoggedInContext';
import { Divider } from '@material-ui/core';
import axios from 'axios';

const ChatPage = () => {

    const {chatRooms, setChatRooms} = useContext(LoggedInContext);

    useEffect(() => {
        const getRooms = async () => {
          setChatRooms(await (await axios.get("http://localhost:8080/api/rooms")).data);
        }
        getRooms();
      }, []); 
    
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
            <Divider style={{marginTop: "2vw"}}/>
            <Quote />
            <Divider style={{marginTop: "2vw"}}/>
        </div>
    );
};

export default ChatPage;