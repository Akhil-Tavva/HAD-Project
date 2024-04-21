import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ModeratorLayout from '../../components/ModeratorLayout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Table } from 'antd'
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AdminLayout from '../../components/AdminLayout'

function DoctorsList() {
    const [doctors, setDoctors] = React.useState([])
    const dispatch = useDispatch()
    const [role, setRole] = useState('');

    const getUsersData = async () => {
        try {
            dispatch(showLoading())
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get('http://localhost:8081/auth/')
            dispatch(hideLoading())
            setDoctors(response.data.payload)
            console.log(doctors)
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
        getUsersData()
    }, [])

    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                <div className='d-flex'>
                    <h1 className='anchor'> Block</h1>
                </div>
            }
        },
    ]

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <h1 className='page-header'> Doctors List</h1>
                    <Table columns={columns} dataSource={doctors}/>
                </AdminLayout>
                
            ) : (
                <ModeratorLayout>
                    <h1 className='page-header'> Doctors List</h1>
                    <Table columns={columns} dataSource={doctors}/>
                </ModeratorLayout>
            )}
            
        </>
    )
}

export default DoctorsList