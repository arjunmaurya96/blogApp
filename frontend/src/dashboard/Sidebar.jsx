import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CreateBlog from "../dashboard/CreateBlog";
import Dashboard from "../pages/Dashboard";
import {BACKEND_URL} from '../utils';

const Sidebar = () => {
    const navigate = useNavigate();
    const { profile, isAuthenticated, setIsAuthenticated } = useAuth();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate(`/`);
    //     }
    // }, [isAuthenticated, navigate]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, { withCredentials: true });
            setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
            alert(error.response?.message || "Failed to logout");
        }
    };

    return (
        <>
            <div>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container-fluid">
                        <a
                            className="navbar-toggler me-2"
                            data-bs-toggle="offcanvas"
                            href="#offcanvasExample"
                            role="button"
                            aria-controls="offcanvasExample"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </a>
                        <a className="navbar-brand fw-bold me-auto" href="#">
                            BLOGS APPLICATION
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>

                {/* Offcanvas Sidebar */}
                <div
                    className="offcanvas offcanvas-start sidebar-nav bg-dark text-white"
                    tabIndex="-1"
                    id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel"
                >
                    <div className="offcanvas-body p-0">
                        <nav className="navbar-light">
                            <ul className="navbar-nav">
                                <li>
                                    <a href="#" className="nav-link px-3 active">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <span>
                                                <img
                                                    src={profile?.photo?.url}
                                                    className="img-fluid rounded-circle"
                                                    style={{
                                                        height: "100px",
                                                        width: "100px",
                                                        objectFit: "cover",
                                                    }}
                                                    alt="Profile"
                                                />
                                            </span>
                                            <h5 className="mt-3">{profile?.name}</h5>
                                        </div>
                                    </a>
                                </li>
                                <li className="my-4">
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <div className="text-secondary text-center mb-3 text-large fw-bold text-uppercase px-3">
                                        Interface
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-center mb-2">
                                        <Link to="/dashboard" className="btn btn-success btn-sm w-75 text-center">
                                            MY BLOGS
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-center mb-2">
                                        <Link to="/createblogs" className="btn btn-success btn-sm w-75 text-center">
                                            CREATE BLOGS
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button className="btn btn-success btn-sm w-75 text-center">
                                            MY PROFILE
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button
                                            onClick={() => navigate("/")}
                                            className="btn btn-success btn-sm w-75 text-center"
                                        >
                                            HOME
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="d-flex justify-content-center mb-2">
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-success btn-sm w-75 text-center"
                                        >
                                            LOGOUT
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
               
            </div>
        </>
    );
};

export default Sidebar;
