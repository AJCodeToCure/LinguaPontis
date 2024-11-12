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

const EventManagementPage = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventData, setEventData] = useState([]);

  // Fetch events data from the API when the component mounts
  useEffect(() => {
    fetchEvents().then((data) => {
      console.log("Fetched events data:", data); // Log the fetched data

      setEventData(
        data.map((event) => ({
          id: event.id,
          summary: event.summary,
          location: event.location,
          description: event.description,
          start: formatTime(event.start),
          end: formatTime(event.end),
          attendees: event.attendees.length, // Count attendees
          is_confirmed: event.is_confirmed,
        }))
      );
    });
  }, []);

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
    <div className="container mx-auto">
      <span className='w-1/2'>
        <TopNavBar />
      </span>

      <div className="container mt-12 mx-auto p-4">
        <div className="w-full flex flex-col items-center mb-10">
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
        
        <div className='border rounded-lg'>
          <div className="mb-1 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-[Nunito]">Event Details</h1>
            <div className="flex space-x-2">
              <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
                <span className='mr-[8px]'><TrashIcon /></span>
                Delete
              </button>
              <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
                <span className='mr-[8px]'><FilterIcon /></span>
                Filters
              </button>

              <Link to="/beneficiary-management">
                <Button className='ml-[16px]'>
                  <span className='mr-[8px]'> <PlusIcon /></span> Add New
                </Button>
              </Link>              

            </div>
          </div>
          <div className="w-full max-sm:w-full border-b-2 border-gray-200 mb-4"></div>
      
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
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Summary</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Location</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Start Time</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">End Time</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Attendees</th>
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
                    <td className="py-2 px-3 font-inter text-[14px] text-[var(--lightTextGray)]">{event.summary}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.location}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.start}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.end}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.attendees}</td>
                    <td className="py-2 px-3">
                      <span className={`flex px-2 py-1 rounded-full text-xs ${event.is_confirmed ? 'bg-green-200 font-bold text-green-900' : ' font-bold bg-[#F2F4F7] text-[#364254]'}`}>
                        <span className='mr-2 mt-[5px] pl-1'>{event.is_confirmed ? <GreenCircleIcon /> : <GrayCircleIcon />}</span>  {event.is_confirmed ? 'Confirmed' : 'Pending'}
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
  );
};

export default EventManagementPage;


