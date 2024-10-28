// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => { // Receive setIsAuthenticated as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5050/api/v1/auth/login', {
                email,
                password,
            });

            if (response?.data?.token) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true); // Call setIsAuthenticated with a boolean
                alert('Login successful');
                navigate('/');
            } else {
                alert('Unexpected response format from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            alert('Login failed: ' + errorMessage);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
