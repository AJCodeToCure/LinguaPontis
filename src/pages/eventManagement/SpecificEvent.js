import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, Plus, Trash2 } from 'lucide-react';
import { TrashIcon } from '../../assets/trashIcon';
import { FilterIcon } from '../../assets/FilterIcon';
import Button from '../../components/button/Button';
import { PlusIcon } from '../../assets/PlusIcon';
import { GreenCircleIcon } from '../../assets/GreenCircleIcon';
import { ThreeDots } from '../../assets/ThreeDots';
import { GrayCircleIcon } from '../../assets/GrayCircleIcon';
import TopNavBar from '../../components/topNavBar/TopNavBar';
import { Sidebar } from '../../components/sideBar/SideBar';
import { fetchEvents } from "../../components/api/Events";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navBar/NavBar';


const DateUpdateModal = ({ isOpen, onClose, events }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const token = sessionStorage.getItem('access_token');
    const { id } = useParams();
    const API = API_Base;
    const Swal = require('sweetalert2')
    const handleConfirm = async (e) => {
        e.preventDefault();
        updateTeam();
    };
    const updateTeam = async (e) => {
        const formData = {
            date_begin: startDate,
            date_ending: endDate,
            reason: reason,
            note: additionalInfo,
        };
        try {
            const response = await axios.put(
                `${API}/api/event/${id}/`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            Swal.fire({
                title: "Date Updated Sucessfully!",
                icon: "success"
            });
            window.location.reload();
            onClose();
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
    if (!isOpen) return null;
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    };
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[550px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Event Update</h2>
                {events && events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index}>
                            {/* Date Inputs */}
                            <div className="mb-4">
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Current Event Time
                                </label>
                                <input
                                    type="text"
                                    id="showdate"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    value={formatDateTime(event.date_begin)}
                                    disabled
                                />
                            </div>
                            <div className='flex gap-2'>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                        Update Time Begin
                                    </label>
                                    <input
                                        id="endDate"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        type="datetime-local"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                        Update Time End
                                    </label>
                                    <input
                                        id="endDate"
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        type="datetime-local"
                                    />
                                </div>
                            </div>
                            {/* Reason Dropdown */}
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
                            {/* Textarea for Additional Information */}
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
                            {/* Buttons */}
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    onClick={handleConfirm}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-4 py-2 text-center">No events available.</td>
                    </tr>
                )}
            </div>
        </div>
    );
};

