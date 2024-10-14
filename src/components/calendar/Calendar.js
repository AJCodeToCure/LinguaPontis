import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const Calendar = ({ selectedDate, setSelectedDate, chosenDate, setChosenDate }) => {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const selectDate = (day) => {
    setChosenDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const isSelected = chosenDate && currentDate.toDateString() === chosenDate.toDateString();
      days.push(
        <div 
          key={i} 
          className={`p-2 text-center cursor-pointer ${
            isSelected ? 'bg-[var(--darkBlue)] text-white rounded-[16px]' : 'hover:bg-gray-200'
          }`}
          onClick={() => selectDate(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="mt-24 w-full max-w-md">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1"><ChevronLeft /></button>
          <h2 className="text-lg font-semibold">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={nextMonth} className="p-1"><ChevronRight /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
            <div key={day} className="font-bold text-xs">{day}</div>
          ))}
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
