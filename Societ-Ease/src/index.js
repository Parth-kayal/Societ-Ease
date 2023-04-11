import React,{useEffect} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import ResidentLayout from "layouts/Resident";
import Login  from "layouts/Login"
import GuestLayout from "layouts/Guest";
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(

  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/resident" render={(props) => <ResidentLayout {...props} />} />
      <Route path="/guest" render={(props) => <GuestLayout {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);
