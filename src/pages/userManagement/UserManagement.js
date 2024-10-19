import { useState } from 'react';
import React from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { MagnifyingIcons } from "../../assets/MagnifyingIcons";

const agenciesData = [
  { id: 1, type: 'NPO', name: 'Microsoft', phone: '(225) 555-0118', email: 'jane@microsoft.com', country: 'United States', status: 'Online' },
  { id: 2, type: 'Agency', name: 'Yahoo', phone: '(205) 555-0100', email: 'floyd@yahoo.com', country: 'Kiribati', status: 'Onsite' },
  { id: 3, type: 'NPO', name: 'Adobe', phone: '(302) 555-0107', email: 'ronald@adobe.com', country: 'Germany', status: 'Onsite' },
  { id: 4, type: 'Agency', name: 'Tesla', phone: '(252) 555-0126', email: 'marvin@tesla.com', country: 'Iran', status: 'Online' },
  { id: 5, type: 'NPO', name: 'Google', phone: '(629) 555-0129', email: 'jerome@google.com', country: 'Réunion', status: 'Online' },
  { id: 6, type: 'Agency', name: 'Microsoft', phone: '(406) 555-0120', email: 'kathryn@microsoft.com', country: 'Curaçao', status: 'Online' },
  { id: 7, type: 'Agency', name: 'Yahoo', phone: '(208) 555-0112', email: 'jacob@yahoo.com', country: 'Brazil', status: 'Online' },
  { id: 8, type: 'NPO', name: 'Facebook', phone: '(704) 555-0127', email: 'kristin@facebook.com', country: 'Åland Islands', status: 'Onsite' },
];

const UserManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Display 5 items per page
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Toggle individual agency selection
  const toggleAgencySelection = (id) => {
    setSelectedAgencies((prev) =>
      prev.includes(id) ? prev.filter((agencyId) => agencyId !== id) : [...prev, id]
    );
  };

  // Handle Select All functionality
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const currentItems = currentAgencies.map((agency) => agency.id);
      setSelectedAgencies([...new Set([...selectedAgencies, ...currentItems])]);
    } else {
      const currentItems = currentAgencies.map((agency) => agency.id);
      setSelectedAgencies(selectedAgencies.filter((id) => !currentItems.includes(id)));
    }
  };

  // Pagination Logic
  const indexOfLastAgency = currentPage * itemsPerPage;
  const indexOfFirstAgency = indexOfLastAgency - itemsPerPage;
  const currentAgencies = agenciesData.slice(indexOfFirstAgency, indexOfLastAgency);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-20 flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
          <div className="container mt-20 max-sm:w-full w-10/12 mx-auto">
            <div className="flex justify-between items-center mb-6 max-sm:flex-col">
              <h1 className="text-2xl font-semibold font-[Poppins]">All Agencies Data</h1>
              <div className="flex items-center max-sm:flex-col">

                <div className="relative mr-4 max-sm:mt-5 max-sm:mb-5">
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-[#F9FBFF] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <MagnifyingIcons />
                  </span>
                </div>
                <div className="flex bg-[#F9FBFF] items-center">
                  <span className="mr-2 text-sm text-gray-600">Short by:</span>
                  <select className="bg-[#F9FBFF] rounded-md py-1 font-[Poppins] font-bold px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-light text-[var(--lightTextGray)] font-[Poppins] uppercase tracking-wider">
                    <th className="p-3">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-orange-600" // Change the color to orange
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3">NPO/Agency</th>
                    <th className="p-3">Company Name</th>
                    <th className="p-3">Phone Number</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Country</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAgencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-gray-50 font-[Poppins] font-medium">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-orange-600" // Change the color to orange
                          checked={selectedAgencies.includes(agency.id)}
                          onChange={() => toggleAgencySelection(agency.id)}
                        />
                      </td>
                      <td className="p-3">{agency.type}</td>
                      <td className="p-3">{agency.name}</td>
                      <td className="p-3">{agency.phone}</td>
                      <td className="p-3">{agency.email}</td>
                      <td className="p-3">{agency.country}</td>
                      <td className="p-3">
                        <span
                          className={`px-4 py-1 rounded-[8px] text-xs ${
                            agency.status === 'Online'
                              ? 'bg-green-200 text-green-800 border border-green-800'
                              : 'bg-red-200 text-red-800 border border-red-900'
                          }`}
                        >
                          {agency.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm font-[Poppins] text-gray-600">
                Showing {indexOfFirstAgency + 1} to {Math.min(indexOfLastAgency, agenciesData.length)} of {agenciesData.length} entries
              </p>
              <div className="flex">
                <button
                  className="px-3 py-1 rounded-l-md border bg-white text-gray-600 hover:bg-gray-100"
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                >
                  <ChevronLeft size={20} />
                </button>
                {/* Pagination Buttons */}
                {[...Array(Math.ceil(agenciesData.length / itemsPerPage)).keys()].map((num) => (
                  <button
                    key={num + 1}
                    onClick={() => paginate(num + 1)}
                    className={`px-3 ml-2 mr-2 rounded-[8px] py-1 border ${
                      currentPage === num + 1 ? 'bg-[var(--darkBlue)] text-white' : 'bg-white text-gray-600'
                    } hover:bg-blue-100`}
                  >
                    {num + 1}
                  </button>
                ))}
                <button
                  className="px-3 py-1 rounded-r-md border bg-white text-gray-600 hover:bg-gray-100"
                  onClick={() => paginate(Math.min(currentPage + 1, Math.ceil(agenciesData.length / itemsPerPage)))}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex justify-center gap-4 pb-4 max-sm:flex-col">
              <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Details</button>
              <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Modify Details</button>
              <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">View Details</button>
              <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Revoke NPO</button>
              <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">View Reports</button>
            </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
