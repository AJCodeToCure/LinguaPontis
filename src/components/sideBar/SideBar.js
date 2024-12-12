// // Navbar Component
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
// import Logo from '../../assets/Logo';
// import DashboardIcon from '../../assets/DashboardIcon';
// import EventManagementIcons from '../../assets/EventManagementIcons';
// import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
// import { CreatAgencyIcons } from '../../assets/MediatorAvailablitiyIcons';
// import TaskManagementIcon from '../../assets/TaskManagementIcon';
// import { NotificationIcon } from '../../assets/NotificationIcon';
// import ExitToAppIcon from '../../assets/ExitToAppIcon';
// import SettingsIcon from '../../assets/SettingsIcon';
// import { useNavigate } from 'react-router-dom';

// export const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const menuItems = [
//     { icon: <DashboardIcon className="w-6 h-6" />, label: 'Dashboard', link: '/dashboard' },
//     { icon: <EventManagementIcons className="w-6 h-6" />, label: 'Event Management', link: '/event-management' },
//     { icon: <AgenciesManagementIcon className="w-6 h-6" />, label: 'Agencies', link: '/agencies' },
//     { icon: <CreatAgencyIcons className="w-6 h-6" />, label: 'Create Agency', link: '/create-agency' },
//     { icon: <TaskManagementIcon className="w-6 h-6" />, label: 'Task Management', link: '/task-management' },
//     { icon: <NotificationIcon className="w-6 h-6" />, label: 'Notifications', link: '#' }, // Add notification route if applicable
//     { icon: <SettingsIcon className="w-6 h-6" />, label: 'Settings', link: '#' }, // Add settings route if applicable
//     { icon: <ExitToAppIcon className="w-6 h-6" />, label: 'Logout', link: '#' },
//   ];

//   const navigate = useNavigate();

//   // Logout function
//   const handleLogout = () => {
//     // Clear sessionStorage
//     sessionStorage.removeItem('user_group');
//     sessionStorage.removeItem('access_token');

//     // Optionally, navigate to the login page after logout
//     navigate('/login');
//   };

