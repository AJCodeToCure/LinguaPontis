// /src/routes/AppRoutes.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgencyManagement from '../pages/agencyManagement/AgencyManagement';
import AgencyUser from '../pages/agencyUser/AgencyUser';
import EventManagementPage from '../pages/eventManagement/EventManagementPage';
import Login from '../pages/login/Login';
import DashboardAgency from '../pages/dashboard/DashboardAgency';
import BeneficiaryManagement from '../pages/beneficiaryManagement/BeneficiaryManagement';
import CreateAgency from '../pages/createAgency/createAgency';
import TaskManagement from '../pages/taskManagement/TaskManagement';
import TaskDetails from '../pages/taskDetails/TaskDetails';
import TeamDetails from '../pages/teamDetails/TeamDetails';
import TeamUserManagement from '../pages/teamUserManagement/TeamUserManagement';
import AccountingManagement from '../pages/accountingManagement/AccountingManagement';
import TaskManager from '../pages/taskManager/TaskManager';
import Agencies from '../pages/agencies/Agencies';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardAgency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/agency-management" element={<AgencyManagement />} />
        <Route path="/agencies" element={<Agencies/>} />

        <Route path="/agency-user" element={<AgencyUser />} />
        <Route path="/event-management" element={<EventManagementPage />} />
        <Route path="/user-management" element={<agenciesManagement />} />
        <Route path="/beneficiary-management" element={<BeneficiaryManagement />} />
        <Route path="/create-agency" element={<CreateAgency />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/task-details" element={<TaskDetails />} />
        <Route path="/team-details" element={<TeamDetails />} />
        <Route path="/team-user-management" element={<TeamUserManagement />} />
        <Route path="/accounting-management" element={<AccountingManagement />} />
        <Route path="/task-manager" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
