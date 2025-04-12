import React from "react";
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "25d27c81-e884-45db-9f61-002b2924f160",
      name: data.username,
      email: data.email,
      message: data.message,
    };

    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error("An error occurred");
    }
  };


  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="row shadow rounded p-4" style={{ maxWidth: "900px", width: "100%" }}>
        {/* Left Side - Form */}
        <h4 className="mb-3 text-center fw-bold fs-2">Contact Us </h4>
        <div className="col-lg-6 col-md-12 mb-4">
          <h4 className="mb-3 fs-5">Send us a message </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                name="username"
                placeholder="Enter your name"
                {...register("username", { required: true })}
              />
              {errors.username && <span className="text-danger">This field is required</span>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-danger">This field is required</span>}
            </div>
            <div className="mb-3">

              <textarea
                className="form-control"
                id="message"
                rows="4"
                name="message"
                placeholder="Write your message"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <span className="text-danger">This field is required</span>}
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </form>
        </div>

        {/* Right Side - Contact Information */}
        <div className="col-lg-6 col-md-12">
          <h4 className="mb-3 fs-5">Contact Information</h4>
          <ul className="list-unstyled">
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-telephone-fill me-3 fs-5 text-primary"></i>
              <span>+ 9621192312</span>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <i className="bi bi-envelope-fill me-3 fs-5 text-primary"></i>
              <span>arjunmaurya9621192312@gmail.com</span>
            </li>
            <li className="d-flex align-items-center">
              <i className="bi bi-geo-alt-fill me-3 fs-5 text-primary"></i>
              <span>sector 2 rohini new delhi </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
