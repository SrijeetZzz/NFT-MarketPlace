import React, { useState , useEffect} from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate('/')
    }
   })

  const handleLoginWithGoogle = () => {
    // Handle login with Google
  };

  const handleLoginWithFacebook = () => {
    // Handle login with Facebook
  };

  const handleLogin = async () => {
    console.warn("email,password:", email, password);
    let result = await fetch('http://localhost:5000/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result=await result.json()
    console.warn(result)
    if(result.name){
        localStorage.setItem("user",JSON.stringify(result))

        navigate('/')
    }else{
        alert('please enter correct details')
    }

  };

  return (
<div className="login-container">
  <img src="data:image/jpeg;base64,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" alt="" />
  <div className="login-form">
    <h2>Login</h2>
    <form>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
      <button type="submit" onClick={handleLogin}>Login</button>
    </form>
    <div className="login-options">
      <p>Or login with:</p>
      <div className="social-login">
        <button className="google-btn" onClick={handleLoginWithGoogle}>
          <FaGoogle className="google-icon" />
        </button>
        <button className="facebook-btn" onClick={handleLoginWithFacebook}>
          <FaFacebook className="facebook-icon" />
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
