import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ModeratorLayout from '../../components/ModeratorLayout'
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import { Table,Button } from 'antd'
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AdminLayout from '../../components/AdminLayout'


function UsersList() {
    const [users, setUsers] = React.useState([])
    const dispatch = useDispatch()
    const [role, setRole] = useState('');

    const getUsersData = async() => {
        try {
            dispatch(showLoading())
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get('http://localhost:8081/auth/')
            dispatch(hideLoading())
            setUsers(response.data.payload)
            console.log(users)
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

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: 'Email',
    //         dataIndex: 'email',
    //     },
    //     // Review Chats of user
    //     // No of the time he has been blocked from start
    //     // No of the time he has been blocked at now
    //     // 
    //     {
    //         title: 'Chat Review', // this should directly link to the chat of user
    //         dataIndex: 'chat-review',
    //     },
    //     {
    //         title: 'Blocked by Users from start',
    //         dataIndex: 'block-by-users-start',
    //     },
    //     {
    //         title: 'Blocked by Users now',
    //         dataIndex: 'block-by-users-now',
    //         render: (text, record) => {
    //             <div className='d-flex'>
    //                 <h1 className='anchor'> Block</h1>
    //             </div>
    //         }
    //     },
    // ]

    const handleBlockUser = (userId) => {
        // Add logic to block user with userId
        console.log('Blocking user with ID:', userId);
    };

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
            title: 'Chat Review',
            dataIndex: 'chat-review',
            render: (text, record) => (
                <Button type="link" onClick={() => console.log('Viewing chat of user:', record.name)}>View</Button>
            ),
        },
        {
            title: 'Blocked by Users from start',
            dataIndex: 'block-by-users-start',
        },
        {
            title: 'Blocked by Users now',
            dataIndex: 'block-by-users-now',
            // render: (text, record) => (
            //     <Button type="primary" onClick={() => handleBlockUser(record.id)}>Block</Button>
            // ),
        },
    ];

    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    useEffect(() => {
        getUsersData()
    }, [])

    const sampleData = [
        {
            "name": "John Doe",
            "email": "john@example.com",
            "chat-review": "Link to chat review",
            "block-by-users-start": 2,
            "block-by-users-now": 1
        },
        {
            "name": "Jane Smith",
            "email": "jane@example.com",
            "chat-review": "Link to chat review",
            "block-by-users-start": 0,
            "block-by-users-now": 0
        },
        {
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "chat-review": "Link to chat review",
            "block-by-users-start": 5,
            "block-by-users-now": 3
        }
    ];


    // useEffect(() => {
    //     // Fetch user role when the component mounts
    //     AsyncStorage.getItem('Role')
    //         .then((res) => {
    //             setRole(res);
    //             console.log('User Role:', res);
    //         })
    //         .catch((error) => console.error('Error fetching user role:', error));
    // }, []);

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <h1 className='page-header'> Users List</h1>
                    <Table columns={columns} dataSource={sampleData}/>
                </AdminLayout>
            ) : (
                <ModeratorLayout>
                    <h1 className='page-header'> Users List</h1>
                    <Table columns={columns} dataSource={sampleData}/>
                </ModeratorLayout>
            )}            
        </>
    )
}

export default UsersList