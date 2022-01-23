import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoggedInContext} from './components/LoggedInContext';
import Login from './components/LoginComponent/Login';
import ChatPage from './components/ChatComponents/ChatPage';
import ChatRoom from './components/ChatComponents/ChatRoom';


function App() {
  const { isLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
  }, [isLoggedIn])


  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="App">
                                  {isLoggedIn && <ChatPage />}
                                  {!isLoggedIn &&  <Login /> }
                                  </div>}/>
          <Route path="chatroom/:name" element={<ChatRoom />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
