import React, { useEffect } from 'react';
// import { createRoot } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavShow } from '../store/commonSlice.js';

function AdminHome() {
    const adminObj = useSelector(state => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (adminObj.status === 500 || adminObj.status === undefined)
        navigate("/adminLogin");

    useEffect(() => {
        dispatch(setNavShow("admin"));
    });

    return (
        <div>
            <br />
            <blockquote>
                <br />
                <h2>Welcome {adminObj.loggedInEmail}</h2>
                <br />
                <h2>{adminObj.message}</h2>

                <p>
                    As an administrator of the Sports & eSports Tournament Platform,
                    you are responsible for managing organizers, monitoring tournaments,
                    and ensuring fair and smooth operations across the system.
                    This dashboard allows you to verify organizers, oversee registrations,
                    and maintain platform integrity.
                </p>
            </blockquote>
        </div>
    );
}

export default AdminHome;
