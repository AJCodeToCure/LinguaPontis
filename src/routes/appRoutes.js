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
import UserManagement from '../pages/userManagement/UserManagement';
import CreateUser from '../pages/createUser/CreateUser';
import Npos from '../pages/npos/Npos';
import CreateNpo from '../pages/createNpo/CreateNpo';
import ModifyAgency from '../pages/createAgency/modifyAgency';
import ModifyNpo from '../pages/createNpo/ModifyNps';
import UpdateUser from '../pages/agencyUser/UpdateUser';
import AgencyNpos from '../pages/npos/AgencyNpos';
import ChangePassword from '../pages/agencyUser/ChangePassword';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardAgency />} />
        <Route path="/" element={<Login />} />
        <Route path="/users-management" element={<UserManagement />} />
        <Route path="/agency-management" element={<AgencyManagement />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/npos" element={<Npos />} />
        <Route path="/modify-agency/:id" element={<ModifyAgency />} />
        <Route path="/modify-npo/:id" element={<ModifyNpo />} />
        <Route path="/agency-npos/:id" element={<AgencyNpos />} />

        <Route path="/agency-user" element={<AgencyUser />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/event-management" element={<EventManagementPage />} />
        <Route path="/user-management" element={<agenciesManagement />} />
        <Route path="/beneficiary-management" element={<BeneficiaryManagement />} />
        <Route path="/create-agency" element={<CreateAgency />} />
        <Route path="/create-npo" element={<CreateNpo />} />
        <Route path="/create-user" element={<CreateUser />} />
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
