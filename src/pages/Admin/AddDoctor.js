import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import ModeratorLayout from '../../components/ModeratorLayout';
import './AddDoctor.css';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { url, customHeaders } from '../../const';
import AsyncStorage from '@react-native-async-storage/async-storage'
import toast from 'react-hot-toast';

const AddModeratorForm = () => {
  // const [role, setRole] = useState('');
  // const Userdetails = AsyncStorage.getItem('Role');
  // async function someFunction() {
  //   await Userdetails.then((res) => setRole(res));
  // }
  // someFunction()
  // console.log('User Role: ', role)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${AsyncStorage.getItem('token')}`;
      const token = await AsyncStorage.getItem('token')
      console.log('cretae moderator ' + token)
      console.log("Printing form data ", formData)
      const response = await axios.post(url + '/admin/doctor/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          customHeaders,
        }
      });
      toast.success(response.data.message);
      console.log('Doctor added successfully:', response.data);
      // Clear form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      });
    } catch (error) {
      // console.error('Error adding moderator:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
        toast.error('Server Error: ' + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server');
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up request:', error.message);
        toast.error('Error setting up request');
      }
    }
  };

  return (

    <AdminLayout>
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Add Doctor</button>
      </form>
    </AdminLayout>



  );
};

export default AddModeratorForm;

