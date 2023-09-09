import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export default function ChatRoom(props) {
  const { isAuth, setIsAuth } = props

  const handleClick = () => {
    cookies.remove("accessToken")
    setIsAuth(cookies.get("accessToken"))
    console.log(isAuth)
  }
  const handleGetUser = () => {
    console.log('getUser')
  }

  return (
    <>
    {!isAuth ? <Navigate replace to="/login" /> : 
    <Container>
    <Nav defaultActiveKey="/" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">Main</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" href='/login'>Login</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" onClick={handleGetUser}>GET</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" onClick={handleClick}>Logout</Nav.Link>
      </Nav.Item>
    </Nav>
    </Container>
    
    }
    </>
  
  );


}
