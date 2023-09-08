import React from 'react'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';



export default function ChatRoom() {
  return (
    <Container>

    <Nav defaultActiveKey="/" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/">Main</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1" href='/login'>Login</Nav.Link>
      </Nav.Item>
    </Nav>
    </Container>
  );


}
