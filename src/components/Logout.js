import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const response = axiosInstance.post('user/logout/blacklist', {
            refresh_token: localStorage.getItem('refresh_token'),
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
		localStorage.removeItem('user_name');
		localStorage.removeItem('user_id');

        axiosInstance.defaults.headers['Authorization'] = null;
        console.log("logged out.");
        navigate('/');

        //refresh for header
        window.location.reload();
    });
    return <div>Logged out successfully.</div>
}