import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updatePassowrd = () => {
        const { email, password, confirm_password } = formData;
        const payload = {
            email,
            password,
            confirm_password,
        };

        try {
            const response = axios.post(`${API}/api/update_profile/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Profile updated successfully:', response.data);
            alert('Password updated successfully');
            navigate('/update-user')

        } catch (error) {
            console.error('Error updating profile:', error);
    
            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to updating profile.';
            alert(errorMessage);
        }
    };

    const handleChangePassword = () => {
        updatePassowrd();
    }
    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <h1 className="text-2xl mt-10 font-bold mb-2">Update Password</h1>
                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <form onSubmit={handleChangePassword}>
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
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Confirm Password"
                                placeholder="Enter password"
                                name="confirm_password"
                                type="password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                            <button type="submit" className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword