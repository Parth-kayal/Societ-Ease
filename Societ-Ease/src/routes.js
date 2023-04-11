import Dashboard from "views/Dashboard.js";
import Resident from "views/UserData.js";
import Bills from "views/Bills.js";
import Notice from "views/Notice.js";
import Maintenance from "views/Maintenance.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/UserData",
    name: "Resident's Data",
    icon: "nc-icon nc-tile-56",
    component: Resident,
    layout: "/admin"
  },
  {
    path: "/Bills",
    name: "Bills",
    icon: "nc-icon nc-credit-card",
    component: Bills,
    layout: "/admin"
  },
  {
    path: "/Notices",
    name: "Notices",
    icon: "nc-icon nc-paper",
    component: Notice,
    layout: "/admin"
  },
  {
    path: "/Maintenance",
    name: "Maintenance",
    icon: "nc-icon nc-settings",
    component: Maintenance,
    layout: "/admin"
  },
];
export default routes;
  