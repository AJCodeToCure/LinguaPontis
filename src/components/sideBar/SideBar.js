// Navbar Component
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Logo from '../../assets/Logo';
import DashboardIcon from '../../assets/DashboardIcon';
import EventManagementIcons from '../../assets/EventManagementIcons';
import { TeamManagementIcon } from '../../assets/TeamManagementIcon';
import { MediatorAvailablitiyIcons } from '../../assets/MediatorAvailablitiyIcons';
import TaskManagementIcon from '../../assets/TaskManagementIcon';
import { NotificationIcon } from '../../assets/NotificationIcon';
import SettingsIcon from '../../assets/SettingsIcon';

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: <DashboardIcon className="w-6 h-6" />, label: 'Dashboard', link: '/' },
    { icon: <EventManagementIcons className="w-6 h-6" />, label: 'Event Management', link: '/event-management' },
    { icon: <TeamManagementIcon className="w-6 h-6" />, label: 'Team Management', link: '/user-management' },
    { icon: <MediatorAvailablitiyIcons className="w-6 h-6" />, label: 'Mediator Availability', link: '/mediator-availability' },
    { icon: <TaskManagementIcon className="w-6 h-6" />, label: 'Task Management', link: '/task-management' },
    { icon: <NotificationIcon className="w-6 h-6" />, label: 'Notifications', link: '#' }, // Add notification route if applicable
    { icon: <SettingsIcon className="w-6 h-6" />, label: 'Settings', link: '#' }, // Add settings route if applicable
  ];

  return (
    <aside className={`absolute z-[9999] bg-[var(--darkBlue)] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} min-h-screen`}>
      <div className="mt-[63.5px] p-4 flex items-center justify-between">
        <h2 className={`flex justify-center align-middle text-[14px] font-bold font-[Lexend Mega] ${isOpen ? 'block' : 'hidden'}`} style={{fontFamily:"Lexend Mega"}}>
          <span className='mr-2 justify-center mt-0'><Logo /></span>  LinguoPontis
        </h2>
        <button onClick={toggleSidebar} className={`text-white bg-[#0077B6] translate-y-10 ${isOpen ? "translate-x-6 delay-0.5" : "translate-x-12 delay-0.5"} rounded-[16px]`}>
          {isOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
        </button>
      </div>
      <nav className='mt-[47.5px]'>
        {menuItems.map((item, index) => (
          <Link key={index} to={item.link} style={{fontFamily:"Nunito"}} className="flex items-center p-4 hover:bg-blue-800">
            {item.icon}
            <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
