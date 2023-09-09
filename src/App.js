import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("accessToken"))

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatRoom setIsAuth={setIsAuth} isAuth={isAuth} />}></Route>
      <Route path="/login" element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />}></Route>
      <Route path="/register" element={<Register setIsAuth={setIsAuth} isAuth={isAuth}/>}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;