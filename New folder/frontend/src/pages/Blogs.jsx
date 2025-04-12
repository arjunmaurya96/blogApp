import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const { blogs, setBlogs } = useAuth(); // Get blogs from context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("122", blogs)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await axios.get("http://localhost:8080/api/blogs/allblogs");
        // console.log("cccc", result.data.data)
        setBlogs(result.data.data);
      } catch (error) {
        console.error("blogs not fatch:", error);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [setBlogs]);




  if (loading) return <div className="text-center my-5">Loading blogs...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Blogs</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="col">
              <div className="card position-relative overflow-hidden h-100 shadow-sm">
                <Link to={`/blog/${blog._id}`} className="text-decoration-none">
                  {/* Card Image */}
                  <div className="overflow-hidden bg-dark" style={{ height: "200px", width: "100%" }}>
                    <img
                      src={blog.blogimage?.url || "https://via.placeholder.com/300"}
                      className="card-img-top img-fluid object-fit-cover"
                      alt={blog.title || "Blog Image"}
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Link>

                {/* Title */}
                <h5 className="card-title text-center mt-2">{blog.title}</h5>

                {/* Card Body */}
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={blog.adminphoto || "https://via.placeholder.com/50"}
                      className="border rounded-circle"
                      style={{ height: "45px", width: "45px", objectFit: "cover" }}
                      alt="Admin"
                    />
                    <div className="ms-2 d-flex flex-column">
                      <span className="fw-bold">{blog.adminname || "Unknown"}</span>
                      <span className="small text-muted">New</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-12">No blogs available</div>
        )}
      </div>

      {/* Cart Section */}

    </div>
  );
};

export default Blogs;
