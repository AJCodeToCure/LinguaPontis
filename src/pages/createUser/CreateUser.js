import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navBar/NavBar';
import Swal from 'sweetalert2'


function CreateUser() {

    const nameMapping = {
        agency_manager: "Agency",
        npo_manager: "No Profit",
        team_manager: "Team",
        mediator: "Mediator",
        event_manager: "Task Manager",
        beneficiary: "Beneficiary",
    };
    const Swal = require('sweetalert2')
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [positions, setPositions] = useState(null);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [permissionGroupId, setPermissionGroupId] = useState(1);
    const [permissionGroups, setPermissionGroups] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState(null);
    const token = sessionStorage.getItem('access_token');
    // console.log(token);
    const navigate = useNavigate();
    const API = API_Base;

    // Fetch permission groups from the API
    const fetchPermissionGroups = async () => {
        try {
            const response = await axios.get(
                `${API}/api/permission_group/`,  // API endpoint
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Add Bearer token in the headers
                    },
                }
            );
            console.log(response.data);  // Log the data received from the API
            setPermissionGroups(response.data); // Set permission groups in the state
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
            alert(errorMessage);
        }
    };

    // Fetch permission groups when the component mounts
    useEffect(() => {
        fetchPermissionGroups();
    }, []);

    // Handle the dropdown change event
    const handleSelectChange = (e) => {
        const selectedId = e.target.value; // Get selected ID from the dropdown value
        if (selectedId) {
            setSelectedPermission(selectedId); // Store the selected ID
            console.log('Selected Permission ID:', selectedId);  // Log the ID
        }
    };


    // const DropdownSelect = ({ label, options, value, onChange, name }) => (
    //     <div className="mb-3">
    //         <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    //         <div className="relative">
    //             <select
    //                 className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
    //                 value={value}  // Ensure the value is the ID
    //                 onChange={(e) => {
    //                     // Find the selected option by its ID (value)
    //                     const selectedOption = options.find(option => option.value === e.target.value);
    //                     if (selectedOption) {
    //                         onChange(selectedOption);  // Pass the selected option object
    //                     } else {
    //                         console.log("Invalid option selected");
    //                     }
    //                 }}
    //             >
    //                 <option value="">-- Select --</option>  {/* Default empty option */}
    //                 {options.map((option, index) => (
    //                     <option key={index} value={option.value}>{option.label}</option>  // Use value (ID) and label (name)
    //                 ))}
    //             </select>
    //             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    //         </div>
    //     </div>
    // );



    const generateUser = async () => {
        const payload = {
            email,
            password,
            username,
            permission_group_id: selectedPermission,
        };

        try {
            const response = await axios.post(
                `${API}/api/generate_user/`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Bearer token from sessionStorage
                        'Content-Type': 'application/json', // Ensure proper content type
                    },
                }
            );
            Swal.fire({
                title: "User Created Sucessfully!",
                icon: "success"
            });
            navigate('/users-management');
        } catch (error) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.detail || error.message;
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


    const handleCreateUser = (e) => {
        e.preventDefault(); // Prevent page reload on form submit
        generateUser(); // Call the generateUser function to make the API request
    };

    return (
        
        <div className="flex h-screen">
            
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
            < Navbar />
                <h1 className="text-2xl mt-10 font-bold mb-6">User Details</h1>

                <div className="grid mt-16 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                    
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            {/* Email Input Field */}
                            <InputField
                                label="Email *"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {/* Username Input Field */}
                            <InputField
                                label="Username *"
                                placeholder="Enter username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            {/* Password Input Field */}
                            <InputField
                                label="Password *"
                                placeholder="Enter password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                            >
                                Create User
                            </button>
                        </form>
                        <div>
                            {/* Dropdown */}
                            <label className="block text-[var(--darkText)] font-semibold mb-1">Select NPO/Agency *</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={selectedPermission} // Set selected value to the selectedPermission (ID)
                                onChange={handleSelectChange} // Handle the change event to store the selected ID
                            >
                                <option value="">-- Select --</option> {/* Default empty option */}
                                {permissionGroups.map((group) => (
                                    <option key={group.id} value={group.id}> {/* The ID of the group as value */}
                                        {nameMapping[group.name] || group.name} {/* Map name or fall back to original */}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                {/* <div className="mt-auto">
                    <div className="flex justify-center gap-4 pb-4">
                        <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default CreateUser