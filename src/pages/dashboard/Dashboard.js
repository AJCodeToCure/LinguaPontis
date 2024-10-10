import React, { useState } from 'react';
import TaskList from '../../components/taskList/TaskList';
import TaskData from './taskData';
import { Sidebar } from '../../components/sideBar/SideBar';
import { Navbar } from '../../components/navBar/NavBar';

// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [taskData,setTaskData] = useState(TaskData);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold mb-4">Dashboard Content</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {taskData.map((group, index) => (
              <TaskList key={index} taskGroupTitle={group.groupTitle} tasks={group.tasks} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;