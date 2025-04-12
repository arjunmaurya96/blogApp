import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => { 
  const { _id } = useParams();
  console.log("idddd", _id)
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs/singleblog/${_id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("n  ncnvnv", response.data)

        const blog = response.data;
        setTitle(blog.title);
        setCategory(blog.category);
        setAbout(blog.about);
        setBlogImagePreview(blog.blogImage); 
  
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch blog details.");
      }
    };

    fetchBlog();
  }, [_id, token]);


   
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ base64Image: reader.result, fileName: file.name });
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to update the blog.");
      navigate("/login");
      return;
    }

    let imageData = null;
    if (blogImage) {
      imageData = await convertFileToBase64(blogImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/blogs/updateblog/${_id}`,
        {
          title,
          category,
          about,
          blogImage: imageData?.base64Image || blogImagePreview, 
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Blog updated successfully!");
      navigate("/dashboard/myblogs");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the blog.");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "60%" }}>
        <h5 className="mb-4 text-center">Create Blog</h5>

        <form onSubmit={handleUpdateBlog}>
 
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              className="form-control"
              placeholder="Enter blog category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

  
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

   
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="blogImage" className="form-label me-2">
              <img
                src={blogImagePreview || "https://via.placeholder.com/50"}
                alt="Preview"
                style={{ height: "50px", width: "50px", objectFit: "cover", borderRadius: "4px" }}
              />
            </label>
            <input
              type="file"
              id="blogImage"
              className="form-control"
              accept="image/*"
              onChange={changePhotoHandler}
              required
            />
          </div>

         
          <div className="mb-3">
            <label htmlFor="about" className="form-label">About</label>
            <textarea
              id="about"
              className="form-control"
              rows="5"
              placeholder="Write your blog message here"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            ></textarea>
          </div>

  
          <button type="submit" className="btn btn-primary w-100">
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
