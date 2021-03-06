import Login from "../pages/Login";
import GeneralDashboard from "../pages/Dashboard/GeneralDashboard";
import ClientManagment from "../pages/Dashboard/ClientManagment";
import Co2Reduction from "../pages/Dashboard/Co2Reduction";
import Maintenance from "../pages/Dashboard/Maintenance";
import MonthlyAvaliablity from "../pages/Dashboard/MonthlyAvaliablity";
import ShockingSense from "../pages/Dashboard/ShockingSensing";
import TruckUsage from "../pages/Dashboard/TruckUsage";
import OccupancyJournal from "../pages/Dashboard/OccupancyJournal";
import Driver from "../pages/Dashboard/Driver";
import UserManagement from "../pages/Dashboard/UserManagement";
import ResetPassword from "../pages/ResetPassword";
import ForgetPassword from "../pages/ForgetPassword";
import AdminLogin from "../pages/AdminLogin";
import Battery from "../pages/Dashboard/Battery";
import EditUsersPage from "../pages/Dashboard/EditUsersPage";
import EditClientsPage from "../pages/Dashboard/EditClientsPage";
import ContactAdmin from "../pages/ContactAdmin";
import UploadData from "../pages/Dashboard/Upload";
import TruckManagment from "../pages/Dashboard/TruckManagment";
import BatteryUpload from "../pages/BatteryUpload";
import AvailablityUpload from "../pages/MonthlyUpload";

export const publicRoutes = [
  {
    path: "/",
    component: <Login />,
  },

  {
    path: "/reset-password/:token",
    component: <ResetPassword />,
  },

  {
    path: "/forget-password",
    component: <ForgetPassword />,
  },

  {
    path: "/admin-login",
    component: <AdminLogin />,
  },

  {
    path: "/contact-admin",
    component: <ContactAdmin />,
  },
];
export const protectedRoutes = {
  admin: [
    { path: "/client-management", component: <ClientManagment /> },

    { path: "/user-management", component: <UserManagement /> },

    { path: "/user-management/:userType/:id", component: <EditClientsPage /> },

    // { path: "/upload-data", component: <UploadData /> },

    { path: "/battery-upload", component: <BatteryUpload /> },

    { path: "/availability-upload", component: <AvailablityUpload /> },
  ],
  client: [
    { path: "/home", component: <GeneralDashboard /> },

    { path: "/co2-reduction", component: <Co2Reduction /> },

    { path: "/occupancy-journal", component: <OccupancyJournal /> },

    { path: "/battery", component: <Battery /> },

    { path: "/maintenance", component: <Maintenance /> },

    { path: "/monthly-avaliablity", component: <MonthlyAvaliablity /> },

    { path: "/shocking-sense", component: <ShockingSense /> },

    // { path: "/truck-usage", component: <TruckUsage /> },

    { path: "/driver", component: <Driver /> },

    { path: "/truck-management", component: <TruckManagment /> },
  ],
};
