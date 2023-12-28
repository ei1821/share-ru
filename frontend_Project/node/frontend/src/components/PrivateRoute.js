// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuth);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
