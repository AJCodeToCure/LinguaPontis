import React, { useState } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Calendar from '../../components/calendar/Calendar'; // Import the new calendar component

const DropdownSelect = ({ label, options }) => (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none">
          {options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
  

  
const AgencyManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
        <h1 className="text-2xl mt-10 font-bold mb-6">Agency Details</h1>

        <div className="grid mt-16 w-full lg:grid-cols-12 gap-x-6">
          {/* First column section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
            <InputField label="Company Name" placeholder="Enter company name" />
            <InputField label="Surname" placeholder="Enter surname" />
            <DropdownSelect label="Select NPO/Agency" options={['NPO', 'Agency']} />
            <InputField label="Email" placeholder="Enter email" type="email" />
            <InputField label="Contact Number" placeholder="Enter contact number" type="tel" />
            <DropdownSelect label="Postal Code" options={['Option 1', 'Option 2']} />
            <InputField label="Address" placeholder="Enter address" />
            <InputField label="City" placeholder="Enter city" />
            <DropdownSelect label="Select Country" options={['Country 1', 'Country 2']} />
            <InputField label="IBAN" placeholder="Enter IBAN" />
            <InputField label="VAT Number" placeholder="Enter VAT number" />
            <DropdownSelect label="Select Bank Name" options={['Bank 1', 'Bank 2']} />
            <InputField label="Fiscal Code" placeholder="Enter fiscal code" />
            <InputField label="Payment Frequency" placeholder="Enter payment frequency" />
            <InputField label="Bank Name" placeholder="Enter bank name" />
            <DropdownSelect label="Date Begin" options={['Option 1', 'Option 2']} />
            <DropdownSelect label="Date Ending" options={['Option 1', 'Option 2']} />
            <DropdownSelect label="Select Main Idioma" options={['Language 1', 'Language 2']} />
          </div>

          {/* Second column section with the new Calendar */}
          <div className="lg:col-span-4 lg:flex-row justify-between items-start lg:items-center">
            <div className="w-full max-w-xs mb-4 lg:mb-0">
              <DropdownSelect label="Event Rate" options={['Rate 1', 'Rate 2']} />
            </div>
            <Calendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              chosenDate={chosenDate} 
              setChosenDate={setChosenDate} 
            />
            <p className="text-sm font-[Poppins] mt-5 ml-8 text-gray-600 mb-2">Payment</p>
          </div>
        </div>

        {/* Button section */}
        <div className="mt-auto">
          <div className="flex justify-center gap-4 pb-4">
            <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Details</button>
            <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Modify Details</button>
            <button className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyManagement;
