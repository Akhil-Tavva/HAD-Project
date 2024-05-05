import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import AdminLayout from '../../components/AdminLayout'
import ModeratorLayout from '../../components/ModeratorLayout'
import './AddDoctor.css';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import { url } from '../../const'
import AsyncStorage from '@react-native-async-storage/async-storage'

// doubt
const AddDoctor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [role, setRole] = useState('')

  const onFinish = async (values) => {
    setLoading(true);
    // Here you can implement the logic to add the new doctor, like making an API call
    dispatch(showLoading())
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // const response = await axios.get('http://localhost:8080/auth/')
    const response = await axios.post(url + '/admin/doctor/', values)
    dispatch(hideLoading())
  }

  const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)


  return (
    <>
      {role === 'ADMIN' ? (
        <AdminLayout>
          <h1>Add New Doctor</h1>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNo"
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Please input the specialization!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </AdminLayout>
      ) : (
        <ModeratorLayout>
          <h1>Add New Doctor</h1>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input the email!' },
                { type: 'email', message: 'Please enter a valid email address!' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNo"
              rules={[{ required: true, message: 'Please input phone number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Specialization"
              name="specialization"
              rules={[{ required: true, message: 'Please input the specialization!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ModeratorLayout>
      )}
    </>
  );
};

export default AddDoctor;
