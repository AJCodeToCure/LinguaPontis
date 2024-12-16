import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import axios from 'axios';
import InputField from '../../components/inputField/InputField';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function UpdateRequests() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;
    const token = sessionStorage.getItem('access_token');
    const { id } = useParams();
    const [reason, setReason] = useState('');
    const [requests, setRequests] = useState([]);
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

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${API}/api/event_time_change_request/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
            alert(errorMessage);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);

    const handleRequest = async (requestId, action) => {
        // Determine the is_confirm value based on action
        const isConfirm = action === 'confirm' ? true : false;

        try {
            // Create the payload for the PUT request
            const payload = {
                is_confirm: isConfirm, // true for confirm, false for reject
            };

            // Send PUT request to update the request status
            const response = await axios.put(`${API}/api/event_time_change_request/${requestId}/`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Update the local state with the new request data
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === requestId ? { ...request, is_confirm: isConfirm } : request
                )
            );

            // Success message
            Swal.fire({
                title: `Request ${action === 'confirm' ? 'Confirmed' : 'Rejected'}!`,
                icon: "success",
            });
        } catch (error) {
            console.error('Error updating request:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "There was an error updating the request.",
            });
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
                <h1 className="text-2xl mt-10 font-bold mb-2">All Request</h1>
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Note</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{request.event_name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{request.reason}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{request.note || "No additional notes"}</td>
                                    <td className="flex items-center gap-2 px-6 py-4 text-sm">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${request.is_confirm === null ? 'bg-gray-400' : request.is_confirm ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                        {request.is_confirm === null ? '(Pending)' : request.is_confirm ? '(Approved)' : '(Rejected)'}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {request.is_confirm === null && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleRequest(request.id, 'confirm')}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleRequest(request.id, 'reject')}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {request.is_confirm !== null && (
                                            <span className="text-sm text-gray-500"></span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UpdateRequests;
