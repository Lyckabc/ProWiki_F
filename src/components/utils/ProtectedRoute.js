import { Navigate, useLocation } from 'react-router-dom';
import { useLogon } from './Logon';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, checkLoginStatus } = useLogon();
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = () => {
            const authStatus = checkLoginStatus();
            setIsAuthenticated(authStatus);
            setIsChecking(false);
        };
        verifyAuth();
    }, [checkLoginStatus]);

    useEffect(() => {
        console.log('Auth Status:', {
            isChecking,
            isAuthenticated,
            isLoggedIn
        });
    }, [isChecking, isAuthenticated, isLoggedIn]);

    if (isChecking) {
        return null; // 또는 로딩 스피너
    }

    if (!isAuthenticated || !isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};