import React, {useState} from "react"
import { loginUser } from "api/Auth/authApi";
import {useHistory} from 'react-router-dom';

export default function Adminlogin(props) {
  const history = useHistory();
  const {showErrorMessage, showSuccessMessage} = props;

  const [credentials, setCredentials] = useState({
    userType:"admin",
    email:"",
    password: ""
  });

  const handleChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value});
  }

  
  
  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(credentials)
    const response = await loginUser(credentials);
    if(response.success){
      console.log(response)
      localStorage.setItem('userType', "admin");
      localStorage.setItem('token', response.authToken)
      localStorage.setItem('userDetails', JSON.stringify(response.userDetails[0]))
      history.push("/admin/dashboard")
    }else {
      showErrorMessage(response.error)
      console.log(response)
    }
    // return false;
  }

  return (
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
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