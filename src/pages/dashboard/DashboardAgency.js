import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskData from './taskData';
import { Sidebar } from '../../components/sideBar/SideBar';
import { Navbar } from '../../components/navBar/NavBar';
import MainNPOcard from '../../components/mainNPOcard/MainNPOCard';
import userImg from "../../assets/images/user1.png";
import userImg2 from "../../assets/images/user2.png";
import { FaArrowUp, FaArrowDown, FaUsers, FaLaptop, FaUserCircle, FaUserFriends } from 'react-icons/fa';
// import { TeamManagementIcon } from '../../assets/TeamManagementIcon';
import { AgencyTeamIcon } from '../../assets/AgencyTeamIcon';
import { BeneficiaryIcon } from '../../assets/BeneficiaryIcon';
import { MediatorIcon } from '../../assets/MediatorIcon';
import { VisitorIcon } from '../../assets/VisitorIcon';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
import { ChevronRight } from 'lucide-react';

// Stat Card Component
const StatCard = ({ icon, label, value, change, changeType }) => {
  return (
    <div className="flex font-[Poppins] items-center  rounded-lg p-6">
      <div style={{ background: "linear-gradient(180.26deg, #03045E 16.54%, #EFFFF6 131.95%)" }} className="flex items-center justify-center w-16 h-16  text-white rounded-full">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        {change !== undefined && (
          <div className="flex items-center">
            {changeType === 'increase' ? (
              <FaArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <FaArrowDown className="w-4 h-4 text-red-500" />
            )}
            <p className={`ml-1 text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
              {changeType === 'increase' ? `+${change}%` : `${change}%`} this month
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Stats Row Component
const StatsRow = () => {
  return (
    <div className="flex flex-wrap justify-center space-x-6 space-y-6 sm:space-y-0 mb-8">
      <StatCard
        icon={<AgencyTeamIcon />}
        label="Agencies"
        value="321"
      />
      <div className='mt-3 hidden sm:block'>
        <svg width="2" height="89" viewBox="0 0 2 89" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.778809" y1="0.5" x2="0.778805" y2="88.2076" stroke="#0077B6" stroke-linecap="round" />
        </svg>
      </div>
      <StatCard
        icon={<BeneficiaryIcon />}
        label="Beneficiaries"
        value="234"
        change="1"
        changeType="decrease"
      />
      <div className='mt-3 hidden sm:block'>
        <svg width="2" height="89" viewBox="0 0 2 89" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.778809" y1="0.5" x2="0.778805" y2="88.2076" stroke="#0077B6" stroke-linecap="round" />
        </svg>
      </div>
      <StatCard
        icon={<MediatorIcon />}
        label="Mediators"
        value="123"
      />
      <div className='mt-3 hidden sm:block'>
        <svg width="2" height="89" viewBox="0 0 2 89" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.778809" y1="0.5" x2="0.778805" y2="88.2076" stroke="#0077B6" stroke-linecap="round" />
        </svg>
      </div>
      <StatCard
        icon={<VisitorIcon />}
        label="Visitors"
        value="150"
        change="16"
        changeType="increase"
      />
    </div>
  );
};


// Main Dashboard Component
const DashboardAgency = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [taskData, setTaskData] = useState(TaskData);
  const { id } = useParams();

  // Example data for rendering multiple cards
  const npoCards = [
    {
      date: "October 01, 2024",
      npoNumber: "01",
      totalTasks: 5,
      lastUpdated: "October 03, 2024",
      hoursConsumed: 10,
      totalHours: 40,
      teamMembers: [{ avatar: userImg }, { avatar: userImg2 }],
      priority: "High",
      pendingEvents: 3
    },
    // Add more objects for rendering additional NPO cards
    {
      date: "October 05, 2024",
      npoNumber: "02",
      totalTasks: 3,
      lastUpdated: "October 06, 2024",
      hoursConsumed: 25,
      totalHours: 30,
      teamMembers: [{ avatar: userImg }, { avatar: userImg2 }],
      priority: "Medium",
      pendingEvents: 1
    },
    {
      date: "October 05, 2024",
      npoNumber: "03",
      totalTasks: 3,
      lastUpdated: "October 06, 2024",
      hoursConsumed: 9,
      totalHours: 30,
      teamMembers: [{ avatar: userImg }, { avatar: userImg2 }],
      priority: "Medium",
      pendingEvents: 1
    },
    {
      date: "October 05, 2024",
      npoNumber: "04",
      totalTasks: 3,
      lastUpdated: "October 06, 2024",
      hoursConsumed: 3,
      totalHours: 30,
      teamMembers: [{ avatar: userImg }, { avatar: userImg2 }],
      priority: "Medium",
      pendingEvents: 1
    },
    {
      date: "October 05, 2024",
      npoNumber: "05",
      totalTasks: 3,
      lastUpdated: "October 06, 2024",
      hoursConsumed: 12,
      totalHours: 30,
      teamMembers: [{ avatar: userImg }, { avatar: userImg2 }],
      priority: "High",
      pendingEvents: 1
    },
    // ... Add more cards if needed
  ];

  const [npos, setNpos] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('access_token');
  const role = sessionStorage.getItem('user_group');
  const [teamData, setTeamData] = useState(null);

  const API = API_Base;

  useEffect(() => {
    // Function to fetch NPOS
    const fetchNpos = async () => {
      try {
        const response = await axios.get(`${API}/api/get_npos/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setNpos(response.data);
      } catch (error) {
        const statusCode = error.response?.status || 404;
        const errorMessage = error.response?.data.detail || error.message;
        Swal.fire({
          icon: statusCode === 401 ? "error" : "question",
          title: errorMessage,
        });
      }
    };

    // Function to fetch Team Data
    const fetchTeamData = async () => {
      try {
        const response = await axios.get(`${API}/api/get_all_events/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setTeamData(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data : 'Error fetching team data');
      }
    };

    // Conditionally trigger API calls based on the user's role
    if (role === 'super_user' || role === 'agency_manager' || role === 'npo_manager') {
      fetchNpos();
    } else {
      fetchTeamData();
    }
  }, [token, role]);

  function formattedDate(date) {
    const parsedDate = new Date(date); // Parse the ISO date string into a Date object
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-20 flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className='justify-center'>
            <StatsRow />
          </div>
          <div>
            {role === 'super_user' || role === 'agency_manager' || role === 'npo_manager' ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {npos.map((npo) => (
                  <div key={npo.id} className="bg-sky-100 h-96 rounded-3xl p-6 max-w-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">{formattedDate(npo.date_begin)}</span>
                      <ChevronRight className="text-blue-800" />
                    </div>

                    <div className="flex justify-center text-center items-center mb-4">
                      <span className='mr-2'> <AgenciesManagementIcon color={"#03045E"} /> </span>
                      <h2 onClick={() => navigate(`/team-details/${npo.id}`)} className="text-center cursor-pointer text-2xl font-[800] font-[Nunito] text-[var(--darkBlue)]">{npo.company_name}</h2>
                    </div>

                    <div className="text-gray-600 justify-center text-center mb-4">
                      <p>Total Tasks: {3}</p>
                      <p>Last Updated: {formattedDate(npo.date_ending)}</p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold font-[Nunito] text-[var(--darkBlue)]">Hours Consumed</span>
                        <span className='text-[var(--darkBlue)] font-bold'>{20}%</span>
                      </div>
                      <div className="bg-white rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[var(--darkBlue)] h-full"
                          style={{ width: `${20}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between font-[Nunito] font-bold text-xs mt-1">
                        <span>Total: {'N-A'} hours</span>
                        <span className="text-red-500 text-[7px] -translate-y-4 -translate-x-1">{'Na'} hours left</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {/* {teamMembers.map((member, index) => (
                    <img
                      key={index}
                      src={member.avatar}
                      alt={`Team member ${index + 1}`}
                      className="w-9 h-8 rounded-full border-2 border-white"
                    />
                  ))} */}
                        <div className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center text-[#FF942E] text-4xs font-bold">
                          +
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* <span className={`px-2 py-2 rounded-full text-xs font-semibold ${'N-A' === 'High' ? 'bg-white text-red-800' :
                      'Done' === 'Medium' ? 'bg-white text-yellow-800' :
                        'bg-white text-green-800'
                      }`}>
                      {'N-A'}
                    </span> */}
                        <span className="text-[var(--darkBlue)] bg-white px-2 py-1 md:py-2 md:px-4 rounded-[16px] font-[Nunito] text-xs md:text-sm font-bold whitespace-nowrap">
                          Events Pending
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div>
              {
                npoCards.map((npo, index) => (
                  // <Link to="/task-details" key={index}>
                  <Link>
                    <MainNPOcard
                      date={npo.date}
                      npoNumber={npo.npoNumber}
                      totalTasks={npo.totalTasks}
                      lastUpdated={npo.lastUpdated}
                      hoursConsumed={npo.hoursConsumed}
                      totalHours={npo.totalHours}
                      teamMembers={npo.teamMembers}
                      priority={npo.priority}
                      pendingEvents={npo.pendingEvents}
                    />
                  </Link>
                ))
              }
            </div> */}
              </div>
            ) : (
              // This div will show if the role is anything else

              <div>
                {Array.isArray(teamData) && teamData.length > 0 ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {teamData.map((team) => (
                      <div key={team.id} className="bg-sky-100 h-96 rounded-3xl p-6 max-w-sm">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">{formattedDate(team.date_begin)}</span>
                          <ChevronRight className="text-blue-800" />
                        </div>

                        <div className="flex justify-center text-center items-center mb-4">
                          <span className='mr-2'> <AgenciesManagementIcon color={"#03045E"} /> </span>
                          <h2 onClick={() => navigate(`/specific-event/${team.id}`)} className="text-center cursor-pointer text-2xl font-[800] font-[Nunito] text-[var(--darkBlue)]">{team.name}</h2>
                        </div>

                        <div className="text-gray-600 justify-center text-center mb-4">
                          <p>Total Tasks: {3}</p>
                          <p>Last Updated: {formattedDate(team.date_ending)}</p>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-bold font-[Nunito] text-[var(--darkBlue)]">Hours Consumed</span>
                            <span className='text-[var(--darkBlue)] font-bold'>{20}%</span>
                          </div>
                          <div className="bg-white rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[var(--darkBlue)] h-full"
                              style={{ width: `${20}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between font-[Nunito] font-bold text-xs mt-1">
                            <span>Total: {'N-A'} hours</span>
                            <span className="text-red-500 text-[7px] -translate-y-4 -translate-x-1">{'Na'} hours left</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {/* {teamMembers.map((member, index) => (
                    <img
                      key={index}
                      src={member.avatar}
                      alt={`Team member ${index + 1}`}
                      className="w-9 h-8 rounded-full border-2 border-white"
                    />
                  ))} */}
                            <div className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center text-[#FF942E] text-4xs font-bold">
                              +
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/* <span className={`px-2 py-2 rounded-full text-xs font-semibold ${'N-A' === 'High' ? 'bg-white text-red-800' :
                      'Done' === 'Medium' ? 'bg-white text-yellow-800' :
                        'bg-white text-green-800'
                      }`}>
                      {'N-A'}
                    </span> */}
                            <span className="text-[var(--darkBlue)] bg-white px-2 py-1 md:py-2 md:px-4 rounded-[16px] font-[Nunito] text-xs md:text-sm font-bold whitespace-nowrap">
                              Events Pending
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAgency;
