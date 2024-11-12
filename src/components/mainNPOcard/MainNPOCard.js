import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';

const MainNPOcard = ({ 
  date,
  npoNumber,
  totalTasks,
  lastUpdated,
  hoursConsumed,
  totalHours,
  teamMembers,
  priority,
  pendingEvents
}) => {
  const progressPercentage = (hoursConsumed / totalHours) * 100;
  const hoursLeft = totalHours - hoursConsumed;

  return (
    <div className="bg-sky-100 rounded-3xl p-6 max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">{date}</span>
        <ChevronRight className="text-blue-800" />
      </div>
 
      <div className="flex justify-center text-center items-center mb-4">
        <span className='mr-2'> <AgenciesManagementIcon color={"#03045E"}/> </span>
        <h2 className="text-center text-2xl font-[800] font-[Nunito] text-[var(--darkBlue)]">NPO {npoNumber}</h2>
      </div>
      
      <div className="text-gray-600 justify-center text-center mb-4">
        <p>Total Tasks: {totalTasks}</p>
        <p>Last Updated: {lastUpdated}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-bold font-[Nunito] text-[var(--darkBlue)]">Hours Consumed</span>
          <span className='text-[var(--darkBlue)] font-bold'>{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="bg-white rounded-full h-2 overflow-hidden">
          <div 
            className="bg-[var(--darkBlue)] h-full" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
        <div className="flex justify-between font-[Nunito] font-bold text-xs mt-1">
          <span>Total: {totalHours} hours</span>
          <span className="text-red-500 text-[7px] -translate-y-4 -translate-x-1">{hoursLeft} hours left</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex -space-x-2">
          {teamMembers.map((member, index) => (
            <img 
              key={index}
              src={member.avatar} 
              alt={`Team member ${index + 1}`}
              className="w-9 h-8 rounded-full border-2 border-white"
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-[#EDEDED] flex items-center justify-center text-[#FF942E] text-4xs font-bold">
            +
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-2 rounded-full text-xs font-semibold ${
            priority === 'High' ? 'bg-white text-red-800' : 
            priority === 'Medium' ? 'bg-white text-yellow-800' : 
            'bg-white text-green-800'
          }`}>
            {priority}
          </span>
          <span className="text-[var(--darkBlue)] bg-white px-2 py-1 md:py-2 md:px-4 rounded-[16px] font-[Nunito] text-xs md:text-sm font-bold whitespace-nowrap">
            {pendingEvents} Events Pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainNPOcard;
