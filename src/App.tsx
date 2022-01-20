import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoggedInContext} from './components/LoggedInContext';
import Login from './components/LoginComponent/Login';
import ChatPage from './components/ChatComponent/ChatPage';

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
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
