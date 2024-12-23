import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';
import UserPfp from "../../assets/images/userpfp.png"; // Fallback image
import Swal from 'sweetalert2';

function UpdateUser() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;
    const [selectedImage, setSelectedImage] = useState(null); // Store the file itself, not object URL

    const token = sessionStorage.getItem('access_token');
    const userGroup = sessionStorage.getItem('user_group');
    console.log(userGroup);

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        contact: '',
        location: '',
        functions: '',
        language_s: '',
        language_w: '',
        transportation_mode: '',
        image: '', // Profile image URL from API
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value, // Dynamically update the correct field
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
            console.error('Error fetching user data:', error);
            const errorMessage = error.response?.data?.detail || 'Failed to fetch user data.';
            alert(errorMessage);
        }
    };

    // Fetch user data when component mounts
    useEffect(() => {
        fetchUser();
    }, []);

    // Handle image file change (store file, not URL)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Store the actual file
        }
    };

    const updateUser = async () => {
        const formData = new FormData();

        // Append the selected image or the previous one if none selected
        if (selectedImage) {
            formData.append('image', selectedImage);
        } else if (userData.image) {
            // If no new image selected, send the existing image (if any)
            formData.append('image', userData.image);
        }

        // Append other user data
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('contact', userData.contact);
        formData.append('location', userData.location);
        formData.append('functions', userData.functions);
        formData.append('language_s', userData.language_s);
        formData.append('language_w', userData.language_w);
        formData.append('transportation_mode', userData.transportation_mode);

        try {
            const response = await axios.put(
                `${API}/api/update_profile/`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            Swal.fire({
                title: "Profile Updated Successfully!",
                icon: "success",
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error uploading image:', error.response || error.message);
            Swal.fire({
                title: 'Error Uploading Image',
                icon: 'error',
                text: error.response ? error.response.data : error.message,
            });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form behavior (page reload)
        updateUser();
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar />
                <h1 className="text-2xl mt-10 font-bold mb-2">Update Profile</h1>

                <div className="flex justify-between px-6 mt-2 w-full">

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
                            label="Location"
                            placeholder="Enter location"
                            name="location"
                            value={userData.location}
                            onChange={handleChange} // Handle input change
                        />
                        {
                            (userGroup === 'super_user' || userGroup === 'beneficiary') && (
                                <InputField
                                    label="Function"
                                    placeholder="Enter functions"
                                    name="functions" // Update this to match the state key
                                    value={userData.functions}
                                    onChange={handleChange} // Handle input change
                                />
                            )
                        }
                        {
                            (userGroup === 'super_user' || userGroup === 'mediator') && (
                                <>
                                    <InputField
                                        label="Language Speak"
                                        placeholder="Enter Language"
                                        name="language_s"
                                        value={userData.language_s}
                                        onChange={handleChange} // Handle input change
                                    />

                                    <InputField
                                        label="Language Write"
                                        placeholder="Enter Language"
                                        name="language_w"
                                        value={userData.language_w}
                                        onChange={handleChange} // Handle input change
                                    />

                                    <InputField
                                        label="Transportation Mode"
                                        placeholder="Enter Transportation Mode"
                                        name="transportation_mode"
                                        value={userData.transportation_mode}
                                        onChange={handleChange} // Handle input change
                                    />
                                </>
                            )
                        }

                        {/* Submit buttons */}
                        <div className="flex justify-center items-center gap-4">
                            <button
                                onClick={handleChangePassword}
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
                            {/* Show selected image if exists, otherwise API image */}
                            <img
                                src={selectedImage ? URL.createObjectURL(selectedImage) : (userData.image ? `${API}/media/${userData.image}` : UserPfp)}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* File input for image upload */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange} // Handle file selection
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
