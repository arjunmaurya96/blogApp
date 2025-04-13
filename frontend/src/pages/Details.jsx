import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {BACKEND_URL} from '../utils'

const Details = () => {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/blogs/singleblog/${_id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog details.");
      }
    };

    if (_id && token) {
      fetchBlog();
    }
  }, [_id, token]);

  if (!blog) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5 pt-5">
      <h2 className="text-center mb-4">{blog.title}</h2>
      <p className="text-center text-muted">By {blog.adminname}</p>

      <div className="row">
        <div className="col-md-6">
          <div className="overflow-hidden bg-dark" style={{ height: "300px", width: "100%" }}>
            <img
              src={blog?.blogimage?.url || "https://via.placeholder.com/300"}
              className="img-fluid"
              alt={blog.title || "Blog Image"}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 border rounded shadow">
            <h5>Content:</h5>
            <p>{blog.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
