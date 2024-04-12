import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import Layout from '../../components/Layout'
import {showLoading, hideLoading} from '../../redux/alertsSlice'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {Table} from 'antd'
// import moment from 'moment'

function Appointments() {
    const [appointments, setAppointments] = useState([])
    const dispatch = useDispatch()
    const getAppointmentsData = async() => {
        try{
            dispatch(showLoading())
            // 
            dispatch(hideLoading())
        }catch(error){
            dispatch(hideLoading())
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id'
        },
        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phoneNumber} 
                </span>
            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            // render: (text, record) => (
            //     <span>
            //         {moment(record.date).format('DD-MM-YYYY')} {moment(record.time).format('DD-MM-YYYY')}
            //     </span>
            // ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
        }
    ]
    useEffect(() => {
        getAppointmentsData()
    }, []);
    
    return (
        <Layout>
            <h1 className='page-header'> </h1>
            <Table columns={columns} dataSource={appointments}> </Table>
        </Layout>
    )
}

export default Appointments