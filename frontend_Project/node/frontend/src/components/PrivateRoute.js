// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, authenticated, ...props }) => {
    return (
        <Route
            {...props}
            element={authenticated ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
