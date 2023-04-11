import React, { useState } from "react"
import { loginUser, createResident } from "api/Auth/authApi";
import { useHistory } from "react-router-dom";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const history = useHistory();
  const {showErrorMessage, showSuccessMessage} = props;
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const [credentials, setCredentials] = useState({
    userType:"resident",
    email:"",
    password:""
  })

  const [resData, setResData] = useState({
    residentName:"",
    residentEmail:"",
    residentContactNumber:"",
    residentAadhar:"",
    password:"",
    residentRoomNumber:0,
    securityKey:""
  })

  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value});
  }

  
  const handleDataChange = (e)=>{
    setResData({...resData, [e.target.name]:e.target.value});
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const response = await loginUser(credentials);
    if(response.success){
      localStorage.setItem('userType', "resident");
      localStorage.setItem('token', response.authToken)
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails[0]));
      history.push("/resident/dashboard")
    }else {
      console.log(response)
      showErrorMessage(response.error)
    }
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const response = await createResident(resData);
    if(response.success){
      localStorage.setItem('userType', "resident");
      localStorage.setItem('token', response.authToken)
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails))
      history.push("/resident/dashboard")
    }else{
      console.log(response)
      showErrorMessage(response.error)
    }
  }
  
  if (authMode === "signin") {
    return (
        <form className="Auth-form" onSubmit = {handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" style={{color:"blue"}} onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </div>
        </form>
    )
  }

  return (
      <form className="Auth-form" onSubmit={handleSignup}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" style={{color:"blue"}} onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              name="residentName"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Your name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="residentEmail"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Contact Number</label>
            <input
              type="text"
              name="residentContactNumber"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Contact no."
            />
          </div>
          <div className="form-group mt-3">
            <label>Aadhar No.</label>
            <input
              type="text"
              name="residentAadhar"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Enter Aadhar number"
            />
          </div>
          <div className="form-group mt-3">
            <label>Room no.</label>
            <input
              type="text"
              name="residentRoomNumber"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Room no."
            />
          </div>
          <div className="form-group mt-3">
            <label>Security Key</label>
            <input
              type="text"
              name="securityKey"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Enter security key"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
        </div>
      </form>
  )
}