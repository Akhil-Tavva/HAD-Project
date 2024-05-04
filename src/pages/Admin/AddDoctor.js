import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Layout from '../../components/AdminLayout'
import './AddDoctor.css';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from 'axios';
import {url} from '../../const'

// doubt
const AddDoctor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async(values) => {
    setLoading(true);
    // Here you can implement the logic to add the new doctor, like making an API call
    dispatch(showLoading())
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // const response = await axios.get('http://localhost:8080/auth/')
    const response = await axios.post(url + '/admin/doctor/', {

    })
    dispatch(hideLoading())
  };

  return (
    <Layout className="container">
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
    </Layout>
  );
};

export default AddDoctor;
