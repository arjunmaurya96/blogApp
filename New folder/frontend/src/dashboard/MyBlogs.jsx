import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const { myblogs, setMyblogs } = useAuth();
  const token = localStorage.getItem("token");

  // ✅ Delete Blog Function
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/blogs/delete/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Blog Deleted Successfully");

      // ✅ Remove deleted blog from state
      setMyblogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {myblogs?.map((blog, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100">
              <img
                src={blog?.blogimage?.url}
                className="card-img-top img-fluid"
                alt={blog.title || "Blog Image"}
              />
              <div className="card-body">
                <h5 className="card-title">{blog.title || "Blog Title"}</h5>
                <p className="card-text">{blog.category || "No category"}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => console.log(`Update blog ${blog._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
