import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import {url} from '../const'

function UpdatePassword() {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            // const response = await axios.post('http://localhost:8080/auth/update-password', values);
            const response = await axios.post(url+'auth/update-password', values);
            
            dispatch(hideLoading());
            console.log('Response data success:', response.data);

            if (response.data && response.data.title === 'Success') {
                toast.success(response.data.message);
                navigate("/login");
            } else {
                console.log('Response data error:', response.data);
                toast.error(response.data && response.data.message ? response.data.message : "Unknown error occurred");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='auth'>
            <div className='auth-form card p-3'>
                <h1 className='card-title'>Update Password</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='OTP' name='otp'>
                        <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='OTP' />
                    </Form.Item>

                    <Form.Item label='New Password' name='newPassword'>
                        <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' />
                    </Form.Item>
                    
                    <Button className='primary-button my-2' htmlType='submit'> Submit </Button>
                </Form>
            </div>
        </div>
    )
}

export default UpdatePassword;
