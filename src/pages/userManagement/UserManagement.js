import { useState, useEffect } from 'react';
import React from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { MagnifyingIcons } from "../../assets/MagnifyingIcons";
import { fetchAgencies } from '../../components/api/Agency';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';

import Swal from 'sweetalert2'

function UserManagement() {
    const nameMapping = {
        agency_manager: "Agency",
        npo_manager: "No Profit",
        team_manager: "Team",
        mediator: "Mediator",
        event_manager: "Task Manager",
        beneficiary: "Beneficiary",
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Display 5 items per page
    const [selectedAgencies, setSelectedAgencies] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [agenciesData, setAgenciesData] = useState([]); // State to store agencies data
    const token = sessionStorage.getItem("access_token");
    const [deactivatedAgencies, setDeactivatedAgencies] = useState([]);
    const API = API_Base;

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const navigate = useNavigate(); // Get the navigate function

    const handleCreateUser = () => {
        // Navigate to the create-user page when the button is clicked
        navigate('/create-user');
    };


    // Fetch agencies data from the API when the component mounts
    const fetchMembers = async () => {
        try {
            // Make the GET request with Bearer token
            const response = await axios.get(
                `${API}/api/all_members/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAgenciesData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error getting all users:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Error getting all users';
            alert(errorMessage);
        } finally {

        }
    };
    useEffect(() => {
        fetchMembers();
    }, []);

    const handleDeactivate = async (agencyId) => {
        try {
            // Make the DELETE request to deactivate the agency
            await axios.delete(`${API}/api/delete_user/${agencyId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in headers
                },
            });

            // On success, update the deactivated agencies state
            setDeactivatedAgencies((prev) => [...prev, agencyId]);
            fetchMembers();

            // Optionally log the agency ID to verify the deactivation
            console.log(`Agency with ID ${agencyId} has been deactivated.`);
            Swal.fire({
                title: "User Deactivated Sucessfully!",
                icon: "success"
            });
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
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
    const showDeactivationConfirmation = (agencyId) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, disable it!"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeactivate(agencyId);
            }
        });
    };

    const handleActivate = async (agencyId) => {
        try {
            // Make the POST request to activate the agency
            await axios.delete(`${API}/api/activate_user/${agencyId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Include the token in headers
                },
            });

            // Update state and fetch updated members
            setDeactivatedAgencies((prev) => prev.filter((id) => id !== agencyId));
            fetchMembers();

            Swal.fire({
                title: "User Activated Successfully!",
                icon: "success",
            });
        } catch (error) {
            console.error('Error activating agency:', error);

            // Handle error responses
            const statusCode = error.response.status;
            const errorMessage = error.response.data.detail || error.message;
            if (statusCode === 401) {
                Swal.fire({ icon: "error", title: errorMessage });
            } else if (statusCode === 406 || statusCode === 404 || statusCode === 400) {
                Swal.fire({ icon: "question", title: errorMessage });
            } else {
                Swal.fire({ icon: "error", title: errorMessage });
            }
        }
    };


    // Check if agenciesData is actually an array before calling .map()
    if (!Array.isArray(agenciesData)) {
        return <div>Error: Data is not in expected format</div>;
    }
    // useEffect(() => {
    //   fetchAgencies().then((data) => {
    //     setAgenciesData(
    //       data.map((agency) => ({
    //         id: agency.id,
    //         type: agency.type,
    //         name: agency.company_name,
    //         phone: agency.phone,
    //         email: agency.email,
    //         country: agency.country,
    //         status: 'Online',
    //       }))
    //     );
    //   });
    // }, []);

    // Toggle individual agency selection
    const toggleAgencySelection = (id) => {
        setSelectedAgencies((prev) =>
            prev.includes(id) ? prev.filter((agencyId) => agencyId !== id) : [...prev, id]
        );
        console.log('Selected Agency ID:', id);
    };

    // Handle Select All functionality
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const currentItems = currentAgencies.map((agency) => agency.id);
            setSelectedAgencies([...new Set([...selectedAgencies, ...currentItems])]);
        } else {
            const currentItems = currentAgencies.map((agency) => agency.id);
            setSelectedAgencies(selectedAgencies.filter((id) => !currentItems.includes(id)));
        }
    };

    // Pagination Logic
    const indexOfLastAgency = currentPage * itemsPerPage;
    const indexOfFirstAgency = indexOfLastAgency - itemsPerPage;
    const currentAgencies = agenciesData.slice(indexOfFirstAgency, indexOfLastAgency);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-20 flex-1 flex flex-col overflow-hidden">
                < Navbar />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
                    <div className="container mt-20 max-sm:w-full w-10/12 mx-auto">
                        <div className="flex justify-between items-center mb-6 max-sm:flex-col">

                            <h1 className="text-2xl font-semibold font-[Poppins]">All Users Data</h1>
                            <div className="flex items-center max-sm:flex-col">
                                <button onClick={handleCreateUser} className="px-4 mr-2 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create User</button>
                                <div className="relative mr-4 max-sm:mt-5 max-sm:mb-5">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="pl-10 pr-4 py-2 bg-[#F9FBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <MagnifyingIcons />
                                    </span>
                                </div>
                                <div className="flex bg-[#F9FBFF] items-center">
                                    <span className="mr-2 text-sm text-gray-600">Short by:</span>
                                    <select className="bg-[#F9FBFF] rounded-md py-1 font-[Poppins] font-bold px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Newest</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-left text-xs font-light text-[var(--lightTextGray)] font-[Poppins] uppercase tracking-wider">
                                        <th className="p-3">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-orange-600"
                                                checked={selectAll}
                                                onChange={handleSelectAll}
                                            />
                                        </th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3">UserName</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Phone Number</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                {/* <tbody className="bg-white divide-y divide-gray-200">
                                    {currentAgencies.map((agency) => (
                                        <tr key={agency.id} className="hover:bg-gray-50 font-[Poppins] font-medium">
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 text-orange-600"
                                                    checked={selectedAgencies.includes(agency.id)}
                                                    onChange={() => toggleAgencySelection(agency.id)}
                                                />
                                            </td>
                                            <td className="p-3">{agency.type}</td>
                                            <td className="p-3">{agency.name}</td>
                                            <td className="p-3">{agency.phone}</td>
                                            <td className="p-3">{agency.email}</td>
                                            <td className="p-3">{agency.country}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-4 py-1 rounded-[8px] text-xs ${agency.status === 'Online'
                                                        ? 'bg-green-200 text-green-800 border border-green-800'
                                                        : 'bg-red-200 text-red-800 border border-red-900'
                                                        }`}
                                                >
                                                    {agency.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody> */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {agenciesData.map((agency) => (
                                        <tr
                                            key={agency.user_id}
                                            className={`hover:bg-gray-50 font-[Poppins] font-medium ${agency.is_disable ? 'bg-yellow-100' : ''  // Highlight disabled rows
                                                }`}
                                        >
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-4 w-4 text-orange-600"
                                                />
                                            </td>
                                            <td className="p-3">{nameMapping[agency.group] || agency.group}</td>                                            <td className="p-3">{agency.username}</td>
                                            <td className="p-3">{agency.user_email}</td>
                                            <td className="p-3">
                                                N-A
                                            </td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-4 py-1 rounded-[8px] text-xs ${agency.is_hired
                                                        ? 'bg-green-200 text-green-800 border border-green-800'
                                                        : 'bg-red-200 text-red-800 border border-red-900'
                                                        }`}
                                                >
                                                    {agency.is_hired ? 'Hired' : 'Not Hired'}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className={`px-4 py-1 rounded-[8px] text-xs ${agency.is_disable
                                                        ? 'bg-green-200 text-green-800 border border-green-800'  // Activate button style
                                                        : 'bg-yellow-200 text-yellow-800 border border-yellow-800'  // Disable button style
                                                        }`}
                                                    onClick={() => agency.is_disable ? handleActivate(agency.user_id) : showDeactivationConfirmation(agency.user_id)}
                                                >
                                                    {agency.is_disable ? 'Activate' : 'Disable'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        {/* Pagination Section */}
                        {/* <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm font-[Poppins] text-gray-600">
                                Showing {indexOfFirstAgency + 1} to {Math.min(indexOfLastAgency, agenciesData.length)} of {agenciesData.length} entries
                            </p>
                            <div className="flex">
                                <button
                                    className="px-3 py-1 rounded-l-md border bg-white text-gray-600 hover:bg-gray-100"
                                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                {[...Array(Math.ceil(agenciesData.length / itemsPerPage)).keys()].map((num) => (
                                    <button
                                        key={num + 1}
                                        onClick={() => paginate(num + 1)}
                                        className={`px-3 ml-2 mr-2 rounded-[8px] py-1 border ${currentPage === num + 1 ? 'bg-[var(--darkBlue)] text-white' : 'bg-white text-gray-600'
                                            } hover:bg-blue-100`}
                                    >
                                        {num + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-3 py-1 rounded-r-md border bg-white text-gray-600 hover:bg-gray-100"
                                    onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(agenciesData.length / itemsPerPage)))}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="mt-10">
                        <div className="flex justify-center gap-4 pb-4 max-sm:flex-col">
                            <button onClick={handleCreateUser} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create User</button>
                            <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Modify Details</button>
                            <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">View Details</button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800">Delete</button>
                        </div>
                    </div> */}
                </main>
            </div>
        </div>
    );
};

export default UserManagement