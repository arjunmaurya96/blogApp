import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import {BACKEND_URL} from '../utils';




const Login = () => {
  const {isAuthenticated, setIsAuthenticated, profile, setProfile} = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  console.log('fhai ki nhi', isAuthenticated)

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log('Login response:', response);
      const token = response.data.token;
      if (token) {
        // Save token in localStorage
        localStorage.setItem("token", token);
        // console.log("Token saved in localStorage:", token);
      }
      toast.success("User Login Successfully");
      // setProfile(profile)
      setIsAuthenticated(true)
      
      // Clear form fields
      setEmail('');
      setPassword('');
      setRole('');
      navigate("/");

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);

      if (error.response?.status === 401) {
        toast.error('Invalid credentials. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='parent mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <p className='text-center mt-2 fw-bold'>Blog</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <form className='formcontrol' onSubmit={handleRegister}>
                <div className='mb-3'>
                  <select
                    className='form-control'
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option value=''>Select Role</option>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </select>
                </div>



                <div className='mb-3'>
                  <input
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Your Email'
                  />
                </div>


                <div className='mb-3'>
                  <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Password'
                  />
                </div>



                <div className='mb-3'>
                  <p className='text-center'>
                    New User{' '}
                    <Link to='/register' className='text-decoration-none'>
                      Register Now
                    </Link>
                  </p>
                </div>

                <div className='mb-3'>
                  <input
                    type='submit'
                    value='Register'
                    className='form-control btn btn-primary'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
