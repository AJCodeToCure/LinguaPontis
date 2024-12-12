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
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_Base } from '../../components/api/config';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/navBar/NavBar';


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

const EventManagementPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const API = API_Base;
  const token = sessionStorage.getItem('access_token');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/api/event/?team_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error getting team:', error);

      // Extract and show error message from the response
      const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
      alert(errorMessage);
    }
  }
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      const response = await axios.delete(`${API}/api/event/${eventId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      closeModal();
      navigate('/agencies')
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  // Fetch events data from the API when the component mounts
  // useEffect(() => {
  //   fetchEvents().then((data) => {
  //     console.log("Fetched events data:", data); // Log the fetched data

  //     setEventData(
  //       data.map((event) => ({
  //         id: event.id,
  //         summary: event.summary,
  //         location: event.location,
  //         description: event.description,
  //         start: formatTime(event.start),
  //         end: formatTime(event.end),
  //         attendees: event.attendees.length, // Count attendees
  //         is_confirmed: event.is_confirmed,
  //       }))
  //     );
  //   });
  // }, []);

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

    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full pl-20 flex-1 flex flex-col p- overflow-auto">
        <Navbar />

        <div className="w-full flex flex-col items-center mt-10 mb-10">

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

        <div className='border rounded-lg px-3'>
          <div className="mb-1 p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-[Nunito]">Event Details</h1>
            <div className="flex space-x-2">
              <button onClick={() => navigate(`/create-event/${id}`)} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Event</button>
              {/* <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
                <span className='mr-[8px]'><TrashIcon /></span>
                Delete
              </button>
              <button className="px-3 py-2 font-semibold text-[var(--smallText)] flex items-center">
                <span className='mr-[8px]'><FilterIcon /></span>
                Filters
              </button> */}

              {/* <Link to="/beneficiary-management">
                <Button className='ml-[16px]'>
                  <span className='mr-[8px]'> <PlusIcon /></span> Add New
                </Button>
              </Link>               */}

            </div>
          </div>
          <div className="w-full max-sm:w-full border-b-2 border-gray-200 mb-4"></div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className='bg-[#EAECF0]'>
                <tr className="">
                  {/* <th className="py-2 px-3 text-left">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleAllSelection}
                      className="form-checkbox"
                    />
                  </th> */}
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Name</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Location</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Start Time</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">End Time</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Attendees</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Status</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]"></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b">
                    {/* <td className="py-2 px-3">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => toggleEventSelection(event.id)}
                        className="form-checkbox"
                      />
                    </td> */}
                    <td onClick={() => navigate(`/specific-event/${event.id}`)} className="py-2 px-3 cursor-pointer font-bold font-inter text-[14px] text-[var(--lightTextGray)]">{event.name || 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.address || event.city || event.country || 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_begin ? new Date(event.date_begin).toLocaleString() : 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_ending ? new Date(event.date_ending).toLocaleString() : 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">
                      {event.mediators && event.mediators.length > 0
                        ? event.mediators.map((mediator) => (
                          <div key={mediator.id}>
                            {mediator.mediator_username} ({mediator.mediator_email})
                          </div>
                        ))
                        : 'No Mediators'}
                    </td>
                    <td className="py-2 px-3">
                      <span className={`flex px-2 py-1 rounded-full text-xs ${event.is_confirmed ? 'bg-green-200 font-bold text-green-900' : 'font-bold bg-[#F2F4F7] text-[#364254]'}`}>
                        <span className='mr-2 mt-[5px] pl-1'>
                          {event.is_confirmed ? <GreenCircleIcon /> : <GrayCircleIcon />}
                        </span>
                        {event.is_confirmed ? 'Confirmed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      {/* <button className="text-gray-500">
                        <ThreeDots />
                      </button> */}
                      <button onClick={() => navigate(`/modify-event/${event.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </button>
                      <button onClick={openModal} className='ml-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                      <Modal isOpen={isModalOpen} onClose={closeModal} onDelete={() => handleDelete(event.id)} />
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


