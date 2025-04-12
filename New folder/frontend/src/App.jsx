import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Creators from "./pages/Creators";
import CreateBlog from "./dashboard/CreateBlog";
import MyProfile from "./dashboard/MyProfile";
import MyBlogs from "./dashboard/MyBlogs";

const App = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should not appear
  const hideNavbarFooter = location.pathname.startsWith("/dashboard") || 
                           location.pathname === "/login" || 
                           location.pathname === "/register";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* Main Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/creators" element={<Creators />} />


        {/* Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="createblogs" element={<CreateBlog />} />
          <Route path="myprofile" element={<MyProfile/>}/>
          <Route path="myblogs" element={<MyBlogs/>}/>
          {/* Add  */}
        </Route>
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </>
  );
};

export default App;
