import React, { useState } from 'react';
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

const eventData = [
  { id: 1, mediatorName: 'Mediator', beneficiaryName: 'Beneficiary', idioma: 'Urdu', originCountry: 'Pakistan', fullAddress: 'Islamabad', meetingObject: 'Object Any', meetingObjective: 'Regular text column', timeDate: '15:30-17:30 28-09-2024', status: 'Online' },
  { id: 2, mediatorName: 'Mediator', beneficiaryName: 'Beneficiary', idioma: 'Urdu', originCountry: 'Pakistan', fullAddress: 'Islamabad', meetingObject: 'Object Any', meetingObjective: 'Regular text column', timeDate: '15:30-17:30 28-09-2024', status: 'OnSite' },

  // Add more mock data here...

];

const TaskManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [selectedEvents, setSelectedEvents] = useState([]);

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
    // <div className="container  mx-auto">

    <div className="flex h-screen bg-gray-100">
    <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* <Navbar /> */}
      {/* <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6"> */}
      {/* <span className='w-1/2'>
        <TopNavBar />
      </span> */}

      <div className="container mt-12 mx-auto p-4">

        <div className="w-full flex flex-col items-center mb-10">
          <div className="flex justify-between w-96 max-sm:w-full text-gray-500">
            {/* Buttons */}
            <button className="focus:outline-none font-[Mada] text-[16px]">Ongoing Task</button>
            <button className="focus:outline-none font-[Mada] text-[16px]">Managing Tasks</button>
            <button className="focus:outline-none font-[Mada] text-[16px]">Past Tasks</button>
            {/* <button className="focus:outline-none font-[Mada] text-[16px]">Past Week</button>
            <button className="focus:outline-none font-[Mada] text-[16px]">Month</button>
            <button className="focus:outline-none font-[Mada] text-[16px]">Past Month</button> */}
          </div>
          {/* Horizontal line */}
          <div className="w-96 max-sm:w-full border-b-2 border-gray-200 mt-2"></div>
        </div>
        
<div className="border rounded-lg">
  <div className="mb-1 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
    <h1 className="text-2xl font-bold font-[Nunito] mb-4 sm:mb-0">
      Beneficiary Task Details
    </h1>
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-center">
      <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
        <span className="mr-[8px]">
          <TrashIcon />
        </span>
        Delete
      </button>
      <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
        <span className="mr-[8px]">
          <FilterIcon />
        </span>
        Filters
      </button>
      <Button className="ml-[16px] flex items-center px-4 py-2">
        <span className="mr-[8px]">
          <PlusIcon />
        </span>
        Add New
      </Button>
    </div>
  </div>

  <div className="w-full border-b-2 border-gray-200 mb-4"></div>
      
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className='bg-[#EAECF0]'>
              <tr className="">
                <th className="py-2 px-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleAllSelection}
                    className="form-checkbox"
                  />
                </th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Mediator Name</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Beneficiary Name</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Idioma</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Origin Country</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Full Address</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Meeting Object</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Meeting Objective</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Time & Date</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Status</th>
                <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]"></th>
              </tr>
            </thead>
            <tbody>
              {eventData.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="py-2 px-3">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => toggleEventSelection(event.id)}
                      className="form-checkbox"
                    />
                  </td>
                  <td className="py-2 px-3 font-bold">{event.mediatorName}</td>
                  <td className="py-2 px-3 font-inter text-[14px] text-[var(--lightTextGray)]">{event.beneficiaryName}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.idioma}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.originCountry}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.fullAddress}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.meetingObject}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.meetingObjective}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.timeDate}</td>
                  <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">
                    <span className={`flex px-2 py-1 rounded-full text-xs ${event.status === 'Online' ? 'bg-green-200 font-bold text-green-900' : ' font-bold bg-[#F2F4F7] text-[#364254]'}`}>
                      <span className='mr-2 mt-[5px] pl-1'>{event.status === 'Online' ? <GreenCircleIcon /> : <GrayCircleIcon />}</span>  {event.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <button className="text-gray-500">
                      <ThreeDots />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      </div>
      
    </div>
    

    </div>
    
  );
};

export default TaskManagement;