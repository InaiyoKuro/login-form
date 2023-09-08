import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import Register from './components/Register';


function App() {
  return (
    <Login />
  //   <BrowserRouter>
  //   <div>Hello World</div>
  //   <Routes>
  //     <Route path="/" element={<ChatRoom />}></Route>
  //     <Route path="/login" element={<Login />}></Route>
  //     <Route path="/register" element={<Register />}></Route>
  //   </Routes>
  // </BrowserRouter>
  );
}

export default App;
