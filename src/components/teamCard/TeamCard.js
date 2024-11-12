import React from 'react';
import TaskList from '../taskList/TaskList';
import { AgenciesManagementIcon } from '../../assets/TeamManagementIcon';
import { EditIcon } from '../../assets/EditIcon';

const TeamCard = ({
    teamNumber,
    mediator,
    beneficiary,
    pastEvents,
    todayEvent,
    upcomingEvents,
    currentTime,
    currentTask,
    totalEvents,
    priority,
    priorityLabel,
    completed
}) => {
    return (
        <div className="max-w-[85%] mx-auto bg-[var(--cardTeamBg)] rounded-lg shadow-lg p-5">
            <div className='flex justify-center'>
                <span className='mr-4 mt-1'><AgenciesManagementIcon color={'#03045E'} /></span>
                <h2 className="text-2xl font-bold text-[var(--darkBlue)] font-[Nunito] mb-4 text-center">Team {teamNumber} Details</h2>
                <div className='mt-1 ml-4'><EditIcon /></div>
            </div>
            <TaskList taskGroupTitle={""} tasks={[
                {
                    taskTitle: `Team No. ${teamNumber}`,
                    time: currentTime,
                    taskNumber: currentTask,
                    totalEvents: totalEvents,
                    priority: priority,
                    priorityLabel: priorityLabel,
                    completed: completed,
                }]} />

            <div className='bg-white p-10 rounded-[24px]'>
                

                <div className="mb-4">
                   <p className="font-bold">Team Number: Team #{teamNumber}</p>
                    <p className="font-bold">Mediator: {mediator}</p>
                    <p className="font-bold">Beneficiary: {beneficiary}</p>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold">Past Events:</h3>
                    <ul className="list-disc list-inside">
                        {pastEvents.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold">Today's Events:</h3>
                    <ul className="list-disc list-inside">
                        <li>{todayEvent}</li>
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold">Upcoming Events:</h3>
                    <ul className="list-disc list-inside">
                        {upcomingEvents.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center">
                <button className=" mt-2 text-white rounded-full px-4 py-1"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 12L12 18L6 12" stroke="#222222" />
                    <path d="M18 6L12 12L6 6" stroke="#222222" />
                </svg>
                </button>
            </div>
        </div>
    );
};

export default TeamCard;
