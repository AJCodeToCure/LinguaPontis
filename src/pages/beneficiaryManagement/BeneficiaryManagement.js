// ... other imports
import { React, useState } from 'react';
import { Sidebar } from '../../components/sideBar/SideBar';
import DropdownSelect from '../../components/dropDownSelect/DropDownSelect';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';

const BeneficiaryManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const options = [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        // Add more options as needed
    ];

    const handleSelect = (option) => {
        console.log('Selected option:', option);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="pl-20 flex-1 flex flex-col p-6">
                <div className="flex-1 mt-[10%] max-sm:mt-0 overflow-auto w-full max-w-10xl rounded-lg p-6">
                    <h1 className="text-2xl font-extrabold text-[var(--darkText)] font-[Nunito] text-left mb-[52px]">Meeting Object</h1>

                    {/* First row of dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {Array(4).fill(null).map((_, index) => (
                            <DropdownSelect
                                key={index}
                                options={options}
                                onSelect={handleSelect}
                                placeholder={`Dropdown ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* First row of input fields */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {Array(4).fill(null).map((_, index) => (
                            <InputField
                                key={index}
                                type="text"
                                placeholder={`Input ${index + 1}`}
                                value=""
                            />
                        ))}
                    </div>

                    {/* Meeting Objective Text Area */}
                    <h1 className="text-2xl font-extrabold text-[var(--darkText)] font-[Nunito] text-left mb-[52px] mt-[42px]">Meeting Objective</h1>

     {/* Second row of dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {Array(4).fill(null).map((_, index) => (
                            <DropdownSelect
                                key={index}
                                options={options}
                                onSelect={handleSelect}
                                placeholder={`Dropdown ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Buttons at the bottom */}
                <div className="flex flex-col sm:flex-row justify-center max-sm:pl-2 space-x-0 sm:space-x-4 mt-4">
                    <Button variant="primary" className="mb-2 sm:mb-0">Create Event</Button>
                    <Button variant="primary" className="mb-2 sm:mb-0">Modify Event</Button>
                    <Button variant="primary" className="mb-2 sm:mb-0">View Event</Button>
                    <Button variant="primary" className="mb-2 sm:mb-0">Revoke Event</Button>
                    <Button variant="primary" className="mb-2 sm:mb-0">Send Notification</Button> {/* Optional fifth button */}
                </div>
            </div>
        </div>
    );
}

export default BeneficiaryManagement;
