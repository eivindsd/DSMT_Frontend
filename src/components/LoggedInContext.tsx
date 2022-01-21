import React, { useState, createContext } from 'react';
import ChatRoom from './ChatComponents/ChatRoom';

interface LoggedInContextInterface {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userName: string | undefined;
    setUserName: (name: string | undefined) => void;
    chatRooms: (string|undefined)[];
    setChatRooms: (chatRooms: (string|undefined)[]) => void;
}

const LoggedInDefaultValues: LoggedInContextInterface = {
    isLoggedIn: false,
    setIsLoggedIn: isLoggedIn => isLoggedIn,
    userName: "",
    setUserName: userName => userName,
    chatRooms: ["Chatroom1", "Chatroom2"],
    setChatRooms: ChatRooms => ChatRooms
 }

export const LoggedInContext = createContext<LoggedInContextInterface>(LoggedInDefaultValues);

const LoggedInContextProvider: React.FC = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(LoggedInDefaultValues.isLoggedIn);
    const [userName, setUserName] = useState<string | undefined>(LoggedInDefaultValues.userName);
    const [chatRooms, setChatRooms] = useState<(string|undefined)[]>(LoggedInDefaultValues.chatRooms);

    return (
        <LoggedInContext.Provider 
            value={{isLoggedIn, setIsLoggedIn, userName, setUserName, chatRooms, setChatRooms}}
            >
                {children}
        </LoggedInContext.Provider>
    )
}
export default LoggedInContextProvider