import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';
import Swal from 'sweetalert2';

function ChangePassword() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });

    const updatePassword = async () => {
        const { email, password, confirm_password } = formData;

        // Validate if passwords match
        if (password !== confirm_password) {
            Swal.fire({
                icon: "warning",
                title: "Passwords do not match.",
            });
            return;
        }

        const payload = { email, password, confirm_password };

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Authorization token is missing.",
            });
            return;
        }

        try {
            const response = await axios.post(`${API}/api/update_profile/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigate('/update-user');
            Swal.fire({
                title: "Password updated successfully!",
                icon: "success",
            });
        } catch (error) {
            const statusCode = error.response?.status || 404;
            const errorMessage = error.response?.data?.detail || error.message || 'Backend server is not responding.';
            if (statusCode === 401) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        updatePassword();
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar />
                <h1 className="text-2xl mt-10 font-bold mb-2">Update Password</h1>
                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Password"
                                placeholder="Enter password"
                                name="password"
                                type="password" // Set the input type to 'password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Confirm Password"
                                placeholder="Enter password"
                                name="confirm_password"
                                type="password" // Set the input type to 'password'
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
