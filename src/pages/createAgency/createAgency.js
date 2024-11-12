import React, { useState } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import InputField from '../../components/inputField/InputField';
import { ChevronDown } from 'lucide-react';
import Calendar from '../../components/calendar/Calendar';
import { createAgency } from '../../components/api/Agency';

const DropdownSelect = ({ label, options, value, onChange, name }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <select
        className="w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
        value={value}
        onChange={(e) => onChange(e, name)}  // Pass name to onChange handler
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  </div>
);


const CreateAgency = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chosenDate, setChosenDate] = useState(null);
  const [agencyData, setAgencyData] = useState({
    company_name: '',
    type: 'NPO',
    email: '',
    phone: '',
    postal_code: '',
    address: '',
    city: '',
    country: ' ',
    iban: '',
    vat_number: '',
    fiscal_code: '',
    bank_name: ' ',
    payment_frequency: '',
    date_begin: '',
    date_end: '',
    idioma: ' ',
    event_rate: ' ',
  });

  const handleChange = (e, name) => {
    const { value } = e.target;
    setAgencyData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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
        <h1 className="text-2xl mt-10 font-bold mb-6">Agency Details</h1>

        <div className="grid mt-16 w-full lg:grid-cols-12 gap-x-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-8 gap-x-6 gap-y-2">
            <InputField label="Company Name" placeholder="Enter company name" name="company_name" value={agencyData.company_name} onChange={(e) => handleChange(e, 'company_name')} />
            <DropdownSelect label="Select NPO/Agency" options={['NPO', 'Agency']} value={agencyData.type} onChange={handleChange} name="type" />
            <InputField label="Email" placeholder="Enter email" type="email" name="email" value={agencyData.email} onChange={(e) => handleChange(e, 'email')} />
            <InputField label="Contact Number" placeholder="Enter contact number" type="tel" name="phone" value={agencyData.phone} onChange={(e) => handleChange(e, 'phone')} />
            <InputField label="Postal Code" placeholder="Enter postal code" name="postal_code" value={agencyData.postal_code} onChange={(e) => handleChange(e, 'postal_code')} />
            <InputField label="Address" placeholder="Enter address" name="address" value={agencyData.address} onChange={(e) => handleChange(e, 'address')} />
            <InputField label="City" placeholder="Enter city" name="city" value={agencyData.city} onChange={(e) => handleChange(e, 'city')} />
            <DropdownSelect label="Select Country" options={['Country 1', 'Country 2']} value={agencyData.country} onChange={handleChange} name="country" />
            <InputField label="IBAN" placeholder="Enter IBAN" name="iban" value={agencyData.iban} onChange={(e) => handleChange(e, 'iban')} />
            <InputField label="VAT Number" placeholder="Enter VAT number" name="vat_number" value={agencyData.vat_number} onChange={(e) => handleChange(e, 'vat_number')} />
            <DropdownSelect label="Select Bank Name" options={['Bank 1', 'Bank 2']} value={agencyData.bank_name} onChange={handleChange} name="bank_name" />
            <InputField label="Fiscal Code" placeholder="Enter fiscal code" name="fiscal_code" value={agencyData.fiscal_code} onChange={(e) => handleChange(e, 'fiscal_code')} />
            <InputField label="Payment Frequency" placeholder="Enter payment frequency" name="payment_frequency" value={agencyData.payment_frequency} onChange={(e) => handleChange(e, 'payment_frequency')} />
            <DropdownSelect label="Date Begin" options={['Option 1', 'Option 2']} value={agencyData.date_begin} onChange={handleChange} name="date_begin" />
            <DropdownSelect label="Date Ending" options={['Option 1', 'Option 2']} value={agencyData.date_end} onChange={handleChange} name="date_end" />
            <DropdownSelect label="Select Main Idioma" options={['Language 1', 'Language 2']} value={agencyData.idioma} onChange={handleChange} name="idioma" />
          </div>

          <div className="lg:col-span-4 lg:flex-row justify-between items-start lg:items-center">
            <DropdownSelect label="Event Rate" options={['Rate 1', 'Rate 2']} value={agencyData.event_rate} onChange={handleChange} name="event_rate" />
            <Calendar 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              chosenDate={chosenDate} 
              setChosenDate={setChosenDate} 
            />
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-center gap-4 pb-4">
            <button onClick={handleCreateAgency} className="px-4 py-2 bg-[var(--darkBlue)] text-white rounded-md hover:bg-blue-800">Create Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAgency;