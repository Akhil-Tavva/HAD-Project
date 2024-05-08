import React from 'react'
import {Form, Button, Input} from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { hideLoading, showLoading } from '../redux/alertsSlice'


function Signup() {
    // have to do axios part
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onFinish = async(values) => {
        try{
            dispatch(showLoading());
            // const response = await axios.post('/api/user/register', values); // have to change axios link
            dispatch(hideLoading());
            navigate("/login");
            // if(response.data.success){
            //     toast.success(response.data.message);
            //     toast("Redirecting to login page");
            //     navigate("/login");
            // }
            // else{
            //     toast.error(response.data.message);
            // }
        }catch(error){
            dispatch(hideLoading());
            // toast.error("Something went wrong");
        }
    }
    return (
        <div className='auth'>
            <div className='auth-form card p-3'>
                <h1 className='card-title'>Nice to Meet you</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name'>
                        <Input placeholder='Name'/>
                    </Form.Item>

                    <Form.Item label='Email' name='username'>
                        <Input placeholder='Email'/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <Input placeholder='Password' type='password'/>
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'> Submit </Button>

                    <Link to ='/login' className='anchor mt-2'> CLICK HERE TO LOGIN</Link>
                </Form>
            </div>
        </div>
    )
}

export default Signup