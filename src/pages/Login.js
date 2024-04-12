import React from 'react'
import {Form, Button, Input} from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Login() { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading())
            // const response = await axios.post('/api/user/login', values); // have to change axios link
            dispatch(hideLoading())
            navigate("/");
            // if(response.data.success){
            //     toast.success(response.data.message);
            //     toast("Redirecting to home page");
            //     localStorage.setItem("token", response.data.data);
            //     navigate("/");
            // }
            // else{
            //     toast.error(response.data.message);
            // }
        }catch(error){
            // toast.error("Something went wrong");
        }
    }
    return (
        <div className='auth'>
            <div className='auth-form card p-3'>
                <h1 className='card-title'>WELCOME</h1>
                <Form layout='vertical' onFinish={onFinish}>
                {/* <Form name="basic" labelCol={{ span: 8,}} wrapperCol={{ span: 16,}} style={{ maxWidth: 600,}} initialValues={{remember: true,}} onFinish={onFinish} autoComplete="off" > */}
                    {/* <Form.Item label="Username" name="username"
                                rules={[{
                                        required: true,
                                        message: 'Please input your username!',
                                    },]} >
                                    <Input placeholder='Username'/>
                    </Form.Item>
                    
                    <Form.Item label="Password" name="password" 
                                rules={[{
                                        required: true,
                                        message: 'Please input your password!',
                                    },]} >
                                    <Input.Password placeholder='Password'/>
                    </Form.Item> */}

                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input.Password placeholder='Password' type='password'/>
                    </Form.Item>
                    
                    <Button className='primary-button my-2' htmlType='submit'> Submit </Button>
                    
                    <Link to ='/signup' className='anchor mt-2'> CLICK HERE TO REGISTER</Link>
                    {/* Checkbox piece */}
                    {/* <Form.Item name="remember" valuePropName="checked"
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }} >
                    /* <Checkbox>Remember me</Checkbox> */}
                {/* </Form.Item>  */}

                </Form>
            </div>
        </div>
    )
}

export default Login