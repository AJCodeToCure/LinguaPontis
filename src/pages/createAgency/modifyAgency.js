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

function ModifyAgency() {
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
        company_name: '',
        company_type: 'agency',
        manager: selectedUserId,
        agency: 6,
        email: '',
        address: '',
        country: '',
        date_begin: '',
        city: '',
        postal_code: '',
        date_ending: '',
        phone: '',
        iban: '',
        bank: '',
        payment_frequency: '',
        vat_num: '',
        fiscal_code: '',
        contact: '',
        event_rate: '',
        main_idioma: '',
    });
    const [members, setMembers] = useState([]);

    const fetchAgency = async () => {
        try {
            const response = await axios.get(`${API}/api/get_agencies/?agency_id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const agencyData = response.data.find((agency) => Number(agency.id) === Number(id));

            // console.log('All Data', JSON.stringify(response.data, null, 2));
            console.log('Data' + agencyData);



            // console.log('Company Name' + agencyData.company_name);

            setAgencyData({
                company_name: agencyData.company_name || '',
                company_type: agencyData.company_type || '',
                created_at: agencyData.created_at || '',
                updated_at: agencyData.updated_at || '',
                created_by_group: agencyData.created_by_group || '',
                address: agencyData.address || '',
                country: agencyData.country || '',
                city: agencyData.city || '',
                postal_code: agencyData.postal_code || '',
                date_begin: agencyData.date_begin || '',
                date_ending: agencyData.date_ending || '',
                email: agencyData.email || '',
                phone: agencyData.phone || '',
                iban: agencyData.iban || '',
                bank: agencyData.bank || '',
                payment_frequency: agencyData.payment_frequency || '',
                vat_num: agencyData.vat_num || '',
                fiscal_code: agencyData.fiscal_code || '',
                contact: agencyData.contact || '',
                event_rate: agencyData.event_rate || '',
                main_idioma: agencyData.main_idioma || '',
                created_by: agencyData.created_by || '',
                manager: agencyData.manager || '',
            });
        } catch (error) {
            console.error('Error fetching agency:', error.response ? error.response.data : error.message);
        }
    };

    // Call the fetchAgency function when the component mounts or when the `id` changes
    useEffect(() => {
        fetchAgency();
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
    const updateAgency = async () => {
        try {
            const response = await axios.put(
                `${API}/api/get_agencies/${id}/`,
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
                title: "Agency Updated Sucessfully!",
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
        updateAgency();
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, so add 1
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Map members to options for the user dropdown
    const userOptions = members.map((member) => ({
        label: member.username, // Display the username
        value: member.user_id, // Use user_id as the value
    }));

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
                <Navbar/>
                <h1 className="text-2xl mt-10 font-bold">Update Agency</h1>

                <div className="grid mt-16 w-full lg:grid-cols-12 gap-x-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
                        <InputField
                            label="Company Name"
                            placeholder="Enter company name"
                            name="company_name"
                            value={agencyData.company_name}
                            onChange={handleChange}
                            disabled
                        />
                        <InputField
                            label="Selected NPO/Agency"
                            placeholder="Enter company name"
                            name="company_type"
                            value={agencyData.company_type}
                            onChange={handleChange}
                            disabled
                        />
                        <InputField label="Email" placeholder="Enter email" type="email" name="email" value={agencyData.email} onChange={(e) => handleChange(e, 'email')} />
                        <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={agencyData.phone} onChange={(e) => handleChange(e, 'phone')} />
                        <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={agencyData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
                        <InputField label="Address" placeholder="Enter address" name="address" value={agencyData.address} onChange={(e) => handleChange(e, 'address')} />
                        <InputField label="City" placeholder="Enter city" name="city" value={agencyData.city} onChange={(e) => handleChange(e, 'city')} />
                        <DropdownSelect
                            label="Select Country"        // Label for the dropdown
                            options={countryOptions}       // The country options passed to the dropdown
                            value={selectedCountry || agencyData.country}        // The selected country value from state
                            onChange={handleCountrySelect} // Handler to update state on country change
                            name="country"                 // Name of the field for form submission
                        />
                        <InputField label="IBAN" placeholder="Enter IBAN" name="iban" value={agencyData.iban} onChange={(e) => handleChange(e, 'iban')} />
                        <InputField label="VAT Number" placeholder="Enter VAT number" name="vat_num" value={agencyData.vat_num} onChange={(e) => handleChange(e, 'vat_num')} />
                        <InputField
                            label="BANK NAME"
                            placeholder="Enter Bank Name"
                            name="bank"  // The name of the field
                            value={agencyData.bank}  // Bind value to agencyData.bank
                            onChange={(e) => handleChange(e, 'bank')}  // Update state when the value changes
                        />
                        {/* <DropdownSelect label="Select Bank Name" options={['Bank 1', 'Bank 2']} value={agencyData.bank_name} onChange={handleChange} name="bank_name" /> */}
                        <InputField label="Fiscal Code" placeholder="Enter fiscal code" name="fiscal_code" value={agencyData.fiscal_code} onChange={(e) => handleChange(e, 'fiscal_code')} />
                        <InputField label="Payment Frequency" placeholder="Enter payment frequency" name="payment_frequency" value={agencyData.payment_frequency} onChange={(e) => handleChange(e, 'payment_frequency')} />
                        {/* <DropdownSelect label="Date Begin" options={['Option 1', 'Option 2']} value={agencyData.date_begin} onChange={handleChange} name="date_begin" /> */}
                        {/* <InputField
                            label="Date Begin"
                            placeholder="Select date"
                            name="date_begin"
                            value={agencyData.date_begin}
                            onChange={(e) => handleChange(e, 'date_begin')}
                            type="date" // Setting the type as 'date' to show a date picker
                        /> */}
                        {/* <DropdownSelect label="Date Ending" options={['Option 1', 'Option 2']} value={agencyData.date_end} onChange={handleChange} name="date_end" /> */}
                        {/* <DropdownSelect label="Select Main Idioma" options={['Language 1', 'Language 2']} value={agencyData.main_idioma} onChange={handleChange} name="idioma" />
               */}
                        <DropdownSelect
                            label="Select Idioma"        // Label for the dropdown
                            options={languageOptions}       // The country options passed to the dropdown
                            value={selectedLanguage || agencyData.main_idioma}        // The selected country value from state
                            onChange={handleLanguageSelect} // Handler to update state on country change
                            name="idioma"                 // Name of the field for form submission
                        />
                        <InputField label="Event Rate" placeholder="Enter Event Rate" name="event_rate" value={agencyData.event_rate} onChange={(e) => handleChange(e, 'event_rate')} />


                        <InputField
                            label="Date Begin"
                            placeholder="Select date"
                            name="date_begin"
                            value={formatDate(agencyData.date_begin)}
                            onChange={(e) => handleChange(e, 'date_begin')}
                            type="date" // Setting the type as 'date' to show a date picker
                        />
                        <InputField
                            label="Date Ending"
                            placeholder="Select date"
                            name="date_ending"
                            value={formatDate(agencyData.date_ending)}
                            onChange={(e) => handleChange(e, 'date_ending')}
                            type="date" // Setting the type as 'date' to show a date picker
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

export default ModifyAgency