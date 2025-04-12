import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [myblogs, setMyblogs] = useState([])
   

    useEffect(() => {
        // fetch profile 
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token"); 
                // console.log("nnnn", token)
        
                if (!token) {
                    throw new Error("Authentication token not found");
                }
        
                // Fetch profile data using the token
                const response = await axios.get("http://localhost:8080/api/users/myprofile", {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
        
                // console.log("Profile data:", response.data);
                setProfile(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error fetching profile:", error);
        
                if (error.response?.status === 401) {
                    setError("User not authenticated. Please log in.");
                } else {
                    setError("Failed to fetch profile. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };
        


        const fetchBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/blogs/allblogs");
                console.log("Some data",response.data.data)
                setBlogs(response.data.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setError("Failed to fetch blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };


        const fetchMyBlogs = async () => {
            try {
                const token = localStorage.getItem("token");
        
                if (!token) {
                    throw new Error("Authentication token not found");
                }
        
                const response = await axios.get("http://localhost:8080/api/blogs/getmyblog", {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
        
                // console.log("My blogs fetched arjun:", response.data);
                setMyblogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };



        fetchMyBlogs()
        fetchBlogs();
        fetchProfile()
    }, []);

    return (
        <AuthContext.Provider value={{ blogs,setBlogs, loading, error, profile, setProfile, isAuthenticated, setIsAuthenticated, setMyblogs, myblogs }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
