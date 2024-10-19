import React, { useState } from 'react';
import TaskCard from '../../components/taskCard/TaskCard';
import { Sidebar } from '../../components/sideBar/SideBar';
import { Navbar } from '../../components/navBar/NavBar';
import {Link} from "react-router-dom"
const TaskDetails = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Example team data (unchanged)
    const teamsData = [
        {
            taskNumber: '01',
            mediator: 'Alice Smith',
            beneficiary: 'Community Center',
            pastEvents: ['Event #01: August 20th, 2024 (Initial Discussion)'],
            todayEvent: 'Event #02 (Today 11:00 AM)',
            upcomingEvents: ['Event #04: October 10th, 2024 (Scheduled Meeting)'],
            currentTime: 'Today 01:00 PM',
            currentTask: '01',
            totalEvents: '05',
            completed :false,
            priority : "High",
            priorityLabel : "High"
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
            completed :false,
            priority : "High",
            priorityLabel : "High"
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
            completed :false,
            priority : "High",
            priorityLabel : "High"
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
            completed :false,
            priority : "High",
            priorityLabel : "High"
        },
        // ... (include the rest of the team data here)
    ];

    // Pagination logic (unchanged)
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

    const totalPages = Math.ceil(teamsData.length / cardsPerPage);
    const paginationItems = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <button
                key={i}
                onClick={() => goToPage(i)}
                className={`px-4 py-2 rounded-md ${currentPage === i ? 'bg-[#001a72] text-white' : 'bg-gray-200'}`}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-20 flex-1 flex flex-col overflow-hidden">
                <Navbar heading={["Agency Dashboard > Task Details > "]}/>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <h1 className='mt-5 mb-10 text-center text-2xl font-[Nunito] font-extrabold text-[var(--darkBlue)]'>NPO 01 Tasks</h1>
                    <div className="flex flex-col lg:flex-row lg:justify-between">
                        {/* TaskCards - Full width on small screens, 75% on large screens */}
                        <div className="w-full lg:w-3/4 mb-6 lg:mb-0 lg:pr-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentCards.map((team, index) => (
                                    <Link to="/team-details  "key={index}>
                                        <TaskCard key={index} {...team} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Scheduling grid - Full width on small screens, 25% on large screens */}
                        <div className="w-full lg:w-1/4 rounded-lg p-4  ">
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
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center lg:justify-end mt-6">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={previousPage}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white'
                                }`}
                            >
                                &lt;
                            </button>
                            {paginationItems}
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white'
                                }`}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TaskDetails;