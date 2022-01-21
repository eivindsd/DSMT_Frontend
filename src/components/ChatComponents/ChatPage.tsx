import { useContext } from 'react';
import Header from '../HeaderComponent/Header';
import { Button} from '@mui/material';
import { Link } from 'react-router-dom';
import Quote from '../QuoteComponent/Quote';
import CreateChatRoom from './CreateChatRoom';
import { LoggedInContext } from '../LoggedInContext';
import LoveCalculator from "../LoveCalculatorComponent/LoveCalculator";
import { Divider } from '@material-ui/core';

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
            <Divider style={{marginTop: "2vw"}}/>
            <Quote />
            <Divider style={{marginTop: "2vw"}}/>
            <LoveCalculator />
        </div>
    );
};

export default ChatPage;