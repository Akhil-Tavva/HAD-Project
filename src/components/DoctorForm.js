import React from 'react'
import {Button, Col, Form, Input, Row, TimePicker} from 'antd'
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import {showLoading, hideLoading} from '../redux/alertsSlice'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import Layout from './Layout';

function DoctorForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    // here u have to display the profile details from db
    const onFinish = async(values) => {
        try{
            dispatch(showLoading())
            dispatch(hideLoading())
            navigate('/')
        }catch(error){
            dispatch(hideLoading())
        }
    }

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <h1 className='card-title mt-3'> Personal Information</h1>
            <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "First Name"
                        name = "firstName"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Last Name"
                        name = "lastName"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Phone Number"
                        name = "phoneNumber"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Website"
                        name = "website"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Website" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Address"
                        name = "address"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                </Col>                                
            </Row>
            <hr />
            <h1 className='card-title mt-3'> Professional Experience</h1>
            <Row gutter={20}>
            <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Specialization"
                        name = "specialization"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Specialization" />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Experience"
                        name = "experience"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Experience" type= 'number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Fee Per Consultaion"
                        name = "feePerConsultaion"
                        rules = {[{required: true}]}
                    >
                        <Input placeholder="Fee Per Consultaion" type= 'number' />
                    </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Form.Item 
                        required
                        label = "Timings"
                        name = "timings"
                        rules = {[{required: true}]}
                    >
                        <TimePicker.RangePicker />
                    </Form.Item>
                </Col>
            </Row>

            <div className='d-flex justify-content-end'>
                <Button className='primary-button' htmlType='submit'> SUBMIT </Button>
            </div>
        </Form>
    )
}

export default DoctorForm