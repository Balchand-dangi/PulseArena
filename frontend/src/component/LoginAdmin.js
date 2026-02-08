import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';
import adminLoginImg from '../images/adminLogin.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginThunk } from '../store/adminSlice.js';

function LoginAdmin() {

    const adminObj = useSelector(state => state.admin);
    const [adminData, setAdminData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = (event) => {
        const { name, value } = event.target;
        setAdminData({
            ...adminData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(adminLoginThunk(adminData));
        navigate('/adminHome');
        event.target.reset();
    };

      return (
  <div className="auth-container">

    <div className="auth-image">
      <img src={adminLoginImg} alt="Admin Login" />
    </div>

    <div className="auth-form">
      <h2>Admin Login</h2>
      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={getData}
        /><br />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={getData}
        /><br /><br />

        <input type="submit" value="Login" /><br />
        <input type="reset" value="Reset" />
      </form>
    </div>

  </div>
);

}

export default LoginAdmin;
