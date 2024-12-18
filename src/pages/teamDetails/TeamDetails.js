import { React, useState, Fragment, useEffect } from 'react';
import TeamCard from '../../components/teamCard/TeamCard';
import { Sidebar } from '../../components/sideBar/SideBar';
import { Navbar } from '../../components/navBar/NavBar';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import axios from 'axios';
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Delete Data</h2>
                <p className="text-center text-gray-600 mb-6">Are you sure you want to delete this ?</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};



const TeamDetails = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const cardsPerPage = 3; // Display 3 cards per page
    const { id } = useParams();
    const token = sessionStorage.getItem('access_token');
    const API = API_Base;

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [teamData, setTeamData] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const url = id && id.trim() !== ""
            ? `${API}/api/get_npos/?npo_id=${id}`
            : `${API}/api/get_npos/`;

        axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setTeamData(response.data);
            })
            .catch((error) => {
                console.error('Error getting team:', error);

                // Extract and show error message from the response
                const errorMessage = error.response?.data?.detail || 'Failed to get the team.';
                alert(errorMessage);
            });
    }, [id, token]);

    const handleCreateTeam = (npo_id) => {
        navigate('/create-team', {
            state: { npo_id }, // Send the manager and id as state
        });
    };

    const handleDelete = async (teamId) => {
        try {
            // Make DELETE request to API
            const response = await axios.delete(`${API}/api/team/${teamId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            navigate("/agencies");
            closeModal();
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Failed to delete the team.');
        }
    };

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    // Example team data, you can have more entries
    const teamsData = [
        {
            teamNumber: '01',
            mediator: 'Alice Smith',
            beneficiary: 'Community Center',
            pastEvents: ['Event #01: August 20th, 2024 (Initial Discussion)'],
            todayEvent: 'Event #02 (Today 11:00 AM)',
            upcomingEvents: ['Event #04: October 10th, 2024 (Scheduled Meeting)'],
            currentTime: 'Today 01:00 PM',
            currentTask: '01',
            totalEvents: '05',
            completed: true,
            priority: "High",
            priorityLabel: "High"
        },
        {
            teamNumber: '02',
            mediator: 'Bob Johnson',
            beneficiary: 'Shelter House',
            pastEvents: ['Event #01: July 15th, 2024 (First Check-in)'],
            todayEvent: 'Event #03 (Today 02:00 PM)',
            upcomingEvents: ['Event #05: November 1st, 2024 (Final Presentation)'],
            currentTime: 'Today 02:00 PM',
            currentTask: '02',
            totalEvents: '05',
            completed: false,
            priority: "High",
            priorityLabel: "High"
        },
        {
            teamNumber: '03',
            mediator: 'Charlie Davis',
            beneficiary: 'Youth Center',
            pastEvents: ['Event #01: September 5th, 2024 (Planning Meeting)'],
            todayEvent: 'Event #02 (Today 12:00 PM)',
            upcomingEvents: ['Event #06: November 10th, 2024 (Final)'],
            currentTime: 'Today 12:00 PM',
            currentTask: '03',
            totalEvents: '06',
            completed: false,
            priority: "High",
            priorityLabel: "High"
        },
        {
            teamNumber: '04',
            mediator: 'Daniel Lee',
            beneficiary: 'Sports Club',
            pastEvents: ['Event #01: August 30th, 2024 (Preliminary)'],
            todayEvent: 'Event #03 (Today 11:00 AM)',
            upcomingEvents: ['Event #07: November 15th, 2024 (Wrap-Up)'],
            currentTime: 'Today 11:00 AM',
            currentTask: '04',
            totalEvents: '07',
            completed: false,
            priority: "High",
            priorityLabel: "High"
        },

    ];

    // Pagination logic
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = teamsData.slice(indexOfFirstCard, indexOfLastCard);

    const nextPage = () => {
        if (currentPage < Math.ceil(teamsData.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Create pagination buttons dynamically based on the number of pages
    const totalPages = Math.ceil(teamsData.length / cardsPerPage);
    const paginationItems = [];
    const userGroup = sessionStorage.getItem('user_group');


    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <button
                key={i}
                onClick={() => goToPage(i)}
                className={`px-4 py-2 rounded-md ${currentPage === i ? 'bg-[#001a72] text-white' : 'bg-gray-200'
                    }`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-20 flex-1 flex flex-col overflow-hidden">
                <Navbar heading={["Agency Dashboard > Team Details > "]} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h1 className='mt-5 mb-10 text-center text-2xl font-[Nunito] font-extrabold text-[var(--darkBlue)]'>NPO Teams</h1>
                    <div>
                        {/* TaskCards - Full width on small screens, 75% on large screens */}
                        <div>
                            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> */}
                            {teamData ? (
                                teamData.map((npo) => (
                                    <div key={npo.id}>
                                        <div className='flex justify-end'>
                                        {(userGroup === 'super_user' || userGroup === 'agency_manager' || userGroup === 'npo_manager') && (
                                            <button
                                                className="px-4 mr-2 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800"
                                                onClick={() => handleCreateTeam(npo.id)}
                                            >
                                                Create Team
                                            </button>
                                        )}
                                        </div>
                                        <div className="w-full lg:w-3/4 mb-6 lg:mb-0 lg:pr-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {npo.team && npo.team.length > 0 ? (
                                                    npo.team.map((team) => (
                                                        <div key={team.id} className="team-card">

                                                            <div className="mx-auto w-72 h-[600px] bg-[var(--cardTeamBg)] rounded-lg shadow-lg p-5">
                                                                <div className='flex h-32'>
                                                                    <span className='mr-4 mt-1'><AgenciesManagementIcon color={'#03045E'} /></span>
                                                                    <h2 onClick={() => navigate(`/event-management/${team.id}`)} className="text-2xl cursor-pointer font-bold underline text-[var(--darkBlue)] font-[Nunito] mb-4 text-center">{team.name}</h2>

                                                                    {/* <div>
                                                                        <button onClick={() => navigate(`/modify-team/${team.id}`)} className='mt-1 ml-4'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                            </svg>
                                                                        </button>
                                                                        <button onClick={() => handleDelete(team.id)} className='mt-1 ml-4'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                            </svg>
                                                                        </button>
                                                                    </div> */}
                                                                </div>

                                                                <div className='bg-white h-[300px] p-10 rounded-[24px]'>
                                                                    <div className="mb-4">
                                                                        <p className="font-bold">Team Number: <span className='text-red-500'>{team.id}</span></p>
                                                                        <p><span className='font-bold'>Mediators:</span>
                                                                            <ul className='font-serif'>
                                                                                {team.mediators && team.mediators.map((mediator) => (
                                                                                    <li key={mediator.id}>
                                                                                        • {mediator.mediator_username}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className='flex justify-center py-4'>
                                                                {(userGroup === 'super_user' || userGroup === 'agency_manager' || userGroup === 'npo_manager') && (
                                                                    <button onClick={() => navigate(`/modify-team/${team.id}`)} className='mt-1 ml-4 px-4 mr-2 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-600'>
                                                                        EDIT
                                                                    </button>
                                                                )}
                                                                    
                                                                    {(userGroup === 'super_user' || userGroup === 'agency_manager' || userGroup === 'npo_manager') && (
                                                                    <button onClick={openModal} className='mt-1 ml-4 px-4 mr-2 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600'>
                                                                        DELETE
                                                                    </button>
                                                                    )}
                                                                    <Modal isOpen={isModalOpen} onClose={closeModal} onDelete={() => handleDelete(team.id)} />
                                                                </div>
                                                                <div className="flex justify-center">
                                                                    <button className=" text-white rounded-full px-4 py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M18 12L12 18L6 12" stroke="#222222" />
                                                                        <path d="M18 6L12 12L6 6" stroke="#222222" />
                                                                    </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))
                                                ) : (
                                                    <p>No teams available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Team</p> // Display loading if no data is yet available
                            )}







                            {/* {currentCards.map((team, index) => (
                                    <Link to="/team-user-management" key={index}>
                                        <TeamCard key={index} {...team} />
                                    </Link>
                                ))} */}
                            {/* </div> */}
                        </div>

                        {/* Scheduling grid - Full width on small screens, 25% on large screens */}
                        {/* <div className="w-full lg:w-1/4 rounded-lg p-4  ">
                            <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
                            <div className="grid grid-cols-7 gap-2 text-center text-sm">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <span key={day}>{day}</span>
                                ))}
                                {[...Array(35)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-6 h-6 rounded-md ${Math.random() > 0.5 ? 'bg-[#0077B6]' : 'bg-gray-300'}`}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-4 text-sm">
                                <div className="flex items-center mr-4">
                                    <div className="w-4 h-4 bg-[#0077B6] rounded-md mr-2"></div>
                                    <span>Assigned</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-gray-300 rounded-md mr-2"></div>
                                    <span>Not Assigned</span>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Pagination Controls */}
                    {/* <div className="flex justify-center lg:justify-end mt-6">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={previousPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white'
                                    }`}
                            >
                                &lt;
                            </button>
                            {paginationItems}
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white'
                                    }`}
                            >
                                &gt;
                            </button>
                        </div>
                    </div> */}
                </main>
            </div >
        </div >
    );
};
export default TeamDetails;




