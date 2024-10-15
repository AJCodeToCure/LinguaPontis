import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AgencyUser from "./pages/agencyUser/AgencyUser";
import AgencyManagement from "./pages/agencyManagement/AgencyManagement";
import DashboardLayout from "./pages/dashboard/Dashboard";
import EventManagementPage from "./pages/eventManagement/EventManagementPage";
import Login from "./pages/login/Login";
import MediatorAvailability from "./pages/mediatorAvailability/MediatorAvailability";
import UserManagement from "./pages/userManagement/UserManagement";
import TeamDetails from "./pages/teamDetails/TeamDetails";
import TaskManagement from "./pages/taskManagement/TaskManagement";
import BeneficiaryManagement from "./pages/beneficiaryManagement/BeneficiaryManagement";
export default function App() {
  return (
  <div>
    {/* <DashboardLayout /> */}
    {/* <Login /> */}
    {/* <AgencyUser /> */}
    {/* <AgencyManagement/> */}
    {/* <EventManagementPage /> */}
    {/* <TeamDetails /> */}
     {/* <MediatorAvailability />  */}
    {/* <UserManagement /> */}

    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<DashboardLayout/>} />
        <Route path="/eventmn" element={<EventManagementPage/>} />
        <Route path="/mediatorav" element={<MediatorAvailability/>} />
        <Route path="/usermn" element={<UserManagement/>} />
        <Route path="/agencymn" element={<AgencyManagement/>} />
        <Route path="/teamdt" element={<TeamDetails/>} />
        <Route path="/agencyuser" element={<AgencyUser/>} />
        <Route path="/benefmn" element={<BeneficiaryManagement/>}/>
        <Route path="/taskmn" element={<TaskManagement/>}/>
        </Routes>
    </BrowserRouter>
  </div>
  )
}