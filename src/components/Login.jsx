// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const { loginUser } = useContext(UserContext); // Access the loginUser function from UserContext
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

            if (response?.data?.token && response?.data?.user) {
                // Create user data object
                const userData = {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    token: response.data.token,
                    email: response.data.user.email,
                };

                // Update the user state globally using the context
                loginUser(userData);

                // Display success message and navigate to homepage
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error('Unexpected response format from server');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred during login';
            toast.error('Login failed: ' + errorMessage);
        }
    };

    return (
        <div className="bg-gradient-to-br from-lightGray to-orange-100 h-screen flex justify-center items-center">
            <ToastContainer /> {/* Include the Toast container for notifications */}
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 space-y-6 relative">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-darkGray">Log in to ActiveCircle</h1>
                    <p className="text-gray-500 text-sm mt-2">Enter your credentials to access your account</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
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
                        Log In
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/forgot-password" className="text-primary hover:underline text-sm">
                            Forgot password?
                        </Link>
                    </div>
                </form>

                <div className="mt-6 border-t pt-4 text-center">
                    <span className="text-gray-500 text-sm">Don't have an account? </span>
                    <Link to="/register" className="text-primary font-medium hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
