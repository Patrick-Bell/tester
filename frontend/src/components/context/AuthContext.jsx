import React, { useState, useEffect, createContext, useContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useLocation } from 'react-router-dom'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const location = useLocation(); // ✅ Add this to track path changes

    const login = async (formData) => {        
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/login`,
                { user: formData },
                { withCredentials: true }
            );
            toast.success('Successfully Logged in');
            setUser(response?.data?.user);
            console.log('user', response.data);
            window.location.reload()

            setAuthenticated(true); // ✅ Set authentication state

            if (response.data.role === 'admin') {
                setIsAdmin(true);
                setIsUser(false);
            } else {
                setIsUser(true);
                setIsAdmin(false);
            }
        } catch (e) {
            console.error('Login error:', e);
            toast.error('Login failed. Please try again.');
        }
    };

    const signup = async (formData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/signup`,
                { user: formData },
                { withCredentials: true }
            );
            toast.success("Account successfully created!", {
                description: 'You can now log in',
                autoClose: 3000
            });
        } catch (e) {
            console.error('Signup error:', e);
            toast.error('Signup failed. Please try again.');
        }
    };

    const checkAuth = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/current-user`,
                { withCredentials: true }
            );

            if (response.data) {
                setUser(response.data);
                setAuthenticated(true); // ✅ Ensure authentication state is updated

                if (response.data.role === 'user') {
                    setIsUser(true);
                    setIsAdmin(false);
                } else {
                    setIsAdmin(true);
                    setIsUser(false);
                }
            } else {
                setAuthenticated(false);
            }
            console.log('checking status', response.data);
        } catch (e) {
            console.error('Auth check error:', e);
            
        }
    };

    const logout = async () => {
        try{
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/logout`,
                { withCredentials: true }
            );
            console.log(response.data)
            setAuthenticated(false);
            setIsAdmin(false)
            setIsUser(false)
            setUser(null)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        checkAuth();
    }, [location.pathname]); // ✅ Fix: Ensure it runs when path changes

    return (
        <AuthContext.Provider value={{ user, isAdmin, isUser, authenticated, login, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
