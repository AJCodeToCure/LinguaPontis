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
import TeamDetailslist from '../pages/teamDetails/TeamDetailsList';
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
import CreateTeam from '../pages/createTeam/CreateTeam';
import ModifyTeam from '../pages/teamDetails/ModifyTeam';
import CreateEvent from '../pages/eventManagement/CreateEvent';
import ModifyEvent from '../pages/eventManagement/ModifyEvent';
import CreateSlots from '../pages/Slots/CreateSlots';
import SlotsData from '../pages/Slots/SlotsData';
import ModifySlot from '../pages/Slots/ModifySlot';
import SignUp from '../pages/signUp/SignUp';
import SpecificEvent from '../pages/eventManagement/SpecificEvent';
import UpdateTimeRequest from '../pages/eventManagement/UpdateTimeRequest';
import UpdateRequests from '../pages/eventManagement/UpdateRequests';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardAgency />} />
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/users-management" element={<UserManagement />} />
        <Route path="/agency-management" element={<AgencyManagement />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/npos" element={<Npos />} />
        <Route path="/modify-agency/:id" element={<ModifyAgency />} />
        <Route path="/modify-npo/:id" element={<ModifyNpo />} />
        <Route path="/agency-npos/:id" element={<AgencyNpos />} />
        <Route path="/create-team" element={<CreateTeam />} />
        <Route path="/modify-team/:id" element={<ModifyTeam />} />
        <Route path="/modify-event/:id" element={<ModifyEvent />} />
        <Route path="/modify-slot/:id" element={<ModifySlot />} />
        <Route path="/specific-event/:id" element={<SpecificEvent />} />


        <Route path="/agency-user" element={<AgencyUser />} />
        <Route path="/update-requests" element={<UpdateRequests />} />
        <Route path="/update-time-request/:id" element={<UpdateTimeRequest />} />
        <Route path="/slots-data" element={<SlotsData />} />
        <Route path="/create-slots" element={<CreateSlots />} />
        <Route path="/create-event/:id" element={<CreateEvent />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/event-management/:id" element={<EventManagementPage />} />
        <Route path="/user-management" element={<agenciesManagement />} />
        <Route path="/beneficiary-management" element={<BeneficiaryManagement />} />
        <Route path="/create-agency" element={<CreateAgency />} />
        <Route path="/create-npo" element={<CreateNpo />} />
        <Route path="/create-npo/:id" element={<CreateNpo />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/task-details" element={<TaskDetails />} />
        <Route path="/team-details/:id" element={<TeamDetails />} />
        <Route path="/team-details" element={<TeamDetailslist />} />
        <Route path="/team-user-management" element={<TeamUserManagement />} />
        <Route path="/accounting-management" element={<AccountingManagement />} />
        <Route path="/task-manager" element={<TaskManager />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
