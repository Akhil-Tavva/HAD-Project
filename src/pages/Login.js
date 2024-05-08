import React, { useState } from 'react';
import { Form, Button, Input, Select } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { url } from '../const';
const { Option } = Select;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('doctor'); // Default role

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response
      // Include selected role in the request payload
      // const payload = { ...values, role: selectedRole };
      if (selectedRole === 'moderator') {
        console.log("This is moderator")
        response = await axios.post(url + '/auth/mod-login', values);
      } else if (selectedRole === 'admin') {
        console.log("This is admin")
        response = await axios.post(url + '/auth/admin-login', values);
      } else {
        console.log("This is doctor")
        // Default login for other roles
        response = await axios.post(url + '/auth/login', values);
      }

      dispatch(hideLoading());
      console.log('Response data success:', response.data);

      if (response.data && response.data.title === 'Success') {
        toast.success(response.data.message);
        AsyncStorage.setItem('User Details', response.data.payload);
        AsyncStorage.setItem('Role', response.data.payload.role);
        AsyncStorage.setItem('token', response.data.payload.token);
        navigate('/home');
      } else {
        console.log('Response data error:', response.data);
        toast.error(
          response.data && response.data.message
            ? response.data.message
            : 'Unknown error occurred'
        );
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <div className='auth'>
      <div className='auth-form card p-3'>
        <h1 className='card-title'>WELCOME</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Role'>
            <Select defaultValue='user' onChange={handleRoleChange}>
              <Option value='admin'>Admin</Option>
              <Option value='moderator'>Moderator</Option>
              <Option value='user'>User</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item label='Username' name='username'>
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input.Password placeholder='Password' type='password' />
          </Form.Item>

          <Button className='primary-button my-2' htmlType='submit'>
            Submit
          </Button>

          <Link to='/ForgetPassword' className='anchor mt-2'>
            Forgot Password
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