const EventFeedbackModal = ({ isOpen, onClose }) => {
    const token = sessionStorage.getItem('access_token');
    const { id } = useParams();
    const API = API_Base;
    const Swal = require('sweetalert2')
    const handleConfirm = async (e) => {
        e.preventDefault();
        submitFeedback();
    };
    const handleBene = (index) => {
        setBeneficiary(index);
    };
    const handleObj = (index) => {
        setObjective(index);
    };
    const handleMed = (index) => {
        setMediator(index);
    };
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [extraTime, setExtraTime] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const [beneficiary, setBeneficiary] = useState(0);
    const [objective, setObjective] = useState(0);
    const [mediator, setMediator] = useState(0);
    const [note, setNote] = useState('');
    const submitFeedback = async (e) => {
        const formData = {
            event: id,
            created_by: '',
            date_begin: startDate,
            date_ending: endDate,
            extra_time: extraTime,
            time_duration: timeDuration,
            meeting_objective: objective,
            mediator_experience: mediator,
            beneficiary_comprehension: beneficiary,
            note: note,
        };
        try {
            const response = await axios.post(
                `${API}/api/event_feedback/`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            Swal.fire({
                title: "Date Updated Sucessfully!",
                icon: "success"
            });
            window.location.reload();
            onClose();
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
    if (!isOpen) return null;
    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    };
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[780px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Manager Event Feedback</h2>
                <div >
                    <div className='flex gap-2'>
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                Time Begin
                            </label>
                            <input
                                id="endDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="datetime-local"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                Time End
                            </label>
                            <input
                                id="endDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                type="datetime-local"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                Time Duration
                            </label>
                            <input
                                id="endDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={timeDuration}
                                onChange={(e) => setTimeDuration(e.target.value)}
                                type="text"
                                placeholder='Time Duration'
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                            Extra Time
                        </label>
                        <input
                            id="endDate"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            value={extraTime}
                            onChange={(e) => setExtraTime(e.target.value)}
                            placeholder='Extra Time'
                            type="text"
                        />
                    </div>
                    {/* 5-Star Rating */}
                    <div className="mb-4 flex items-center gap-5">
                        <label htmlFor="rating" className="block w-44 text-sm font-medium text-gray-700">
                            Beneficiary Comprehension
                        </label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 cursor-pointer ${beneficiary >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    onClick={() => handleBene(star)}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                    {/* 5-Star Rating */}
                    <div className="mb-4 flex items-center gap-5">
                        <label htmlFor="rating" className="block w-44 text-sm font-medium text-gray-700">
                            Meeting Objective
                        </label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 cursor-pointer ${objective >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    onClick={() => handleObj(star)}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                    {/* 5-Star Rating */}
                    <div className="mb-4 flex items-center gap-5">
                        <label htmlFor="rating" className="block w-44 text-sm font-medium text-gray-700">
                            Mediator Experience
                        </label>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 cursor-pointer ${mediator >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    onClick={() => handleMed(star)}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                    {/* Textarea for Additional Information */}
                    <div className="mb-4">
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                            Note
                        </label>
                        <textarea
                            id="additionalInfo"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            rows="4"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder='Note..'
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleConfirm}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MediaotorFeedbackModal = ({ isOpen, onClose }) => {
    const token = sessionStorage.getItem('access_token');
    const { id } = useParams();
    const API = API_Base;
    const Swal = require('sweetalert2')

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [extraTime, setExtraTime] = useState('');
    const [timeDuration, setTimeDuration] = useState('');
    const [beneficiary, setBeneficiary] = useState(0);
    const [meeting, setMeeting] = useState(0);
    const [team, setTeam] = useState(0);
    const [note, setNote] = useState('');

    // State to store selected images
    const [selectedImages, setSelectedImages] = useState([]);

    // Handle confirm button click
    const handleConfirm = async (e) => {
        e.preventDefault();
        submitFeedback();
    };

    // Handle ratings
    const handleBene = (index) => setBeneficiary(index);
    const handleMet = (index) => setMeeting(index);
    const handleTeam = (index) => setTeam(index);

    // Handle image selection
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length + selectedImages.length > 3) {
            Swal.fire({
                icon: "error",
                title: 'You can only upload a maximum of 3 images.',
            });
        } else {
            setSelectedImages((prevImages) => [...prevImages, ...files]);
        }
    };

    // Handle image removal
    const handleImageRemove = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // Submit feedback including images
    const submitFeedback = async () => {
        const formData = new FormData();
        formData.append('event', id);
        formData.append('created_by', ''); // You can modify this as necessary
        formData.append('date_begin', startDate);
        formData.append('date_ending', endDate);
        formData.append('travel_cost', extraTime);
        formData.append('time_duration', timeDuration);
        // formData.append('meeting_objective', objective);
        formData.append('meeting_result', meeting);
        // formData.append('mediator_experience', mediator);
        formData.append('team_experience', team);
        formData.append('beneficiary_comprehension', beneficiary);
        formData.append('note', note);

        // Append images to the FormData
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await axios.post(`${API}/api/event_feedback/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });
            Swal.fire({
                title: "Feedback Submitted Successfully!",
                icon: "success"
            });
            window.location.reload(); // Reload to reflect changes
            onClose(); // Close the modal
        } catch (error) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.detail || error.message;
            if (statusCode === 401) {
                Swal.fire({
                    icon: "error",
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

    // Close modal if not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[780px]">
                <h2 className="text-2xl font-semibold text-center mb-4">Mediator Event Feedback</h2>
                <div>
                    <div className='flex gap-2'>
                        {/* <div className="mb-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Time Begin</label>
                            <input
                                id="startDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                type="datetime-local"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Time End</label>
                            <input
                                id="endDate"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                type="datetime-local"
                            />
                        </div> */}
                        {/* <div className="mb-4">
                            <label htmlFor="timeDuration" className="block text-sm font-medium text-gray-700">Travel Costs</label>
                            <input
                                id="timeDuration"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                value={timeDuration}
                                onChange={(e) => setTimeDuration(e.target.value)}
                                type="text"
                                placeholder='Travel Costs'
                            />
                        </div> */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="extraTime" className="block text-sm font-medium text-gray-700">Travel Costs</label>
                        <input
                            id="extraTime"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            value={extraTime}
                            onChange={(e) => setExtraTime(e.target.value)}
                            type="text"
                            placeholder='$'
                        />
                    </div>

                    <div className='flex justify-between'>
                        <div>
                            {/* 5-Star Rating for Beneficiary Comprehension */}
                            <div className="mb-4 flex items-center gap-5">
                                <label className="block w-44 text-sm font-medium text-gray-700">Beneficiary Comprehension</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 cursor-pointer ${beneficiary >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            onClick={() => handleBene(star)}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* 5-Star Rating for Meeting Objective */}
                            <div className="mb-4 flex items-center gap-5">
                                <label className="block w-44 text-sm font-medium text-gray-700">Meeting Result</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 cursor-pointer ${meeting >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            onClick={() => handleMet(star)}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* 5-Star Rating for Mediator Experience */}
                            <div className="mb-4 flex items-center gap-5">
                                <label className="block w-44 text-sm font-medium text-gray-700">Team Experience</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-6 w-6 cursor-pointer ${team >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            onClick={() => handleTeam(star)}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Image Upload */}
                            <div className="mb-4">
                                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700">
                                    If you have expense reports, upload a photo of recept here..
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <div className="mt-2 flex gap-2">
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={URL.createObjectURL(image)} alt="Preview" className="h-16 w-16 object-cover rounded-md" />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 text-red-500"
                                                onClick={() => handleImageRemove(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Textarea for Additional Information */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Note</label>
                        <textarea
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            rows="4"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder='Note..'
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleConfirm}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeedbackCard = () => {
    // Function to convert numeric rating to filled/unfilled stars
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 15.27l4.243 2.246-1.613-5.294L18 6.902l-5.421-.029L10 1 7.421 6.873 2 6.902l4.37 5.317-1.612 5.293L10 15.27z"
                    clipRule="evenodd"
                />
            </svg>
        ));
    };

    const [feedbackData, setFeedbackData] = useState(null);
    const { id } = useParams();
    const API = API_Base;
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('user_group');

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`${API}/api/event_feedback/?event=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                // If response.data is an array and you expect only one feedback, you can use [0]
                setFeedbackData(response.data); // If response contains an array of feedback
            } catch (err) {
                console.error("Error fetching feedback:", err);
            }
        };

        fetchFeedback();
    }, [id, token, API]);

    const [modalImage, setModalImage] = useState(null);

    // Function to handle opening the image in a modal
    const openModal = (image) => {
        setModalImage(image);  // Set the clicked image's URL
    };

    // Function to close the modal
    const closeModal = () => {
        setModalImage(null);  // Reset modalImage to null to close the modal
    };

    const getFullImageUrl = (imagePath) => {
        // Replace with your base URL
        const baseUrl = `${API}`; // Change to your actual domain
        return `${baseUrl}${imagePath}`;
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                <div className='flex justify-center gap-1'>
                    {feedbackData && feedbackData.length > 0 ? (
                        feedbackData.map((feedback) => (
                            <div key={feedback.id} className="max-w-sm mx-auto bg-white mb-2 shadow-lg rounded-lg overflow-hidden p-4">
                                <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {feedback.created_by_role === "event_manager" ? "Manager" : "Mediator"} - Feedback
                                </h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div className="mt-4">
                                    <p className="font-medium text-gray-700">Beneficiary Comprehension</p>
                                    <div className="flex space-x-1">
                                        {renderStars(feedback.beneficiary_comprehension)}
                                    </div>
                                </div>

                                {/* Conditionally rendering fields based on role */}
                                {feedback.created_by_role === 'mediator' ? (
                                    <>
                                        <div className="mt-4">
                                            <p className="font-medium text-gray-700">Meeting Result</p>
                                            <div className="flex space-x-1">
                                                {renderStars(feedback.meeting_result)}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-medium text-gray-700">Team Experience</p>
                                            <div className="flex space-x-1">
                                                {renderStars(feedback.team_experience)}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-4">
                                            <p className="font-medium text-gray-700">Meeting Objective</p>
                                            <div className="flex space-x-1">
                                                {renderStars(feedback.meeting_objective)}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-medium text-gray-700">Mediator Experience</p>
                                            <div className="flex space-x-1">
                                                {renderStars(feedback.mediator_experience)}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Optional: Additional feedback notes */}
                                {feedback.note && (
                                    <div className="mt-4">
                                        <p className="font-medium text-gray-700">Note</p>
                                        <p className="text-gray-600">{feedback.note}</p>
                                    </div>
                                )}

                                {/* Displaying images if available */}
                                {feedback.images && feedback.images.length > 0 && (
                                    <div className="mt-4">
                                        <p className="font-medium text-gray-700">Images</p>
                                        <div className="flex space-x-2">
                                            {feedback.images.map((image, index) => {
                                                // Get full image URL
                                                const imageUrl = getFullImageUrl(image);
                                                return (
                                                    <img
                                                        key={index}
                                                        src={imageUrl}
                                                        alt={`Feedback Image ${index + 1}`}
                                                        className="w-16 h-16 object-cover rounded-lg shadow-md cursor-pointer"
                                                        onClick={() => openModal(imageUrl)} // Open the modal on click
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Modal for showing large image */}
                                {modalImage && (
                                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="bg-white p-4 rounded-lg relative max-w-full max-h-full">
                                            <button
                                                onClick={closeModal}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                            >
                                                X
                                            </button>
                                            <img src={modalImage} alt="Large Feedback Image" className="max-w-full max-h-screen" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">No feedback available.</div>
                    )}

                </div>
            </div>
        </div>
    );
};


const SpecificEvent = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { id } = useParams();
    const API = API_Base;
    const token = sessionStorage.getItem('access_token');
    const role = sessionStorage.getItem('user_group');

    const [selectedEvents, setSelectedEvents] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API}/api/event_specific/?event_id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
            alert(errorMessage);
        }
    }
    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            const response = await axios.delete(`${API}/api/event/${eventId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // closeModal();
            navigate('/agencies')
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEventFeedbackModalOpen, setEventfeedbackUpdateModal] = useState(false);
    const [isMediatorFeedbackModalOpen, setMediatorfeedbackUpdateModal] = useState(false);

    // Function to format time to 'YYYY-MM-DD HH:mm' format
    const formatTime = (time) => {
        const date = new Date(time);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const toggleEventSelection = (id) => {
        setSelectedEvents(prev =>
            prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
        );
    };

    const isAllSelected = selectedEvents.length === eventData.length;

    const toggleAllSelection = () => {
        setSelectedEvents(isAllSelected ? [] : eventData.map(event => event.id));
    };

    return (

        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="w-full pl-20 flex-1 flex flex-col p- overflow-auto">
                <Navbar />

                <div className="w-full flex flex-col items-center mt-10 mb-10">

                    <div className="flex justify-between w-1/2 max-sm:w-full text-gray-500">
                        {/* Buttons */}
                        <button className="focus:outline-none font-[Mada] text-[16px]">Past Month</button>
                        <button className="focus:outline-none font-[Mada] text-[16px]">Past Week</button>
                        <button className="focus:outline-none font-[Mada] text-[16px]">Today</button>
                        <button className="focus:outline-none font-[Mada] text-[16px]">Past Week</button>
                        <button className="focus:outline-none font-[Mada] text-[16px]">Month</button>
                        <button className="focus:outline-none font-[Mada] text-[16px]">Past Month</button>
                    </div>
                    {/* Horizontal line */}
                    <div className="w-1/2 max-sm:w-full border-b-2 border-gray-200 mt-2"></div>
                </div>

                <div className='flex'>
                    <div className='border rounded-lg px-3'>
                        <div className="mb-1 p-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold font-[Nunito]">Event Details</h1>
                            {/* <div className="flex space-x-2">
                            <button onClick={() => navigate(`/create-event/${id}`)} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Event</button>
                        </div> */}
                        </div>
                        <div className="w-full max-sm:w-full border-b-2 border-gray-200 mb-4"></div>
                        {events.map((event) => (
                            <div className="overflow-x-auto">

                                <table className="min-w-full bg-white">
                                    <thead className='bg-[#EAECF0]'>
                                        <tr className="">
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Name</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Location</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Start Time</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">End Time</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Attendees</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Status</th>
                                            <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key={event.id} className="border-b">
                                            <td className="py-2 px-3 font-bold font-inter text-[14px] text-[var(--lightTextGray)]">{event.name || 'N/A'}</td>
                                            <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.address || event.city || event.country || 'N/A'}</td>
                                            <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_begin ? new Date(event.date_begin).toLocaleString() : 'N/A'}</td>
                                            <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_ending ? new Date(event.date_ending).toLocaleString() : 'N/A'}</td>
                                            <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">
                                                {event.mediators && event.mediators.length > 0
                                                    ? event.mediators.map((mediator) => (
                                                        <div key={mediator.id}>
                                                            {mediator.mediator_username} ({mediator.mediator_email})
                                                        </div>
                                                    ))
                                                    : 'No Mediators'}
                                            </td>
                                            <td className="py-2 px-3">
                                                <span className={`flex px-2 py-1 rounded-full text-xs ${event.is_confirmed ? 'bg-green-200 font-bold text-green-900' : 'font-bold bg-[#F2F4F7] text-[#364254]'}`}>
                                                    <span className='mr-2 mt-[5px] pl-1'>
                                                        {event.is_confirmed ? <GreenCircleIcon /> : <GrayCircleIcon />}
                                                    </span>
                                                    {event.is_confirmed ? 'Confirmed' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="py-2 px-3">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="flex justify-end py-6 px-6 space-x-2">
                                    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Update Date</button>
                                    <DateUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} events={events} />
                                    {role === 'super_user' ? (
                                        // Show both buttons if the role is 'super_user'
                                        <>
                                            <button
                                                onClick={() => setMediatorfeedbackUpdateModal(true)}
                                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                            >
                                                Mediator Feedback
                                            </button>
                                            <button
                                                onClick={() => setEventfeedbackUpdateModal(true)}
                                                className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                            >
                                                Event Feedback
                                            </button>
                                        </>
                                    ) : role === 'mediator' ? (
                                        // Show Mediator Feedback button if role is 'event_manager' or 'mediator'
                                        <button
                                            onClick={() => setMediatorfeedbackUpdateModal(true)}
                                            className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                        >
                                            Mediator Feedback
                                        </button>
                                    ) : role === 'event_manager' ? (
                                        // Show Mediator Feedback button if role is 'event_manager' or 'mediator'
                                        <button
                                            onClick={() => setEventfeedbackUpdateModal(true)}
                                            className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                        >
                                            Event Feedback
                                        </button>
                                    ) : (
                                        // Show Event Feedback button for any other role
                                        <p></p>

                                    )}
                                    <EventFeedbackModal isOpen={isEventFeedbackModalOpen} onClose={() => setEventfeedbackUpdateModal(false)} events={events} />
                                    <MediaotorFeedbackModal isOpen={isMediatorFeedbackModalOpen} onClose={() => setMediatorfeedbackUpdateModal(false)} events={events} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <FeedbackCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificEvent;


