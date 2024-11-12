import React, { useState } from 'react';
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

// Stat Card Component
const StatCard = ({ icon, label, value, change, changeType }) => {
  return (
    <div className="flex font-[Poppins] items-center  rounded-lg p-6">
      <div style={{background:"linear-gradient(180.26deg, #03045E 16.54%, #EFFFF6 131.95%)"}} className="flex items-center justify-center w-16 h-16  text-white rounded-full">
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-20 flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className='justify-center'>
          <StatsRow />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {npoCards.map((npo, index) => (
              <Link to="/task-details" key={index}>
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
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAgency;
