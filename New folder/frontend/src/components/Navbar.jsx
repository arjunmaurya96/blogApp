import React from 'react'
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { blogs } = useAuth();
  // console.log("this is blogs", blogs);

  return (
    <>
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary shadow-lg">
  <div className="container">
    <Link className="navbar-brand fw-bold" href="#"> BLOGS </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">HOME </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blogs">BLOGS</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/creators">CREATORS  </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">ABOUT   </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">CONTACT  </Link>
        </li>
      </ul>
     <div className='d-flex'>
      <Link className='btn btn-primary me-2' to="/dashboard">DASHBOARD </Link>
      <Link className='btn btn-danger' to="/login">LOGIN  </Link>
     </div>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar