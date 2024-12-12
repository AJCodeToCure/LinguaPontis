import React from 'react';
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
import { CardTitleIcon } from '../../assets/CardTitleIcon';
import { CardOpenIcon } from '../../assets/CardOpenIcon';
import { NextIconCard } from '../../assets/NextIconCard';
import { UserIcon } from '../../assets/UserIcon';
import { IncompleteIcon } from '../../assets/IncompleteIcon';
import { CompleteIcon } from '../../assets/CompleteIcon';
import MessageIcon from "../../assets/MessageIcon";
import AttachIcon from "../../assets/AttachIcon";

const TaskCard = ({ taskTitle, time, taskNumber, totalEvents, priority, priorityLabel, completed }) => {
  return (
    <div className="bg-white shadow-md rounded-[25px] p-4 mb-4 flex flex-col">
      {/* Task Header */}
      <div className="flex justify-between text-center items-center mb-3">
        <h3 className="text-[16px] text-center  font-bold font-[Mada] text-blue-900">{taskTitle}</h3>
        <div className="text-blue-900">
            <NextIconCard />
        </div>
      </div>

      {/* Time and Icon */}
      <div className="flex items-center mb-2 justify-between">
        <div className='flex'>
       <UserIcon />
        <span className="ml-2 text-[10px] flex justify-between text-[var(--darkBlue) font-semibold">{time} </span> 
        </div>
        {completed === true && <CompleteIcon />}
        {completed === false && <IncompleteIcon />}
      </div>

      {/* Task and Event Info */}
    <div>
        <div className='flex justify-between'>
            <div className='flex'>
     <MessageIcon />
     <AttachIcon />
     </div>

    
     <div className="text-[12px] text-[var(--darkBlue)] mb-2">
        <p className='text-[12px]  text-[var(--darkBlue)] font-[Mada]'>Today's Task: {taskNumber}</p>
        <p className='font-[Mada] text-[var(--darkBlue)]'>Total Events: {totalEvents}</p>
      </div>
      
      <div className={` text-xs font-semibold px-2 py-1 h-full rounded ${priority === 'High' ? 'bg-red-100 text-red-600' : priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
          {priorityLabel}

        </div>
     </div>
    
      </div>

      {/* Priority Label */}
      <div className="flex justify-between items-center">
    
      </div>
    </div>
  );
};

const TaskList = ({ taskGroupTitle, tasks }) => {
  // Limit the tasks to the first three
  const displayedTasks = tasks.slice(0, 3);

  return (
    <div className=" rounded-lg">
      {/* <h1 className="text-xl font-bold font-[Nunito] text-[var(--darkBlue)] mb-4 flex"><span className='mr-2'><CardTitleIcon /></span>
       {taskGroupTitle}
     <span className='ml-2'>  <CardOpenIcon /> </span>
        </h1> */}
      <div>
        {displayedTasks.map((task, index) => (
          <TaskCard
            key={index}
            taskTitle={task.taskTitle}
            time={task.time}
            taskNumber={task.taskNumber}
            totalEvents={task.totalEvents}
            priority={task.priority}
            priorityLabel={task.priorityLabel}
            completed={task.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList