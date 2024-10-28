// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // State to store form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Function to handle form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post('http://localhost:5050/api/v1/auth/register', {
                name,
                email,
                password,
            });

            // Display a success message or navigate to another page (like login)
            alert('Registration successful');
            console.log(response.data);
            navigate('/login'); // Navigate to the login page after successful registration
        } catch (error) {
            // Handle errors (like duplicate email)
            console.error('Registration error', error.response.data.message);
            alert('Registration failed: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
