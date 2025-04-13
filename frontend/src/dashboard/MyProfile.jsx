import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {BACKEND_URL} from '../utils';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Fetch token from localStorage

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/myprofile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
          withCredentials: true,
        });
console.log("bbbb", data)
        setProfile(data); // Assuming API returns { user: {...} }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div className="text-center my-5">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center my-5">No profile data found</div>;
  }

  return (
    <div className="container mt-5 my-5">
      <h2 className="text-center mb-4">My Profile</h2>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4 text-center">
          <Link className="text-decoration-none">
            {/* Profile Image Container */}
            <div className="card border-1 shadow-sm p-2 rounded-circle mx-auto" style={{ width: "150px", height: "150px" }}>
              <div className="overflow-hidden rounded-circle bg-light mx-auto" style={{ width: "100%", height: "100%" }}>
                <img
                  src={profile.photo?.url || "https://via.placeholder.com/150"}
                  className="img-fluid object-fit-cover rounded-circle"
                  alt={profile.name || "Profile Image"}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-3">
              <p className="fw-bold mb-1">{profile.name || "No Name Provided"}</p>
              <p className="text-muted small">{profile.role || "User"}</p>
              <p className="text-muted small">{profile.email || "No Email"}</p>
              <p className="text-muted small">{profile.phone || "No phone"}</p>
              <p className="text-muted small">{profile.education || "No education"}</p>
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
