import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Sidebar } from '../../components/sideBar/SideBar';
import { MagnifyingIcons } from "../../assets/MagnifyingIcons";


const TeamUserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const totalPages = 40;
  const eventsPerPage = 9;

  const events = Array(40).fill().map((_, index) => ({
    id: index + 1,
    ongoing: index === 0 ? 'Schedule Meeting with Mediator' : 'Table Cell',
    today: index === 0 ? 'Event #02 (Today 11:00 AM)' : 'Table Cell',
    past: index === 0
      ? ['Event #01: August 20th, 2024 (Initial Discussion)', 'Event #02: September 5th, 2024 (Follow-Up)']
      : ['Table Cell'],
    status: index === 0 ? 'Recorded Properly' : 'Table Cell'
  }));

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (eventId) => {
    setSelectedRows(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="pl-24 flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 max-sm:p-0 max-sm:pt-2 max-sm:pl-24">

          <div className="container mx-auto p-4 bg-gray-100 min-h-screen">

            {/* Top User Name, Search Bar , Sortby */}
            <div className="flex max-sm:flex-col justify-between items-center mb-6">
              <div className="flex items-center max-sm:mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="#7E869E" fill-opacity="0.25" />
                  <circle cx="12" cy="10" r="4" fill="#222222" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.221 18.2462C18.2791 18.3426 18.2614 18.466 18.1796 18.5432C16.5675 20.0662 14.3928 21 12.0001 21C9.60734 21 7.4327 20.0663 5.82063 18.5433C5.73883 18.466 5.72107 18.3427 5.77924 18.2463C6.94343 16.318 9.29221 15 12.0001 15C14.708 15 17.0568 16.3179 18.221 18.2462Z" fill="#222222" />
                </svg>


                <h1 className="text-xl font-bold ml-2  font-[Nunito]">Alice Smith</h1>
              </div>
            
              <div className='flex gap-x-5 max-sm:flex-col'>
              <div className="relative ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-[#F9FBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-[20px] transform -translate-y-1/2 text-gray-400">
                    <MagnifyingIcons />
                  </span>
                </div>

                <div className="flex bg-[#F9FBFF] items-center p-2 max-sm:mt-5 rounded-[12px]">
                  <span className="mr-2 text-sm text-gray-600">Sort by:</span>
                  <select className="bg-[#F9FBFF] rounded-md py-1 font-[Poppins] font-bold px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 max-sm:p-6">

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className=" font-[Nunito]">
                      <th className="p-2 w-10"></th>
                      <th className="border-b border-r p-2 text-left">Ongoing Events</th>
                      <th className="border-b border-r p-2 text-left">Today Events</th>
                      <th className="border-b border-r p-2 text-left">Past Events</th>
                      <th className="border-b p-2 text-left">Remarks/Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvents.map((event, index) => (
                      <tr key={event.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            id={`checkbox-${event.id}`}
                            checked={selectedRows.includes(event.id)}
                            onChange={() => handleCheckboxChange(event.id)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                        </td>
                        <td className="border-r p-2">{event.ongoing}</td>
                        <td className="border-r p-2">{event.today}</td>
                        <td className="border-r p-2">
                          {event.past.map((pastEvent, idx) => (
                            <div key={idx}>{pastEvent}</div>
                          ))}
                        </td>
                        <td className="p-2">{event.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col items-end">
                <div className="flex space-x-1 mb-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, index) => (
                    <button
                      key={index}
                      className={`px-2 py-0 rounded ${currentPage === index + 1 ? 'bg-[var(--darkBlue)] text-white' : 'bg-gray-200'}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {totalPages > 5 && <span className="px-3 py-1">...</span>}
                  {totalPages > 5 && (
                    <button
                      className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-[var(--darkBlue)] text-white' : 'bg-gray-200'}`}
                      onClick={() => paginate(totalPages)}
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex space-x-2 mt-2 max-sm:flex-col justify-center text-center align-center max-sm:gap-y-5">
                  <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded">Create Details</button>
                  <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded">Modify Details</button>
                  <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded">View Details</button>
                  <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded">Revoke NPO</button>
                  <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded">View Reports</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
};

export default TeamUserManagement