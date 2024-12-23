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

function CreateEvent() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
    const { id } = useParams();
    const API = API_Base;
    const Swal = require('sweetalert2')

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedMediatorId, setSelectedMediatorId] = useState([]);
    const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState("");
    const [selectedManagerId, setSelectedManagerId] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [isToggled, setIsToggled] = useState(false);

    const [agencyData, setAgencyData] = useState({
        team: id,
        mediators: [],
        beneficires: [],
        other_managers: [],
        presence: isToggled,
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
    });
    const [members, setMembers] = useState([]);
    const [mems, setMems] = useState([]);
    const [slotsData, setSlotsData] = useState(null);
    const [bsData, setBsData] = useState(null);

    const handleManagerSelect = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedManagerId(selectedIds); // Update the selected manager IDs

        // Update the team data with the selected manager IDs
        setAgencyData((prevData) => ({
            ...prevData,
            other_managers: selectedIds.map((id) => ({
                id,
                is_confirm: false, // Initially, presence is false for all selected managers
            })),
        }));
    };

    // Handle the toggle change for each manager's presence
    const handleToggleChange = (managerId) => {
        // Toggle the presence for the specific manager
        setAgencyData((prevData) => ({
            ...prevData,
            other_managers: prevData.other_managers.map((manager) =>
                manager.id === managerId
                    ? { ...manager, is_confirm: !manager.is_confirm } // Toggle presence state
                    : manager
            ),
        }));
    };

    useEffect(() => {
        const fetchMediators = async () => {
            try {
                const response = await axios.get(`${API}/api/team/?team_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Team Members")
                console.log(response.data)
                setMembers(response.data);
            } catch (error) {
                console.error('Error getting team:', error);

                // Extract and show error message from the response
                const errorMessage = error.response?.data?.detail || 'Failed to getting the team.';
                alert(errorMessage);
            }
        };




        const fetchOtherTeamMembers = async () => {
            try {
                const response = await axios.get(`${API}/api/get_other_team_manager/?team_id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log("Team Members")
                console.log(response.data)
                setMems(response.data);
            } catch (error) {
                console.error('Error getting team:', error);

                // Extract and show error message from the response
                const errorMessage = error.response?.data?.detail || 'Failed to getting the other teams member.';
                alert(errorMessage);
            }
        };

        fetchMediators();
        fetchOtherTeamMembers();
    }, [token]);

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
    const createEvent = async () => {
        try {
            const response = await axios.post(
                `${API}/api/event/`,
                agencyData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate('/team-details')
            Swal.fire({
                title: "Event Created Sucessfully!",
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
        createEvent();
    };

    // Map members to options for the user dropdown
    const mediatorOptions = members.map((member) =>
        member.mediators.map((mediator) => ({
            label: mediator.mediator_username,  // Display the username
            value: mediator.mediator_user_id   // Use the mediator's user_id as the value
        }))
    ).flat();

    const beneficiaryOptions = members.map((member) =>
        member.beneficiaries.map((bene) => ({
            label: bene.beneficiary_username,  // Display the username
            value: bene.beneficiary_user_id   // Use the mediator's user_id as the value
        }))
    ).flat();

    const managerOptions = mems
        .map((member) => ({
            label: member.manager_name,  // Display the manager name
            value: member.manager_id,   // Use the manager's id as the value
        })); // Flatten the final array to a single array of manager options


    const handleMediatorSelect = async (e) => {
        const selectedId = Array.from(e.target.selectedOptions, (option) => option.value);
        console.log(selectedId);

        setSelectedMediatorId(selectedId);
        setAgencyData((prevData) => ({
            ...prevData,
            mediators: selectedId,
        }));
        try {
            const selectedIdsString = selectedId.join(',');
            const response = await axios.get(
                `${API}/api/mediator_available_slot/?mediator_id=${encodeURIComponent(selectedIdsString)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            // Assuming the response contains available slots
            setSlotsData(response.data); // Store the slots in state (or handle as needed)
            console.log('Slots Data:', response.data); // Check what data is returned
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleBeneficiarySelect = async (e) => {
        // const selectedId = e.target.value;
        const selectedId = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedBeneficiaryId(selectedId); // Update the selected mediator ID

        // Update the team data with the selected mediator ID
        setAgencyData((prevData) => ({
            ...prevData,
            beneficires: selectedId,
        }));
        try {
            const selectedIdsString = selectedId.join(',');
            const response = await axios.get(
                `${API}/api/get_beneficiary_function_location/?beneficiary_id=${encodeURIComponent(selectedIdsString)}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
            );
            // Assuming the response contains available slots
            setBsData(response.data); // Store the slots in state (or handle as needed)
            console.log('Beneficiaries Data:', response.data); // Check what data is returned
        } catch (error) {
            console.error('Error fetching beneficiary details:', error);
        }
    };

    // const handleManagerSelect = async (e) => {
    //     // const selectedId = e.target.value;
    //     const selectedId = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setSelectedManagerId(selectedId); // Update the selected mediator ID

    //     // Update the team data with the selected mediator ID
    //     setAgencyData((prevData) => ({
    //         ...prevData,
    //         other_managers: selectedId,
    //     }));
    // };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar />
                <h1 className="text-2xl mt-10 font-bold">Create Event</h1>
                <h1 className="mb-6">* Mandatory Fields</h1>
                <div className='flex sm:flex-col md:flex-row lg:flex-row'>
                    <div className="grid mt-16 w-full lg:grid-cols-10">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                            <InputField
                                label="Event Name *"
                                placeholder="Enter event name"
                                name="name"
                                value={agencyData.name}
                                onChange={handleChange}
                            />
                            <MultiDropdownSelect
                                label="Select Mediators *"
                                options={mediatorOptions}
                                value={selectedMediatorId}
                                onChange={handleMediatorSelect}
                                name="mediator"
                            />
                            <InputField label="surname" placeholder="Enter surname" type="surname" name="surname" value={agencyData.surname} onChange={(e) => handleChange(e, 'surname')} />
                            <InputField label="Email" placeholder="Enter email" type="email" name="email" value={agencyData.email} onChange={(e) => handleChange(e, 'email')} />
                            <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={agencyData.phone} onChange={(e) => handleChange(e, 'phone')} />
                            {/* <InputField label="Beneficiary *" placeholder="Enter beneficiary email" name="beneficiary" value={agencyData.beneficiary} onChange={(e) => handleChange(e, 'beneficiary')} /> */}
                            <MultiDropdownSelect
                                label="Beneficiary *"
                                options={beneficiaryOptions}
                                value={selectedBeneficiaryId}
                                onChange={handleBeneficiarySelect}
                                name="beneficiary"
                            />
                            <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={agencyData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
                            <MultiDropdownSelect
                                label="Other Team's Manager *"
                                options={managerOptions}
                                value={selectedManagerId}
                                onChange={handleManagerSelect}
                                name="beneficiary"
                            />
                            <div className='border-2 mt-6 p-2'>
                                {agencyData.other_managers.map((manager) => {
                                    const managerName = managerOptions.find(option => option.value === manager.id)?.label;

                                    return (
                                        <div>
                                            <div key={manager.id} className="flex items-center space-x-4">
                                                <span className='w-20'>{managerName}</span> {/* Display manager name */}

                                                <div className="flex items-center">
                                                    <label htmlFor={`toggle-${manager.id}`} className="mr-2 text-gray-700">Presence:</label>
                                                    <input
                                                        type="checkbox"
                                                        id={`toggle-${manager.id}`}
                                                        checked={manager.is_confirm || false}  // Check if the presence is confirmed
                                                        onChange={() => handleToggleChange(manager.id)}  // Handle toggle change
                                                        className="w-10 h-5 bg-gray-300 rounded-full cursor-pointer focus:outline-none transition duration-200 ease-in-out"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
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
                                label="Date Begin *"
                                placeholder="Select date"
                                name="date_begin"
                                value={agencyData.date_begin}
                                onChange={(e) => handleChange(e, 'date_begin')}
                                type="datetime-local"
                            />
                            <InputField
                                label="Date End *"
                                placeholder="Select date"
                                name="date_ending"
                                value={agencyData.date_ending}
                                onChange={(e) => handleChange(e, 'date_ending')}
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
                    <div className="overflow-x-auto py-10">
                        {slotsData && (
                            <div className="bg-[var(--cardTeamBg)] shadow-lg rounded-lg p-6">
                                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Available Time Slots</h3>
                                <table className="min-w-full bg-white table-auto">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Mediator</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Slot</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slotsData.map((slot) => (
                                            <tr
                                                key={slot.id}
                                                className="hover:bg-gray-50 border-b transition duration-300 ease-in-out"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-600">{slot.mediator_name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{slot.formatted_date}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{slot.time_range}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {bsData && (
                            <div className="bg-[var(--cardTeamBg)] shadow-lg rounded-lg p-6">
                                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Beneficiaries Data</h3>
                                <table className="min-w-full bg-white table-auto">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Username</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Location</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Functions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bsData.map((slot) => (
                                            <tr
                                                key={slot.id}
                                                className="hover:bg-gray-50 border-b transition duration-300 ease-in-out"
                                            >
                                                <td className="px-4 py-3 text-sm text-gray-600">{slot.username}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{slot.location}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 break-words whitespace-normal max-w-xs">{slot.functions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>




                    <div className="overflow-x-auto py-10">

                    </div>


                </div>
                {/* <div className="mt-auto">
            <div className="flex justify-center gap-4 pb-4">
              <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Details</button>
            </div>
          </div> */}
            </div>
        </div >
    )
}

export default CreateEvent