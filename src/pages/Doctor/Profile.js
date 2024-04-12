import React from 'react'
import Layout from '../../components/Layout'
import DoctorForm from '../../components/DoctorForm'
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
import { showLoading } from '../../redux/alertsSlice'
import axios from 'axios'

function Profile() {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async() => {
        try{
            dispatchEvent(showLoading());
            const response = await axios.post()
        }catch(error){

        }
    };
    return (
        <Layout>
            <h1 className='page-title'> Doctor profile</h1>
            <hr />
            <DoctorForm onFinish={onFinish}/>
        </Layout>
    )
}

export default Profile