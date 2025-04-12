import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import MyBlogs from "../dashboard/MyBlogs";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, setProfile, isAuthenticated, setIsAuthenticated } = useAuth();

  // console.log(profile);


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");

      setIsAuthenticated(false);

      navigate("/");
      toast.success("User logged out Successfully")
      console.log("User logged out successfully");
    } catch (error) {
      toast.error("Logout Failed")
      console.error("Logout failed:", error);
      alert("Failed to logout");
    }
  };

  // const handleLogout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     localStorage.removeItem("token");

  //     const { data } = await axios.post("http://localhost:8080/api/users/logout", {}, { withCredentials: true });

  //     toast.success(data.message);
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response?.data?.message || "Failed to logout");
  //   }
  // };



  return (
    <div className="d-flex flex-column flex-lg-row vh-100">      <div
      className="bg-dark text-white p-3 flex-shrink-0"
      style={{ width: "100%", maxWidth: "250px" }}
    >
      <div className="text-center mb-4 mt-5">
        <img
          src={profile?.photo?.url || "https://via.placeholder.com/150"}
          alt="Profile"
          className="img-fluid rounded-circle"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <p className="text-center fw-bold fs-3">{profile.name}</p>
      </div>

      <nav className="nav flex-column">
        <Link to="/dashboard/myblogs" className="nav-link text-white">
          My Blogs
        </Link>
        <Link to="/dashboard/createblogs" className="nav-link text-white">
          Create Blogs
        </Link>
        <Link to="/dashboard/myprofile" className="nav-link text-white">
          My Profile
        </Link>
        <Link to="/" className="nav-link text-white">
          Home
        </Link>
        <Link to="" onClick={handleLogout} className="nav-link text-white">
          Logout
        </Link>
      </nav>
    </div>

      <div className="flex-grow-1">
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Dashboard
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">

                <li className="nav-item">
                  <Link to="/dashboard/myprofile" className="nav-link">
                    Profile
                  </Link>

                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="p-4">

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
