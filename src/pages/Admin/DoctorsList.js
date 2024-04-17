import React, {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import Layout from '../../components/Layout'
import {showLoading, hideLoading} from '../../redux/alertsSlice'
import axios from 'axios'
import {Table} from 'antd'

function DoctorsList() {
    const [doctors, setDoctors] = React.useState([])
    const dispatch = useDispatch()
    const getUsersData = async() => {
        try{
            dispatch(showLoading())
            // const response = await axios.get('/api/admin/get-all-users', {}, {
            //     headers: {
            //         'Authorization' : `Bearer ${localStorage.getItem('token')}`
            //     }
            // })
            dispatch(hideLoading())
            // if(response.data.success){
            //     setDoctors(response.data.data)
            // }
        }catch(error){
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getUsersData()
    }, [])

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
        <Layout>
            <h1 className='page-header'> Doctors List</h1>
            <Table columns={columns} dataSource={doctors}/>
        </Layout>
    )
}

export default DoctorsList