import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function UpdateTimeRequest() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;
    const token = sessionStorage.getItem('access_token');
    const { id } = useParams();
    const [reason, setReason] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });

    const makeRequest = async () => {
        const payload = {
            reason,  // Send the reason as part of the request
            note: additionalInfo,  // Send additional info as note
            event_id: id,  // Send the event_id (which comes from the URL parameter)
        };

        try {
            const response = await axios.post(`${API}/api/event_time_change_request/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigate(`/specific-event/${id}`);
            Swal.fire({
                title: "Request submitted successfully!",
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
        makeRequest();
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar />
                <h1 className="text-2xl mt-10 font-bold mb-2">Make Request</h1>
                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                    Reason
                                </label>
                                <select
                                    id="reason"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Vacation">Vacation</option>
                                    <option value="Sick Leave">Sick Leave</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                                    Note
                                </label>
                                <textarea
                                    id="additionalInfo"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    rows="4"
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                />
                            </div>
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

export default UpdateTimeRequest;