//   return (
//     <aside className={`absolute z-[9999] bg-[var(--darkBlue)] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} min-h-screen`}>
//       <div className="mt-[63.5px] p-4 flex items-center justify-between">
//         <h2 className={`flex justify-center align-middle text-[14px] font-bold font-[Lexend Mega] ${isOpen ? 'block' : 'hidden'}`} style={{ fontFamily: "Lexend Mega" }}>
//           <span className='mr-2 justify-center mt-0'><Logo /></span>  LinguoPontis
//         </h2>
//         <button onClick={toggleSidebar} className={`text-white bg-[#0077B6] translate-y-10 ${isOpen ? "translate-x-6 delay-0.5" : "translate-x-12 delay-0.5"} rounded-[16px]`}>
//           {isOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
//         </button>
//       </div>
//       <nav className='mt-[47.5px]'>
//         {menuItems.map((item, index) => (
//           <Link key={index} to={item.link} style={{ fontFamily: "Nunito" }} className="flex items-center p-4 hover:bg-blue-800">
//             {item.icon}
//             <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   );
// };
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/Logo';
import DashboardIcon from '../../assets/DashboardIcon';
import EventManagementIcons from '../../assets/EventManagementIcons';
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
import { TeamManagementIcon } from '../../assets/TeamManagementIcon';
import { CreatAgencyIcons } from '../../assets/MediatorAvailablitiyIcons';
import TaskManagementIcon from '../../assets/TaskManagementIcon';
import { NotificationIcon } from '../../assets/NotificationIcon';
import ExitToAppIcon from '../../assets/ExitToAppIcon';
import SettingsIcon from '../../assets/SettingsIcon';
import UserManagementIcon from '../../assets/UserManagementIcon';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem('user_group');
    sessionStorage.removeItem('access_token');

    // Optionally, navigate to the login page after logout
    navigate('/');
  };
  const userGroup = sessionStorage.getItem('user_group');
  // Menu items with associated handlers
  const menuItems = [
    {
      icon: <DashboardIcon className="w-6 h-6" />,
      label: 'Dashboard',
      link: '/dashboard',
      action: () => navigate('/dashboard')  // Navigate directly to Dashboard
    },
    ...(userGroup === 'super_user' || userGroup === 'agency_manager' || userGroup === 'npo_manager'
      ? [
    {
      icon: <UserManagementIcon className="w-6 h-6" />, // Add the User Management icon here
      label: 'User Management',
      link: '/user-management', // The link for User Management page
      action: () => navigate('/users-management')  // Navigate directly to User Management page
    }]:[]),
    // {
    //   icon: <EventManagementIcons className="w-6 h-6" />,
    //   label: 'Event Management',
    //   link: '/event-management',
    //   action: () => navigate('/event-management')  // Navigate directly to Event Management
    // },
    
    ...(userGroup === 'super_user' || userGroup === 'agency_manager'
      ? [
          {
            icon: <AgenciesManagementIcon className="w-6 h-6" />,
            label: 'Agencies',
            link: '/agencies',
            action: () => navigate('/agencies') // Navigate directly to Agencies
          }
        ]
      : []),
      ...(userGroup === 'super_user' || userGroup === 'agency_manager' || userGroup === 'npo_manager'
        ? [
        {
          icon: <AgenciesManagementIcon className="w-6 h-6" />,
          label: 'Npos',
          link: '/npo',
          action: () => navigate('/npos')  // Navigate directly to Agencies
        }
      ]
      : [])
    ,
      
    {
      icon: <TeamManagementIcon className="w-6 h-6" />,
      label: 'Teams',
      link: '/team',
      action: () => navigate('/team-details')  // Navigate directly to Agencies
    },
    ...(userGroup === 'mediator'
      ? [
    {
      icon: <EventManagementIcons className="w-6 h-6" />,
      label: 'Slots',
      link: '/create-slots',
      action: () => navigate('/slots-data')  // Navigate directly to Event Management
    }
  ]
  : []),
    // {
    //   icon: <CreatAgencyIcons className="w-6 h-6" />,
    //   label: 'Create Agency',
    //   link: '/create-agency',
    //   action: () => navigate('/create-agency')  // Navigate directly to Create Agency
    // },
    // {
    //   icon: <TaskManagementIcon className="w-6 h-6" />,
    //   label: 'Task Management',
    //   link: '/task-management',
    //   action: () => navigate('/task-management')  // Navigate directly to Task Management
    // },
    // {
    //   icon: <NotificationIcon className="w-6 h-6" />,
    //   label: 'Notifications',
    //   link: '/notifications', // Example link for Notifications
    //   action: () => navigate('/notifications')  // Navigate directly to Notifications
    // },
    // {
    //   icon: <SettingsIcon className="w-6 h-6" />,
    //   label: 'Settings',
    //   link: '/settings', // Example link for Settings
    //   action: () => navigate('/settings')  // Navigate directly to Settings
    // },
    {
      icon: <ExitToAppIcon className="w-6 h-6" />,
      label: 'Logout',
      link: '#',
      action: handleLogout  // Call logout function when clicked
    },
  ];

  return (
    <aside className={`absolute z-[9999] bg-[var(--darkBlue)] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} min-h-screen`}>
      {/* Sidebar Header */}
      <div className="mt-[63.5px] p-4 flex items-center justify-between">
        <h2 className={`text-[14px] font-bold font-[Lexend Mega] ${isOpen ? 'block' : 'hidden'}`}>
          <span className="mr-2">
            <Logo />
          </span>
          LinguoPontis
        </h2>
        <button
          onClick={toggleSidebar}
          className={`text-white bg-[#0077B6] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-6' : 'translate-x-12'} rounded-[16px]`}
        >
          {isOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-[47.5px]">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={item.action}  // Call the action associated with the menu item
              className="flex items-center p-4 w-full hover:bg-blue-800"
            >
              {item.icon}
              <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
            </button>
          </div>
        ))}
      </nav>
    </aside>
  );
};
