import React, { useState, useEffect } from 'react'
// import {useDispatch} from 'react-redux'
import Layout from '../../components/Layout'
import SrLayout from '../../components/SrDoctorLayout'
// import {showLoading, hideLoading} from '../../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Table } from 'antd'
import moment from 'moment'
import { url } from '../../const'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Appointments() {
    const [appointments, setAppointments] = useState([])
    // const dispatch = useDispatch()
    const [role, setRole] = useState('')
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    const getData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            // const response = await axios.get('http://localhost:8080/forum/')
            const response = await axios.get(url + '/forum/');
            console.log(response.data)
            setAppointments(response.data.payload)
            console.log(appointments)
        } catch (error) {
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
    }

    useEffect(() => {
        getData()
    }, [])

    const columns1 = [
        // {
        //     title: 'Id',
        //     dataIndex: '_id'
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        // {
        //     title: 'Phone',
        //     dataIndex: 'phoneNumber',
        //     render: (text, record) => (
        //         <span>
        //             {record.doctorInfo.phoneNumber} 
        //         </span>
        //     ),
        // },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('DD-MM-YYYY')}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Test Results',
            dataIndex: 'testResults',
        },
        {
            title: 'Referral',
            dataIndex: 'referral'
        }
    ]

    const columns2 = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('DD-MM-YYYY')}
                </span>
            ),
        },
        {
            title: 'Chat',
            dataIndex: 'chat',
            // TODO: show chat between doctor and particular user 
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Test Results',
            dataIndex: 'testResults',
        },
        {
            title: 'Referral',
            dataIndex: 'referral'
        }
    ]

    return (
        <>
            {role === 'DOCTOR' ? (
                <Layout>
                    <h1 className='page-header'> </h1>
                    <Table columns={columns1} dataSource={appointments}> </Table>

                </Layout>
            ) : (
                <SrLayout>
                    <h1 className='page-header'> </h1>
                    <Table columns={columns2} dataSource={appointments}> </Table>

                </SrLayout>
            )}
        </>
    )
}

export default Appointments