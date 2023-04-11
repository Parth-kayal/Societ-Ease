import GuestDashboard from "views/GuestDashboard";
import GuestNotice from "views/GuestNotice";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: GuestDashboard,
    layout: "/guest"
  },
  {
    path: "/Notices",
    name: "View Notices",
    icon: "nc-icon nc-paper",
    component: GuestNotice,
    layout: "/guest"
  },
  
];
export default routes;
  