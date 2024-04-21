import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
// import 'antd/dist/antd.css';
import Layout from '../../components/AdminLayout'
import './AddDoctor.css';

const AddDoctor = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Here you can implement the logic to add the new doctor, like making an API call
    setTimeout(() => {
      console.log('Received values:', values);
      setLoading(false);
      form.resetFields();
    }, 1000);
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
          label="Specialization"
          name="specialization"
          rules={[{ required: true, message: 'Please input the specialization!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input the email!' }]}
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
