import React, {useState, useEffect} from 'react'
// import {useDispatch} from 'react-redux'
import Layout from '../../components/Layout'
// import {showLoading, hideLoading} from '../../redux/alertsSlice'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {Table} from 'antd' 
import moment from 'moment'
import {url} from '../../const'


function Appointments() {
    const [appointments, setAppointments] = useState([])
    // const dispatch = useDispatch()
    const getData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            // const response = await axios.get('http://localhost:8080/forum/')
            const response = await axios.get(url+'/forum/');
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

    const columns = [
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

    
    return (
        <Layout>
            <h1 className='page-header'> </h1>
            <Table columns={columns} dataSource={appointments}> </Table>
        </Layout>
    )
}

export default Appointments