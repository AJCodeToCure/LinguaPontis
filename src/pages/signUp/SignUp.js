import React, { useState } from 'react';
import bgImage from '../../assets/images/login_bg.png'; // Adjust the path based on your folder structure
import EmailIcon from '../../assets/EmailIcon';
import KeyIcon from "../../assets/KeyIcon";
import EyeIcon from "../../assets/EyeIcon";
import { login } from '../../components/api/Authenticate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from "../../components/api/config";

import Swal from 'sweetalert2'



const SignUp = () => {
    const [email, setEmail] = useState(''); // State for email input
    const [password, setPassword] = useState(''); // State for password input
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const API = API_Base;
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post(
                `${API}/api/register_beneficiary/`, // Replace with your actual login API endpoint
                {
                    email,
                    password,
                    username
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            navigate('/');
            Swal.fire({
                title: "Account Created Sucessfully!",
                icon: "success"
            });
        } catch (error) {
            const statusCode = error.response?.status || 404;
            const errorMessage = error.response?.data.detail || error.message || 'Backend server is not responding.';
            if (statusCode === 401) {
                // Unauthorized - show error icon
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                });
            } else if (statusCode === 406 || statusCode === 404 || statusCode === 400) {
                Swal.fire({
                    icon: "question",
                    title: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                });
            }
        }
    };

    // const handleSubmit = async (event) => {
    //   event.preventDefault(); // Prevent form from submitting the default way

    //   try {
    //     const response = await login(email, password); // Call login API

    //     console.log("Login response:", response);

    //     //check response status is success
    //     if (response.status !== "success") {
    //       throw new Error("Login failed");
    //     }

    //     //Redirect to the dashboard page
    //     navigate('/dashboard');

    //   } catch (error) {
    //     console.error("Login failed:", error);
    //     // Error is already handled in the login function
    //     alert("Login failed. Please check your email and password.");

    //   }
    // };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex items-center px-12 h-screen">
                <div className="w-full max-w-md p-8 ">
                    <h2 className="text-3xl font-bold text-left text-gray-800 mb-1">Sign Up</h2>
                    <h2 className="text-[46px] font-serif font-semibold text-[var(--darkBlue)] mb-10">LinguaPontis</h2>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <EmailIcon />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email} // Bind to email state
                                onChange={(e) => setEmail(e.target.value)} // Update email state
                                className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-[20px] focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={username} // Bind to email state
                                onChange={(e) => setUsername(e.target.value)} // Update email state
                                className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-[20px] focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <KeyIcon />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password} // Bind to password state
                                onChange={(e) => setPassword(e.target.value)} // Update password state
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-[20px] focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                <EyeIcon />
                            </div>
                        </div>

                        {/* Login Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[20px] text-white bg-[var(--darkBlue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
