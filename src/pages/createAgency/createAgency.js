import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronDown } from 'lucide-react';
import Calendar from '../../components/calendar/Calendar';
import { createAgency } from '../../components/api/Agency';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_Base } from '../../components/api/config';

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


const CreateAgency = () => {
  // Get token from session storage
  const token = sessionStorage.getItem('access_token');
  const navigate = useNavigate();

  // State variables
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [agencyData, setAgencyData] = useState({
    company_name: '',
    company_type: 'agency',
    manager: selectedUserId,
    agency: '',
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
  const API = API_Base;

  // Fetch available members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${API}/api/available_members/?type=agency`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setMembers(response.data);  // Store the members in the state
      } catch (error) {
        console.error('Error fetching members:', error.response ? error.response.data : error.message);
      }
    };

    fetchMembers();
  }, [token]); // Only run once on mount

  // Handle user selection from dropdown
  const handleUserSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);
    setAgencyData((prevData) => ({ ...prevData, manager: selectedId }));
  };

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

  // Handle changes to the agency type (NPO or Agency)
  const handleAgencyTypeChange = (e) => {
    const selectedType = e.target.value;
    setAgencyData((prevData) => ({ ...prevData, company_type: selectedType }));
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
  const createAgency = async () => {
    try {
      const response = await axios.post(
        `${API}/api/npo_agency/`,
        agencyData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Agency created:', response.data);
      navigate('/agencies')
      alert('Agency Created Sucessfully')
    } catch (error) {
      console.error('Error posting agency data:', error.response ? error.response.data : error.message);
      alert('* Fields cannot be empty')
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    createAgency();
  };

  // Map members to options for the user dropdown
  const userOptions = members.map((member) => ({
    label: member.username, // Display the username
    value: member.user_id, // Use user_id as the value
  }));


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(null);
  // const [agencyData, setAgencyData] = useState({
  //   company_name: '',
  //   type: 'NPO',
  //   email: '',
  //   phone: '',
  //   postal_code: '',
  //   address: '',
  //   city: '',
  //   country: ' ',
  //   iban: '',
  //   vat_number: '',
  //   fiscal_code: '',
  //   bank_name: ' ',
  //   payment_frequency: '',
  //   date_begin: '',
  //   date_end: '',
  //   idioma: ' ',
  //   event_rate: ' ',
  // });


  // const handleChange = (e, name) => {
  //   const { value } = e.target;
  //   setAgencyData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  // };

  const handleCreateAgency = async () => {
    const filteredData = Object.fromEntries(
      Object.entries(agencyData).filter(([_, value]) => value !== '')
    );

    try {
      const response = await createAgency(filteredData);
      alert("Agency created successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error creating agency:", error);
      alert("Error creating agency", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-28 flex-1 flex flex-col p-6 overflow-auto">
        <h1 className="text-2xl mt-10 font-bold mb-2">Create Agency/NPO</h1>
        <h1 className="mb-6">* Mandatory Fields</h1>

        <div className="grid mt-2 w-full lg:grid-cols-12 gap-x-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
            <InputField
              label="Company Name *"
              placeholder="Enter company name"
              name="company_name"
              value={agencyData.company_name}
              onChange={handleChange}
            />

            <DropdownSelect
              label="Select Manager *"
              options={userOptions}
              value={selectedUserId}
              onChange={handleUserSelect}
              name="user_id"
            />

            <DropdownSelect
              label="Select NPO/Agency *"
              options={[
                { label: 'Agency', value: 'agency' },
                { label: 'NPO', value: 'npo' },
              ]}
              value={agencyData.company_type}
              onChange={handleAgencyTypeChange}
              name="company_type"
            />

            <InputField label="Email" placeholder="Enter email" type="email" name="email" value={agencyData.email} onChange={(e) => handleChange(e, 'email')} />
            <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={agencyData.phone} onChange={(e) => handleChange(e, 'phone')} />
            <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={agencyData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
            <InputField label="Address" placeholder="Enter address" name="address" value={agencyData.address} onChange={(e) => handleChange(e, 'address')} />
            <InputField label="City" placeholder="Enter city" name="city" value={agencyData.city} onChange={(e) => handleChange(e, 'city')} />
            <DropdownSelect
              label="Select Country"        // Label for the dropdown
              options={countryOptions}       // The country options passed to the dropdown
              value={selectedCountry}        // The selected country value from state
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
            <InputField label="Fiscal Code" placeholder="Enter fiscal code" name="fiscal_code" value={agencyData.fiscal_code} onChange={(e) => handleChange(e, 'fiscal_code')} />
            <InputField label="Payment Frequency" placeholder="Enter payment frequency" name="payment_frequency" value={agencyData.payment_frequency} onChange={(e) => handleChange(e, 'payment_frequency')} />
            {/* <DropdownSelect label="Date Begin" options={['Option 1', 'Option 2']} value={agencyData.date_begin} onChange={handleChange} name="date_begin" />
            <DropdownSelect label="Date Ending" options={['Option 1', 'Option 2']} value={agencyData.date_end} onChange={handleChange} name="date_end" /> */}
            <InputField
              label="Date Begin"
              placeholder="Select date"
              name="date_begin"
              value={agencyData.date_begin}
              onChange={(e) => handleChange(e, 'date_begin')}
              type="date" // Setting the type as 'date' to show a date picker
            />
            <InputField
              label="Date Ending"
              placeholder="Select date"
              name="date_ending"
              value={agencyData.date_ending}
              onChange={(e) => handleChange(e, 'date_ending')}
              type="date" // Setting the type as 'date' to show a date picker
            />
            {/* <DropdownSelect label="Select Main Idioma" options={['Language 1', 'Language 2']} value={agencyData.idioma} onChange={handleChange} name="idioma" /> */}
            <DropdownSelect
              label="Select Idioma"        // Label for the dropdown
              options={languageOptions}       // The country options passed to the dropdown
              value={selectedLanguage}        // The selected country value from state
              onChange={handleLanguageSelect} // Handler to update state on country change
              name="idioma"                 // Name of the field for form submission
            />
            <div className="flex justify-center gap-4 pb-4">
              <button onClick={handleSubmit} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">
                Create Details
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

export default CreateAgency;
