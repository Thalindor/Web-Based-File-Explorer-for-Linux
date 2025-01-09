import './App.css';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './pages/Login/Login';
import { useState } from 'react';

function App() {
  
  const [pwd, setPwd] = useState({});
  const [username, setUser] = useState({});
  
  return (
    <Router>
    <Routes>
      <Route
        path='/home' element= {<Home

          pwd = {pwd}
          username = {username}
          setPwd = {setPwd}
          setUser = {setUser}
      
        />}
      />
      <Route
        path='/' element= {<Login

          pwd = {pwd}
          username = {username}
          setPwd = {setPwd}
          setUser = {setUser}

        />}
      />
    </Routes>
  </Router>
  );
}

export default App;
