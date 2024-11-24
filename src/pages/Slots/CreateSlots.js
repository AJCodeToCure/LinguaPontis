import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronDown } from 'lucide-react';
import Calendar from '../../components/calendar/Calendar';
import { createAgency } from '../../components/api/Agency';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { useLocation } from 'react-router-dom';

const DropdownSelect = ({ label, options, value, onChange, name }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <select
                className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                value={value}
                onChange={(e) => onChange(e, name)}  // Pass name to onChange handler
            >
                {/* Placeholder option */}
                <option value="">Select</option>

                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
    </div>
);



const CreateSlots = () => {
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const API = API_Base;
    const [slotData, setSlotData] = useState({
        starting: '',
        ending: '',
    });

    // Send POST request to create the agency
    const createSlot = async () => {
        try {
            const response = await axios.post(
                `${API}/api/mediator_slot/`,
                slotData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/slots-data')
            alert('Slot Created Sucessfully')
        } catch (error) {
            console.error('Error posting agency data:', error.response ? error.response.data : error.message);
            alert('* Fields cannot be empty')
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSlotData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        createSlot();
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <h1 className="text-2xl mt-10 font-bold mb-2">Create Slot</h1>
                <h1 className="mb-6">* Mandatory Fields</h1>

                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <InputField
                            label="Date Begin *"
                            placeholder="Select date"
                            name="starting"
                            value={slotData.starting}
                            onChange={(e) => handleChange(e, 'starting')}
                            type="datetime-local"
                        />
                        <InputField
                            label="Date End *"
                            placeholder="Select date"
                            name="ending"
                            value={slotData.ending}
                            onChange={(e) => handleChange(e, 'ending')}
                            type="datetime-local"
                        />
                        <div className="flex justify-center gap-4 pb-4">
                            <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">
                                Create
                            </button>
                        </div>
                    </div>

                    {/* <div className="lg:col-span-4 lg:flex-row justify-between items-start lg:items-center">
            <DropdownSelect label="Event Rate" options={['Rate 1', 'Rate 2']} value={agencyData.event_rate} onChange={handleChange} name="event_rate" />
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              chosenDate={chosenDate}
              setChosenDate={setChosenDate}
            />
          </div> */}
                </div>

                {/* <div className="mt-auto">
          <div className="flex justify-center gap-4 pb-4">
            <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Details</button>
          </div>
        </div> */}
            </div>
        </div>
    );
};

export default CreateSlots;
