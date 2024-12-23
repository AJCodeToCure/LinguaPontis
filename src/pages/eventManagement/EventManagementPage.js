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
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';


const Modal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Revoke Event</h2>
        <p className="text-center text-gray-600 mb-6">Are you sure you want to revoke this ?</p>
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
            Revoke
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

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Pagination items per page
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/api/event/?team_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setEvents(response.data);
      setFilteredEvents(response.data);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const filterEventsByDate = (events, dateType) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let filtered = events;

    if (dateType === 'past') {
      filtered = events.filter(event => new Date(event.date_begin) < startOfMonth);
    } else if (dateType === 'this') {
      filtered = events.filter(event => new Date(event.date_begin) >= startOfMonth && new Date(event.date_begin) <= endOfMonth);
    } else if (dateType === 'next') {
      filtered = events.filter(event => new Date(event.date_begin) > endOfMonth);
    }

    return filtered;
  };

  // Apply Date Filter
  const handleDateFilter = (type) => {
    setDateFilter(type);
    const filtered = filterEventsByDate(events, type);
    setFilteredEvents(filtered); // Update filtered events
    setCurrentPage(1); // Reset to page 1 when date filter is changed
  };

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

  const filterBySearch = (events) => {
    return events.filter(event => {
      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  const getFilteredEvents = () => {
    let filtered = filterBySearch(filteredEvents);
    return filtered;
  };

  // Paginate the filtered events
  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = getFilteredEvents().slice(indexOfFirstEvent, indexOfLastEvent);

  const isAllSelected = selectedEvents.length === eventData.length;

  const toggleAllSelection = () => {
    setSelectedEvents(isAllSelected ? [] : eventData.map(event => event.id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (

    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="w-full pl-20 flex-1 flex flex-col p- overflow-auto">
        <Navbar />

        <div className="w-full flex flex-col items-center mt-10 mb-10">

          <div className="flex justify-between w-1/2 max-sm:w-full text-gray-500">
            <button
              className="focus:outline-none font-[Mada] text-[16px]"
              onClick={() => handleDateFilter('past')}
            >
              Past Months
            </button>
            <button
              className="focus:outline-none font-[Mada] text-[16px]"
              onClick={() => handleDateFilter('this')}
            >
              This Month
            </button>
            <button
              className="focus:outline-none font-[Mada] text-[16px]"
              onClick={() => handleDateFilter('next')}
            >
              Next Months
            </button>
          </div>

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
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Contact</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]">Status</th>
                  <th className="py-2 px-3 text-left text-[12px] font-[Montserrat] text-[var(--blueColor)]"></th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((event) => (
                  <tr key={event.id} className="border-b">
                    <td onClick={() => navigate(`/specific-event/${event.id}`)} className="py-2 px-3 cursor-pointer font-bold font-inter text-[14px] text-[var(--lightTextGray)]">{event.name || 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.address || event.city || event.country || 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_begin ? new Date(event.date_begin).toLocaleString() : 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.date_ending ? new Date(event.date_ending).toLocaleString() : 'N/A'}</td>
                    <td className="py-2 px-3 text-[14px] text-[var(--lightTextGray)]">{event.phone || 'N/A'}</td>
                    <td className="py-2 px-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${event.event_status === "confirm"
                          ? "bg-green-200 font-bold text-green-900"
                          : event.event_status === "revoke"
                            ? "bg-red-200 font-bold text-red-900"
                            : "font-bold bg-[#F2F4F7] text-[#364254]"
                          }`}
                      >
                        {event.event_status === "confirm"
                          ? "Confirmed"
                          : event.event_status === "revoke"
                            ? "Revoked"
                            : "Pending"}
                      </span>
                    </td>

                    <td className="flex items-center py-2 px-3">
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
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </button>
                      <Modal isOpen={isModalOpen} onClose={closeModal} onDelete={() => handleDelete(event.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm font-[Poppins] text-gray-600">
              Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, getFilteredEvents().length)} of{' '}
              {getFilteredEvents().length} entries
            </p>
            <div className="flex">
              <button
                className="px-3 py-1 rounded-l-md border bg-white text-gray-600 hover:bg-gray-100"
                onClick={() => paginate(Math.max(currentPage - 1, 1))}
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(Math.ceil(getFilteredEvents().length / itemsPerPage)).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => paginate(num + 1)}
                  className={`px-3 ml-2 mr-2 rounded-[8px] py-1 border ${currentPage === num + 1 ? 'bg-[var(--darkBlue)] text-white' : 'bg-white text-gray-600'} hover:bg-blue-100`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded-r-md border bg-white text-gray-600 hover:bg-gray-100"
                onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(getFilteredEvents().length / itemsPerPage)))}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagementPage;


