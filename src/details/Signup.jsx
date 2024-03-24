import React, { useState } from 'react';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phnnumber, setPhnnumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submission = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          address,
          phnnumber,
          password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!result.ok) {
        throw new Error('Failed to fetch');
      }
      const res = await result.json();
      console.warn(res);
      localStorage.setItem("user", JSON.stringify(res));
      navigate('/');
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  return (
    <>
      <div className="signup-container">
        <form className="signup-form" onSubmit={submission}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={phnnumber} onChange={(e) => setPhnnumber(e.target.value)} placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default Signup;
