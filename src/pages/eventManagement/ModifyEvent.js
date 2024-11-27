import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_Base } from '../../components/api/config';
import { Navbar } from '../../components/navBar/NavBar';

import Swal from 'sweetalert2'

const DropdownSelect = ({ label, options, value, onChange, name }) => (
    <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
            <select
                className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                value={value} // Value reflects the current state
                onChange={(e) => onChange(e, name)} // Pass name to onChange handler
            >
                {/* Placeholder option */}
                <option value="">Select</option>

                {/* Map through options and render each one */}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
const languages = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Azerbaijani",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chichewa",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Korean",
    "Kurdish (Kurmanji)",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lithuanian",
    "Luxembourgish",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Odia (Oriya)",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Romanian",
    "Russian",
    "Samoan",
    "Scots Gaelic",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Turkish",
    "Turkmen",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu"
];
const countryOptions = countries.map(country => ({
    value: country,  // Value is the country name
    label: country,  // Label is also the country name
}));
const languageOptions = countries.map(language => ({
    value: language,  // Value is the country name
    label: language,  // Label is also the country name
}));

function ModifyEvent() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
    const { id } = useParams();
    const API = API_Base;
    const Swal = require('sweetalert2')

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [agencyData, setAgencyData] = useState({
        name: '',
        surname: '',
        address: '',
        country: '',
        city: '',
        postal_code: '',
        email: '',
        phone: '',
        task: '',
        created_by: '',
        manager: '',
        npo: '',
        event_manager: '',
        date_begin: '',
        date_ending: '',
        mediators: [],
    });
    const [members, setMembers] = useState([]);

    const fetchTeam = async () => {
        try {
            const response = await axios.get(`${API}/api/event_specific/?event_id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            // const agencyData = response.data.find((agency) => Number(agency.id) === Number(id));
            // console.log('Data' + agencyData);
            const teamData = response.data[0];

            setAgencyData({
                name: teamData.name || '',
                surname: teamData.surname || '',
                address: teamData.address || '',
                country: teamData.country || '',
                city: teamData.city || '',
                postal_code: teamData.postal_code || '',
                email: teamData.email || '',
                phone: teamData.phone || '',
                task: teamData.task || '',
                created_by: teamData.created_by || '',
                manager: teamData.manager || '',
                npo: teamData.npo || '',
                event_manager: teamData.event_manager || '',
                date_begin: teamData.date_begin || '',
                date_ending: teamData.date_ending || '',
                mediators: teamData.mediators || [] // Ensure mediators are set as an array
            });
        } catch (error) {
            console.error('Error getting team:', error);

            // Extract and show error message from the response
            const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
            alert(errorMessage);
        }
    };

    // Call the fetchAgency function when the component mounts or when the `id` changes
    useEffect(() => {
        fetchTeam();
    }, [id]);

    const handleCountrySelect = (e) => {
        const { value } = e.target;  // Get the selected country's name from the event
        setSelectedCountry(value);
        setAgencyData((prevData) => ({
            ...prevData,
            country: value, // Update the country in the state
        }));
    };
    const handleLanguageSelect = (e) => {
        const { value } = e.target;  // Get the selected country's name from the event
        setSelectedLanguage(value);   // Update the state with the new country
        setAgencyData((prevData) => ({
            ...prevData,
            main_idioma: value, // Update the country in the state
        }));
    };


    // Handle input changes for company name
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgencyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Send POST request to create the agency
    const updateTeam = async () => {
        try {
            const response = await axios.put(
                `${API}/api/event/${id}/`,
                agencyData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/agencies')
            Swal.fire({
                title: "Event Updated Sucessfully!",
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

    // Handle form submit
    const handleSubmit = () => {
        updateTeam();
    };

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate); // Create a Date object from the ISO string

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0"); // Get hours in 24-hour format
        const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes

        return `${year}-${month}-${day}T${hours}:${minutes}`; // Format as 'YYYY-MM-DDTHH:MM'
    };

    // Map members to options for the user dropdown
    const userOptions = members.map((member) => ({
        label: member.username,
        value: member.user_id,
    }));

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar/>
                <h1 className="text-2xl mt-10 font-bold">Update Event</h1>

                <div className="grid mt-16 w-full lg:grid-cols-12 gap-x-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <InputField
                            label="Team Name *"
                            placeholder="Enter team name"
                            name="name"
                            value={agencyData.name}
                            onChange={handleChange}
                        />
                        {/* <DropdownSelect
                            label="Select Team Manager *"
                            options={teamOptions}
                            value={selectedTeamId}
                            onChange={handleTeamSelect}
                            name="team"
                        />
                        <DropdownSelect
                            label="Select Event Manager *"
                            options={eventOptions}
                            value={selectedEventId}
                            onChange={handleEventSelect}
                            name="event"
                        />
                        <DropdownSelect
                            label="Select Mediator Manager *"
                            options={mediatorOptions}
                            value={selectedMediatorId}
                            onChange={handleMediatorSelect}
                            name="mediator"
                        /> */}
                        <InputField label="surname" placeholder="Enter surname" type="surname" name="surname" value={agencyData.surname} onChange={(e) => handleChange(e, 'surname')} />
                        <InputField label="Email" placeholder="Enter email" type="email" name="email" value={agencyData.email} onChange={(e) => handleChange(e, 'email')} />
                        <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={agencyData.phone} onChange={(e) => handleChange(e, 'phone')} />
                        <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={agencyData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
                        <InputField label="Address" placeholder="Enter address" name="address" value={agencyData.address} onChange={(e) => handleChange(e, 'address')} />
                        <InputField label="City" placeholder="Enter city" name="city" value={agencyData.city} onChange={(e) => handleChange(e, 'city')} />
                        <InputField label="task" placeholder="Enter task" name="task" value={agencyData.task} onChange={(e) => handleChange(e, 'task')} />
                        <DropdownSelect
                            label="Select Country"
                            options={countryOptions}
                            value={selectedCountry}
                            onChange={handleCountrySelect}
                            name="country"
                        />
                        <InputField
                            label="Date Begin"
                            placeholder="Select date"
                            name="date_begin"
                            value={formatDateTime(agencyData.date_begin)}
                            onChange={(e) => handleChange(e, 'date_begin')}
                            type="datetime-local"
                        />
                        <InputField
                            label="Date End"
                            placeholder="Select date"
                            name="date_ending"
                            value={formatDateTime(agencyData.date_ending)}
                            onChange={(e) => handleChange(e, 'date_ending')}
                            type="datetime-local"
                        />
                        <div className="flex justify-center gap-4 pb-4">
                            <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">
                                Update
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
    )
}

export default ModifyEvent