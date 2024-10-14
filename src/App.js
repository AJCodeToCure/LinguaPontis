import AgencyUser from "./pages/agencyUser/AgencyUser";
import AgencyManagement from "./pages/agencyManagement/AgencyManagement";
import DashboardLayout from "./pages/dashboard/Dashboard";
import EventManagementPage from "./pages/eventManagement/EventManagementPage";
import Login from "./pages/login/Login";
import MediatorAvailability from "./pages/mediatorAvailability/MediatorAvailability";
import UserManagement from "./pages/userManagement/UserManagement";
import TeamDetails from "./pages/teamDetails/TeamDetails";


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
    <UserManagement />
  </div>
  )
}