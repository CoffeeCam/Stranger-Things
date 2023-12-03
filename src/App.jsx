import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Post from './components/Post.jsx';
import Profile from './components/Profile.jsx';
import CreatePost from './components/CreatePost.jsx'; // Import CreatePost component
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleRegister = (token) => {
    setUser({ token });
  };

  const handleLogin = (token) => {
    setUser({ token });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="components/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/login" element={<Login baseURL="your_base_url_here" />} />
        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/create-post" element={<CreatePost baseURL="your_base_url_here" authToken={user?.token} />} />
      </Routes>
    </div>
  );
}

export default App;
