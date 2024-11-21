import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';

function UpdateUser() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;

    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        contact: '',
        address: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value // Dynamically update the correct field
        }));
    };

    // Fetch user data from API when component mounts
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API}/api/update_profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserData(response.data);  // Update userData with fetched data
        } catch (error) {
            console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        fetchUser();
    }, []);

    // Update user profile
    const updateUser = async () => {
        const payload = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            contact: userData.contact,
            address: userData.address,
        };

        try {
            const response = await axios.post(
                `${API}/api/generate_user/`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Handle success response
            console.log('User updated successfully:', response.data);
            alert('User updated successfully');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior (page reload)
        updateUser();
    };

    const handleChangePassword = () => {
        navigate('/change-password')
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <h1 className="text-2xl mt-10 font-bold mb-2">Update User</h1>
                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        {/* Input fields for user data */}
                        <InputField
                            label="First Name"
                            placeholder="Enter first name"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleChange} // Handle input change
                        />
                        <InputField
                            label="Last Name"
                            placeholder="Enter last name"
                            name="last_name"
                            value={userData.last_name}
                            onChange={handleChange} // Handle input change
                        />
                        <InputField
                            label="Contact"
                            placeholder="Enter contact"
                            name="contact"
                            value={userData.contact}
                            onChange={handleChange} // Handle input change
                        />
                        <InputField
                            label="Address"
                            placeholder="Enter address"
                            name="address"
                            value={userData.address}
                            onChange={handleChange} // Handle input change
                        />
                        {/* Submit button */}
                        <div className="flex justify-center gap-4 pb-4">
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
