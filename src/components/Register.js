import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

var password = '';
var rePassword = '';
var username = '';
var email = '';
var checkEmail = ''


export default function Register(props) {
  const [user,setUser] = useState({username: '', email: '', password: ''})

  const { isAuth } = props

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if(name === 'username') username = value;
    if(name === 'email') email = value;
    if(name === 'password') password = value;
    if(name === 'rePassword') rePassword = value

    setUser((prev) => {
      return { ...prev, [name]: value }
    })
  }
  
  const checkForm = async (e) => {
    e.preventDefault();

    const regexUsername = /\W/g;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(regexUsername.test(username) || username === ""){
      toast.error("Lỗi tên tài khoản!")
      return;
    } 
    if(password.length < 8){
      toast.error("Lỗi! Mật khẩu quá ngắn");
      return;
    }
    if(password !== rePassword){
      toast.error("Lỗi! Mật khẩu không trùng!")
      return;
    } 
    if(!regexEmail.test(email) || email === ""){
      toast.error("Lỗi Email")
      return;
    }

    const ref = doc(db, "users", username)
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const user = docSnap.data();
      if(user.username === username){
        toast.error("Tài khoản đã tồn tại!")
        return
      }
    }
    
    const q = query(collection(db,'users'), where("email","==",email))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      checkEmail = doc.data()
    });
    console.log(checkEmail.email === email)
    if(checkEmail.email === email){
        toast.error("Đã có ai đoá dùng email này!")
        return;
    }

    addDoc() 
    toast.success("Tạo tài khoản thành công!")
    setUser((prevUser) => ({
      ...prevUser,
      username: '',
      email: '',
      password: '',
      rePassword: '',
    }))
  }

  
  const addDoc = async (e) => {
    console.log('Tạo tài khoản thành công')
    await setDoc(doc(db,"users",user.username), {
      username: user.username,
      email: user.email,
      password: user.password,
    })
  }
  
  return (
    <> {isAuth ? <Navigate to="/" /> : 
    <div className='d-flex justify-content-center w-100 vh-100'>
      <Form onSubmit={addDoc} className='w-25 align-self-center'>
        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control type="text" placeholder="Tài khoản" name="username" value={user.username} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name='email' value={user.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Mật khẩu" name='password' value={user.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPassword">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập lại mật khẩu" name='rePassword' value={user.rePassword} onChange={handleChange}/>
        </Form.Group>

        <Form.Group className="mb-3 w-100 d-flex justify-content-between align-items-center" controlId="formBasicPassword">
          <Link to='' variant='link' className='text-decoration-none'>Quên mật khẩu?</Link>
          <Link to='/login' variant='link' className='text-decoration-none'>Đăng Nhập</Link>
        </Form.Group>

        <Button variant="primary" type="submit" className='align-self-start' onClick={checkForm}>
          Submit
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
        />
    </div>
    }
    </>
  );  

}
