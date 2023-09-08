import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { db } from '../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';



var username = '';
var password = '';
var checkUsername = '';
export default function Login() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if(name === 'username') username = value
    if(name === 'password') password = value

  }

  const handleClick = (e) => {
    e.preventDefault();
    checkLogin()
  }

  const checkLogin = async () => {
    const q = query(collection(db,'users'), where("username","==",username))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      checkUsername = doc.data()
    });
    if(checkUsername.username === username && checkUsername.password === password){
      toast.success("Đăng nhập thành công")
      setIsAuth(true)
      
      username = '';
      password = ''
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      return
    }
    
    toast.error("Sai tài khoản hoặc mật khẩu!")
  }


  return (

    <div className='d-flex justify-content-center w-100 vh-100'>
      <Form className='w-25 align-self-center'>
        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control type="text" placeholder="Tài khoản" name='username'  onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Mật khẩu" name='password' onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3 w-100 d-flex justify-content-between align-items-center" controlId="formBasicPassword">
          <Link to='' variant='link' className='text-decoration-none'>Quên mật khẩu?</Link>
          <Link to='/register' variant='link' className='text-decoration-none'>Đăng Ký</Link>
        </Form.Group>
        <Button variant="primary" type="submit" className='align-self-start' onClick={handleClick}>
          Submit
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />
    </div>

  );  

}
