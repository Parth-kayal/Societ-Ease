import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Residentlogin from '../components/Login/Residentlogin';
import Adminlogin from '../components/Login/Adminlogin';
import GuestLogin from '../components/Login/GuestLogin'
import "../assets/css/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const showSuccessMessage = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const showErrorMessage = (msg)=>{
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  return (
    <div className='Auth-form-container'>
      <ToastContainer></ToastContainer>
    <Tabs
      defaultActiveKey="admin"
      // transition={true}
      // id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="resident" title="Resident">
       <Residentlogin showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
      </Tab>
      <Tab eventKey="admin" title="Admin">
        <Adminlogin showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
      </Tab>
      <Tab eventKey="guest" title="Guest">
      <GuestLogin showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
      </Tab>
    </Tabs>
     </div>
  );
}

export default Login;