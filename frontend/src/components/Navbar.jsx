import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  // console.log(profile)

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/");
      toast.success("User logged out Successfully");
      console.log("User logged out successfully");
    } catch (error) {
      toast.error("Logout Failed");
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary shadow-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">BLOGS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs">BLOGS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/creators">CREATORS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">ABOUT</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">CONTACT</Link>
            </li>

          
          </ul>
          {isAuthenticated && profile?.role === 'user' && (
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            )}


          {isAuthenticated && profile?.role === 'admin' && (
              <li className="nav-item navbar-nav">
                <Link className="btn btn-primary me-2" to="/dashboard">DASHBOARD</Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
              </li>
            )}

          <div className="d-flex">
         {
          !isAuthenticated?(
           <>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-success" to="/register">Register</Link>
           </>
          ):("")
         }

              <>
        
              </>
       
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
