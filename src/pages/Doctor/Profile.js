import React,{useState} from 'react'
import Layout from '../../components/Layout'
import AdminLayout from '../../components/AdminLayout'
import DoctorForm from '../../components/DoctorForm'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { showLoading } from '../../redux/alertsSlice'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Profile() {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [role, setRole] = useState('');

    const onFinish = async () => {
        try {
            dispatchEvent(showLoading());
            const response = await axios.post()
        } catch (error) {

        }
    };
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <h1 className='page-title'> Doctor profile</h1>
                    <hr />
                    <DoctorForm onFinish={onFinish} />
                </AdminLayout>

            ) : (
                <Layout>
                    <h1 className='page-title'> Doctor profile</h1>
                    <hr />
                    <DoctorForm onFinish={onFinish} />
                </Layout>
            )}

        </>
    )
}

export default Profile