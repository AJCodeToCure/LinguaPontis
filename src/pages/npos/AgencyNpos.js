import { useState, useEffect } from 'react';
import React from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { MagnifyingIcons } from "../../assets/MagnifyingIcons";
import { fetchAgencies } from '../../components/api/Agency';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { useParams } from 'react-router-dom';

function AgencyNpos() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Display 5 items per page
    const [selectedAgencies, setSelectedAgencies] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [agenciesData, setAgenciesData] = useState([]); // State to store agencies data
    const { id } = useParams();


    const [npos, setNpos] = useState([]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('access_token');
    const API = API_Base;

    useEffect(() => {
        const fetchNpos = async () => {
            try {
                const response = await axios.get(`${API}/api/get_agencies/?agency_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setNpos(response.data);
            } catch (error) {
                console.error('Error fetching members:', error.response ? error.response.data : error.message);
            }
        };

        fetchNpos();
    }, [token]); // Only run once on mount

    const handleModify = (id) => {
        navigate(`/modify-npo/${id}`); // Navigate to /modify-agency with the agency's ID
    };

    // Handle delete action
    const handleDelete = async (agencyId) => {
        try {
            // Perform the DELETE request
            await axios.delete(`${API}/api/get_npos/${agencyId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // On success, remove the deleted agency from the state
            setNpos((prev) => prev.filter((agency) => agency.id !== agencyId));
            console.log(`Agency with ID ${agencyId} has been deleted.`);
            alert('Agency Deleted Sucessfully')
        } catch (error) {
            console.error('Error deleting agency:', error.response ? error.response.data : error.message);
        }
    };

    // Toggle agency selection for checkbox
    const toggleAgencySelection = (agencyId) => {
        setSelectedAgencies((prevSelected) =>
            prevSelected.includes(agencyId)
                ? prevSelected.filter((id) => id !== agencyId)
                : [...prevSelected, agencyId]
        );
    };

    // Function to determine agency status
    const getStatus = (agency) => {
        // Assuming status based on `date_ending`, or other custom logic
        const currentDate = new Date();
        const endDate = new Date(agency.date_ending);

        if (endDate > currentDate) {
            return 'Online'; // Assuming the agency is online if the `date_ending` is in the future
        } else {
            return 'Offline'; // Otherwise, the agency is considered offline
        }
    };


    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
                    <div className="container mt-20 max-sm:w-full w-10/12 mx-auto">
                        <div className="flex justify-between items-center mb-6 max-sm:flex-col">
                            <h1 className="text-2xl font-semibold font-[Poppins]">All Npos Data</h1>
                            <div className="flex items-center max-sm:flex-col">
                                {/* <button
                                    className="px-4 mr-2 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                    onClick={() => navigate('/create-npo')} 
                                >
                                    Create Npo
                                </button> */}
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
                                        <th className="p-3">NPO/Agency</th>
                                        <th className="p-3">Company Name</th>
                                        <th className="p-3">Phone Number</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Country</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {npos.map((agency) => (
                                        agency.npo.map((npo) => (  // Loop over each NPO in the agency's npo array
                                            <tr key={npo.id} className="hover:bg-gray-50 font-[Poppins] font-medium">
                                                <td className="p-3">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-orange-600"
                                                        checked={selectedAgencies.includes(npo.id)}
                                                        onChange={() => toggleAgencySelection(npo.id)}  // Toggle selection for the NPO
                                                    />
                                                </td>
                                                <td className="p-3">{npo.company_type}</td> {/* NPO Type */}
                                                <td className="p-3">{npo.company_name}</td> {/* NPO Name */}
                                                <td className="p-3">{npo.phone || 'N/A'}</td> {/* Phone, if not available show 'N/A' */}
                                                <td className="p-3">{npo.email || 'N/A'}</td> {/* Email, if not available show 'N/A' */}
                                                <td className="p-3">{npo.country || 'N/A'}</td> {/* Country, if not available show 'N/A' */}
                                                <td className="p-3">
                                                    <span
                                                        className={`px-4 py-1 rounded-[8px] text-xs ${getStatus(npo) === 'Online'
                                                            ? 'bg-green-200 text-green-800 border border-green-800'
                                                            : 'bg-red-200 text-red-800 border border-red-900'
                                                            }`}
                                                    >
                                                        {getStatus(npo)} {/* Display the NPO status */}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <button
                                                        onClick={() => handleDelete(npo.id)}  // Trigger delete for NPO
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </button>
                                                    <button className='ml-2' onClick={() => handleModify(npo.id)}>  {/* Pass npo.id to handleModify */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Section
                        <div className="mt-4 flex justify-between items-center">
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
                </main>
            </div>
        </div>
    )
}

export default AgencyNpos