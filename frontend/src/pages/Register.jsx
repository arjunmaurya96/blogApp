import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';
import {BACKEND_URL} from '../utils';

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [education, setEducation] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  const changePhotoHandler = (e) => {
    //  console.log(e);
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPhotoPreview(reader.result)
      setPhoto(file)
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('photo', photo);
    formData.append('phone', phone)
    formData.append('password', password);
    formData.append('role', role);
    formData.append('education', education);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            // "Content-Type":"multipart/form-data"
          }
        }
      );
      // console.log(response);
      toast.success('User Registered Successfully');
      setProfile(profile)
      setIsAuthenticated(true)
      // Clear form fields
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('');
      setEducation('');
      setPhoto('');
      setPhotoPreview('');
      navigate("/login")
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      toast.error('Registration failed. Please try again.');
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
                    onChange={(e) => setName(e.target.value)}
                    name='name'
                    value={name}
                    className='form-control'
                    placeholder='Your Name'
                  />
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
                    type='number'
                    onChange={(e) => setPhone(e.target.value)}
                    name='phone'
                    value={phone}
                    className='form-control'
                    placeholder='Phone Number'
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
                  <select
                    className='form-control'
                    onChange={(e) => setEducation(e.target.value)}
                    value={education}
                  >
                    <option value=''>Select Your Education</option>
                    <option value='bca'>BCA</option>
                    <option value='mca'>MCA</option>
                    <option value='diploma'>DIPLOMA</option>
                    <option value='btech'>BTECH</option>
                    <option value='bsc'>BSC</option>
                    <option value='other'>OTHERS</option>
                  </select>
                </div>

                <div className='mb-3 d-flex text-center'>
                  <label htmlFor='formGroupExampleInput' className='form-label d-flex me-2 mt-auto'>
                    <img
                      src={photoPreview || 'photo'}
                      alt='preview'
                      style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                    />
                  </label>
                  <input
                    type='file'
                    onChange={changePhotoHandler}
                    className='form-control'
                  />
                </div>

                <div className='mb-3'>
                  <p className='text-center'>
                    Already registered?{' '}
                    <Link to='/login' className='text-decoration-none'>
                      Login Now
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

export default Register;
