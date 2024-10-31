import { React, useState } from "react";
import { Sidebar } from "../../components/sideBar/SideBar";
import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";
import { createEvent } from "../../components/api/createEvent";

const BeneficiaryManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [formData, setFormData] = useState({
    summary: "",
    location: "",
    description: "",
    start: "",
    end: "",
    attendees: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const attendeesArray = formData.attendees
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    const requestData = {
      summary: formData.summary,
      location: formData.location,
      description: formData.description,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
      attendees: attendeesArray,
      phone: formData.phone,
    };

    console.log("Request Body:", requestData);
    
    try {
      const result = await createEvent(requestData);
      console.log("Event created successfully:", result);
      alert("Event created successfully");
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="pl-20 flex-1 flex flex-col p-6">
        <div className="flex-1 mt-[10%] max-sm:mt-0 overflow-auto w-full max-w-10xl rounded-lg p-6">
          <h1 className="text-2xl font-extrabold text-[var(--darkText)] font-[Nunito] text-left mb-[52px]">
            Meeting Object
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <InputField
              name="summary"
              type="text"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleInputChange}
            />
            <InputField
              name="location"
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <InputField
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <InputField
              name="start"
              type="date"
              placeholder="Start Date and Time"
              value={formData.start}
              onChange={handleInputChange}
            />
            <InputField
              name="end"
              type="date"
              placeholder="End Date and Time"
              value={formData.end}
              onChange={handleInputChange}
            />
            <InputField
              name="attendees"
              type="text"
              placeholder="Attendees"
              value={formData.attendees}
              onChange={handleInputChange}
            />
            <InputField
              name="phone"
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center max-sm:pl-2 space-x-0 sm:space-x-4 mt-4">
            <Button variant="primary" onClick={handleSubmit} className="mb-2 sm:mb-0">
              Create Event
            </Button>
            {/* Other buttons can remain as placeholders for now */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryManagement;