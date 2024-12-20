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
import Swal from 'sweetalert2'

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



const MultiDropdownSelect = ({ label, options, value, onChange, name }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <select
                multiple // Enables multi-select
                className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                value={value}
                onChange={(e) => onChange(e, name)} // Passes the event and name
            >
                {/* Placeholder option */}
                <option disabled value="">
                    Select
                </option>

                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
);


// List of countries
const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];
const countryOptions = countries.map(country => ({
    value: country,
    label: country,
}));



const CreateTeam = () => {
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const Swal = require('sweetalert2')

    // State variables
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedCountry, setSelectedCountry] = useState("");
    const location = useLocation();
    const { npo_id } = location.state || {};

    const [teamMembers, setTeamMembers] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState("");
    const [eventMembers, setEventMembers] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState("");
    const [mediatorMembers, setMediatorMembers] = useState([]);
    const [beneficiaryMembers, setBeneficiaryMembers] = useState([]);
    const [selectedMediatorId, setSelectedMediatorId] = useState([]);
    const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState([]);
    const API = API_Base;

    const [teamData, setTeamData] = useState({
        manager: '',
        npo: npo_id,
        event_manager: '',
        mediators: [],
        beneficiaries: [],
        name: '',
        surname: '',
        address: '',
        date_begin: '',
        country: '',
        city: '',
        postal_code: '',
        date_ending: '',
        email: '',
        phone: '',
        task: '',
    });


    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${API}/api/available_members/?type=team`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setTeamMembers(response.data);
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
            alert(errorMessage);
        }
    };

    const fetchEvent = async () => {
        try {
            const response = await axios.get(`${API}/api/available_members/?type=event`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setEventMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error.response ? error.response.data : error.message);
        }
    };
    const fetchMediator = async () => {
        try {
            const response = await axios.get(`${API}/api/available_members/?type=mediator`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMediatorMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error.response ? error.response.data : error.message);
        }
    };

    const fetchBeneficiary = async () => {
        try {
            const response = await axios.get(`${API}/api/available_members/?type=beneficiary`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setBeneficiaryMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchTeam();
        fetchEvent();
        fetchMediator();
        fetchBeneficiary();
    }, []);

    const handleTeamSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedTeamId(selectedId);
        setTeamData((prevData) => ({ ...prevData, manager: selectedId }));
    };
    const handleEventSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedEventId(selectedId);
        setTeamData((prevData) => ({ ...prevData, event_manager: selectedId }));
    };
    // const handleMediatorSelect = (e) => {
    //     const selectedId = e.target.value;
    //     setSelectedMediatorId(selectedId);
    //     setTeamData((prevData) => ({ ...prevData, mediators: [selectedId] }));
    // };



    const handleMediatorSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value); // Extract selected values
        setSelectedMediatorId(selectedOptions); // Update state with multiple IDs
        setTeamData((prevData) => ({ ...prevData, mediators: selectedOptions })); // Update your team data
    };

    const handleBeneficiarySelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value); // Extract selected values
        setSelectedBeneficiaryId(selectedOptions); // Update state with multiple IDs
        setTeamData((prevData) => ({ ...prevData, beneficiaries: selectedOptions })); // Update your team data
    };



    const teamOptions = teamMembers.map((member) => ({
        label: member.username,
        value: member.user_id,
    }));
    const eventOptions = eventMembers.map((member) => ({
        label: member.username,
        value: member.user_id,
    }));
    const mediatorOptions = mediatorMembers.map((member) => ({
        label: member.username,
        value: member.user_id,
    }));
    const beneficiaryOptions = beneficiaryMembers.map((member) => ({
        label: member.username,
        value: member.user_id,
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Send POST request to create the agency
    const createTeam = async () => {
        try {
            const response = await axios.post(
                `${API}/api/team/`,
                teamData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/team-details')
            Swal.fire({
                title: "Team Created Sucessfully!",
                icon: "success"
            });
        } catch (error) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data.detail || error.message;
            if (statusCode === 401) {
                // Unauthorized - show error icon
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                });
            } else if (statusCode === 406 || statusCode === 404 || statusCode === 400) {
                Swal.fire({
                    icon: "question",
                    title: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: errorMessage,
                });
            }
        }
    };

    const handleSubmit = () => {
        createTeam();
    };

    const handleCountrySelect = (e) => {
        const { value } = e.target;  // Get the selected country's name from the event
        setSelectedCountry(value);
        setTeamData((prevData) => ({
            ...prevData,
            country: value, // Update the country in the state
        }));
    };
    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <h1 className="text-2xl mt-10 font-bold mb-2">Create Team</h1>
                <h1 className="mb-6">* Mandatory Fields</h1>

                <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <InputField
                            label="Team Name *"
                            placeholder="Enter team name"
                            name="name"
                            value={teamData.name}
                            onChange={handleChange}
                        />
                        <DropdownSelect
                            label="Select Team *"
                            options={teamOptions}
                            value={selectedTeamId}
                            onChange={handleTeamSelect}
                            name="team"
                        />
                        <DropdownSelect
                            label="Select Task Manager *"
                            options={eventOptions}
                            value={selectedEventId}
                            onChange={handleEventSelect}
                            name="event"
                        />
                        <MultiDropdownSelect
                            label="Select Mediators *"
                            options={mediatorOptions}
                            value={selectedMediatorId}
                            onChange={handleMediatorSelect}
                            name="mediator"
                        />

                        <MultiDropdownSelect
                            label="Select Beneficiaries *"
                            options={beneficiaryOptions}
                            value={selectedBeneficiaryId}
                            onChange={handleBeneficiarySelect}
                            name="beneficiary"
                        />

                        <InputField label="surname" placeholder="Enter surname" type="surname" name="surname" value={teamData.surname} onChange={(e) => handleChange(e, 'surname')} />
                        <InputField label="Email" placeholder="Enter email" type="email" name="email" value={teamData.email} onChange={(e) => handleChange(e, 'email')} />
                        <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={teamData.phone} onChange={(e) => handleChange(e, 'phone')} />
                        <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={teamData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
                        <InputField label="Address" placeholder="Enter address" name="address" value={teamData.address} onChange={(e) => handleChange(e, 'address')} />
                        <InputField label="City" placeholder="Enter city" name="city" value={teamData.city} onChange={(e) => handleChange(e, 'city')} />
                        <InputField label="task" placeholder="Enter task" name="task" value={teamData.task} onChange={(e) => handleChange(e, 'task')} />
                        <DropdownSelect
                            label="Select Country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountrySelect}
                            name="country"
                        />
                        <InputField
                            label="Date Begin *"
                            placeholder="Select date"
                            name="date_begin"
                            value={teamData.date_begin}
                            onChange={(e) => handleChange(e, 'date_begin')}
                            type="date"
                        />
                        <InputField
                            label="Date Ending *"
                            placeholder="Select date"
                            name="date_ending"
                            value={teamData.date_ending}
                            onChange={(e) => handleChange(e, 'date_ending')}
                            type="date" // Setting the type as 'date' to show a date picker
                        />
                        <div className="flex justify-center gap-4 pb-4">
                            <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">
                                Create Team
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

export default CreateTeam;
