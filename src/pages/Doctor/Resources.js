import React, { useState } from 'react'
// import { Form } from 'antd'
import Layout from '../../components/Layout'
import SrLayout from '../../components/SrDoctorLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import '../../Layout.css'
import axios from 'axios';
import { customHeaders, url } from '../../const'
import AsyncStorage from '@react-native-async-storage/async-storage'
import toast from 'react-hot-toast'

// api/resource/ 
function Resources() {
    const [formData, setFormData] = useState({
        content: '',
        name: '',
        tag: '',
        
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
          const response = await axios.post(url + '/api/resource', formData, {
            headers: {
              'Authorization': `Bearer ${token}`,
              customHeaders,
            }
          });
          toast.success(response.data.message);
          console.log('Doctor added successfully:', response.data);
          // Clear form after successful submission
          setFormData({
            content: '',
            name: '',
            tag: '',
            
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
    
        <Layout>
          <h2>Add Resource</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Video Id</label>
              <input type="text" id="content" name="content" value={formData.content} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name of Video</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="tag">Tag</label>
              <input type="text" id="tag" name="tag" value={formData.tag} onChange={handleChange} />
            </div>
            {/* <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            </div> */}
            <button type="submit">Add Resource</button>
          </form>
        </Layout>
    )
}

export default Resources