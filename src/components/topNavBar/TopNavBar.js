import SettingsIcon from "../../assets/SettingsIcon";
import DashboardIcon from "../../assets/DashboardIcon";
import { NotificationIcon } from "../../assets/NotificationIcon";
import TaskManagementIcon from "../../assets/TaskManagementIcon";
import { MediatorAvailablitiyIcons } from "../../assets/MediatorAvailablitiyIcons";
import { TeamManagementIcon } from "../../assets/TeamManagementIcon";
import EventManagementIcons from "../../assets/EventManagementIcons";
import { TopBarFirstIcon } from "../../assets/TopBarFirstIcon";

const TopNavBar = () => {
    return (
        <div className="w-full flex justify-center">
            {/* This div will hold the actual top bar content and will be centered */}
            <div className="w-8/12 max-sm:w-full bg-[var(--darkBlue)] flex justify-around items-center py-4 border-b-[5px] border-orange-500">
                <TopBarFirstIcon className="text-white h-6 w-6" />
                <DashboardIcon className="text-white h-6 w-6" />
                <EventManagementIcons className="text-white h-6 w-6" />
                <TeamManagementIcon className="text-white h-6 w-6" />
                <MediatorAvailablitiyIcons className="text-white h-6 w-6" />
                <TaskManagementIcon className="text-white h-6 w-6" />
                <NotificationIcon className="text-white h-6 w-6" />
                <SettingsIcon className="text-white h-6 w-6" />
            </div>
        </div>
    );
};

export default TopNavBar;
