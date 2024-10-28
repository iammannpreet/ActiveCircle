// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5050/api/v1/auth/register', {
                name,
                email,
                password,
            });

            alert('Registration successful');
            console.log(response.data);
            navigate('/login'); // Navigate to the login page after successful registration
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred during registration';
            alert('Registration failed: ' + errorMessage);
        }
    };

    return (
        <div className="bg-gradient-to-br from-lightGray to-orange-100 h-screen flex justify-center">
            <div className="bg-white shadow-lg h-[36rem] rounded-xl w-full max-w-md p-8 space-y-6 relative">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-darkGray">Sign Up for ActiveCircle</h1>
                    <p className="text-gray-500 text-sm mt-2">Create your account to get started</p>
                </div>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-darkGray font-medium mb-2">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-primary transition"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-primary transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-darkGray font-medium mb-2">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:border-primary transition"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-6 border-t pt-4 text-center">
                    <span className="text-gray-500 text-sm">Already have an account? </span>
                    <Link to="/login" className="text-primary font-medium hover:underline">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
