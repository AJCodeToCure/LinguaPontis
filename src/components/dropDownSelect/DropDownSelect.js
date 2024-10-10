import React, { useState, useRef, useEffect } from 'react';

// Example SVG Icon Component (you can replace this with your actual SVG icon)
const ChevronDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.58934 7.74408C5.2639 7.41864 4.73626 7.41864 4.41083 7.74408C4.08539 8.06951 4.08539 8.59715 4.41083 8.92259L9.41083 13.9226C9.73626 14.248 10.2639 14.248 10.5893 13.9226L15.5893 8.92259C15.9148 8.59715 15.9148 8.06951 15.5893 7.74408C15.2639 7.41864 14.7363 7.41864 14.4108 7.74408L10.0001 12.1548L5.58934 7.74408Z" fill="#313144"/>
    </svg>
    
);

const DropdownSelect = ({ options, onSelect, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="block w-full p-2 border border-[var(--borderColor)] text-[var(--darkText)] font-semibold rounded-[12px] bg-white text-left flex items-center justify-between "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDownIcon /> {/* SVG icon on the right */}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelect;
