import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate(); // Hook to perform navigation programmatically
    
    // State to manage the visibility of the message (optional, but cleaner)
    const [isChecking, setIsChecking] = useState(true); 

    useEffect(() => {
        if (!token) {
            // 1. Set a timeout to delay the navigation
            const timer = setTimeout(() => {
                // 2. Execute the navigation after 3 seconds (or any desired duration)
                navigate('/', { replace: true });
            }, 3000); // 3000 milliseconds = 3 seconds

            // 3. Cleanup function: important to clear the timeout if the component unmounts
            return () => clearTimeout(timer);
        } else {
            // If the token exists, stop checking immediately
            setIsChecking(false);
        }
    }, [token, navigate]);

    if (token) {
        // If the token is present, render the protected content immediately
        return <Outlet />;
    }

    // If the token is NOT present and we are waiting for the timeout (3 seconds)
    if (isChecking) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '50px',
                fontSize: '1.2rem',
                color: '#ef4444',
                backgroundColor: '#fef2f2', 
                border: '1px solid #fecaca', 
                borderRadius: '8px',
                margin: '20px'
            }}>
                🛑 Access Denied: You must be logged in to view this page. Redirecting to login in 3 seconds...
            </div>
        );
    }
    
   
    return null; 
};

export default ProtectedRoute;