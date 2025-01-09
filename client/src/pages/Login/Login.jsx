import React, { useEffect, useState } from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import './login.css';

export default function Login({setPwd, setUser}) {
  const [username, setUsername] = useState('john');
  const [password, setPassword] = useState('john');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('User:', username, 'Password:', password);
    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
        console.log(response)
        if (response.status === 200) {
          setUser(username)
          setPwd(`/home/${username}/Desktop`)
          navigate('/home'); 
        }
      } catch (error) {
        console.error('Login failed:', error.response?.data.message);
      }
  };

  useEffect(() =>{
  },[username])


  return (
    <div className="main-div">


      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-form-top">
            <TravelExploreIcon style={{ fontSize: '75px' }} />
            <h3>File Explorer</h3>
          </div>

          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='loginButton' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
