import React, { useState } from "react"
import { loginUser, createGuest } from "api/Auth/authApi";
import { useHistory } from "react-router-dom";

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const history = useHistory();
  const {showErrorMessage, showSuccessMessage} = props;
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const [credentials, setCredentials] = useState({
    userType:"guest",
    email:"",
    password:""
  })

  const [guestData, setGuestData] = useState({
    guestName:"",
    guestEmail:"",
    guestContactNumber:"",
    password:"",
    guestRoomNumber:0,
    visitPurpose:"",
    guestVisitDate:""
  })

  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value});
  }

  
  const handleDataChange = (e)=>{
    setGuestData({...guestData, [e.target.name]:e.target.value});
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const response = await loginUser(credentials);
    console.log(response)
    if(response.success){
      localStorage.setItem('userType', "guest");
      localStorage.setItem('token', response.authToken)
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails[0]));
      history.push("/guest/dashboard")
    }else {
      console.log(response)
      showErrorMessage(response.error)
    }
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const response = await createGuest(guestData);
    if(response.success){
      localStorage.setItem('userType', "guest");
      localStorage.setItem('token', response.authToken)
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails))
      console.log(response)
      history.push("/guest/dashboard")
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
              name="guestName"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Your name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="guestEmail"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Contact Number</label>
            <input
              type="text"
              name="guestContactNumber"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Contact no."
            />
          </div>
          <div className="form-group mt-3">
            <label>Room no.</label>
            <input
              type="text"
              name="guestRoomNumber"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Room no."
            />
          </div>
          <div className="form-group mt-3">
            <label>Purpose</label>
            <input
              type="text"
              name="visitPurpose"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Purpose...."
            />
          </div>
          <div className="form-group mt-3">
            <label>Visit Date</label>
            <input
              type="date"
              name="guestVisitDate"
              onChange={handleDataChange}
              className="form-control mt-1"
              placeholder="Password"
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