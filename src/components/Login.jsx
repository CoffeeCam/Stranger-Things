import React, { useState } from 'react';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2306-FTB-MT-WEB-PT';

function Login ({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful:', data.data.token);
        onLogin(data.data.token);
      } else {
        console.error('Error logging in:', data.error.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;