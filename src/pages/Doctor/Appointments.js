import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import SrLayout from '../../components/SrDoctorLayout';
import { Table, Button } from 'antd';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customHeaders, url } from '../../const';
import { MessageOutlined } from '@ant-design/icons'; // Import the chat icon
import { useNavigate } from 'react-router-dom';

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [role, setRole] = useState('');
    const [isAccepted, setIsAccepted] = useState(false)
    const [isAccepted1, setIsAccepted1] = useState(true)
    const [username, setUserName]=useState('');
    const navigate = useNavigate()
    const fetchData = async () => {
        try {
            const Userdetails = await AsyncStorage.getItem('Role');
            setRole(Userdetails);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get(url + '/appointment/get', { headers: customHeaders });
            toast.success(response.data.message);
            const responseData = response.data.payload
            console.log("Printing response data", responseData)
            await setAppointments(responseData);        
        } catch (error) {
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
                toast.error('Server Error: ' + error.response.data.message);
            } else if (error.request) {
                console.error('No response received:', error.request);
                toast.error('No response from server');
            } else {
                console.error('Error setting up request:', error.message);
                toast.error('Error setting up request');
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const approveAppointment = async (record, appointmentId) => {
        await setUserName(record.patient);
        console.log("record", record.patient);
        // await setIsAccepted(true);
        console.log('!!', isAccepted1);
        // Adding a timeout to wait for state update to complete
        try {
            await setUserName(record.patient);
            console.log('!!!', isAccepted1); 
            console.log('!!!printing username', username);   
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.post(url+`/appointment/approve/${appointmentId}`, {'isAccepted': isAccepted1}, { headers: customHeaders });
            toast.success(response.data.message);

            // Assuming you want to update the UI after approving
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.id === appointmentId) {
                    return { ...appointment, isAccepted:true };
                }
                return appointment;
            });
            console.log('Updated Appointments: ',updatedAppointments)
            setAppointments(updatedAppointments);

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const responseId = await axios.post(url+`/auth/getId`, {'username': record.patient}, { headers: customHeaders });
            responseId.headers = JSON.parse(JSON.stringify(responseId));
            const userId = responseId.data.payload
            const body = {id2: userId}
            console.log('User Id:', userId)
            addFriend(body);
            // console.log("Response:",responseId.data.pa)
            // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            
            // const response2 = await axios.post(url+`/api/helper/accept`, body, { headers: customHeaders });
            //console.log("Friend Added succefully");
        } catch (error) {
            console.error('Error approving appointment:', error.message);
            toast.error('Error approving appointment');
        }
    };

    const addFriend = async (body) => {
        try{
            console.log('Body :', body);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const responseId = await axios.post(url+`/api/helper/accept`, body, { headers: customHeaders });
            console.log("added response");
        }
        catch(error){
            console.error('Error adding:', error.message);
            toast.error('Error adding');
        }
        
    }

    const declineAppointment = async (record, appointmentId) => {
        // setIsAccepted(false)
        toast.success('Appointment Declined')
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            
            const response = await axios.post(url+`/appointment/approve/${appointmentId}`, {'isAccepted': isAccepted}, { headers: customHeaders });
            toast.success(response.data.message);
            // Assuming you want to update the UI after approving
            const updatedAppointments = appointments.map(appointment => {
                if (appointment.id === appointmentId) {
                    
                    return { ...appointment, isAccepted: true};
                }
                return appointment;
            });
            console.log('Updated Appointments: ',updatedAppointments)
            setAppointments(updatedAppointments);
        } catch (error) {
            console.error('Error approving appointment:', error.message);
            toast.error('Error approving appointment');
        }
    };

    const columns1 = [
        {
            title: 'Patient',
            dataIndex: 'patient',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>{moment(record.createdAt).format('DD-MM-YYYY')}</span>
            ),
        },
        {
            title: 'Appointment At',
            dataIndex: 'appointmentAt',
            render: (text, record) => (
                <span>{moment(record.appointmentAt).format('DD-MM-YYYY')}</span>
            ),
        },
        {
            title: 'Accepted At',
            dataIndex: 'acceptedAt',
            render: (text, record) => (
                record.isAccepted ? <span>{moment(record.acceptedAt).format('DD-MM-YYYY')}</span> : null
            ),
        },        
        {
            title: 'Approve',
            dataIndex: 'approve',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => approveAppointment(record, record.id)}
                    disabled={record.isAccepted}
                >
                    Approve
                </Button>
            ),
        },
        {
            title: 'Decline',
            dataIndex: 'decline',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => declineAppointment(record, record.id)}
                    disabled={record.isAccepted}
                >
                    Decline
                </Button>
            ),
        },
        {
            title: 'Chat',
            dataIndex: 'chat',
            render: (text, record) => (
                <Button
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={() =>  navigate('/chats')}
                    disabled={!record.isAccepted} // Disable if the appointment is not accepted
                />
            ),
        },
    ];

    return (
        <>
            {role === 'DOCTOR' ? (
                <Layout>
                    <h1 className='page-header'> </h1>
                    <Table columns={columns1} dataSource={appointments} />
                </Layout>
            ) : (
                <SrLayout>
                    <h1 className='page-header'> </h1>
                    <Table columns={columns1} dataSource={appointments} />
                </SrLayout>
            )}
        </>
    );
}

export default Appointments;
