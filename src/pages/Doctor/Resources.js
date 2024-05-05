import React, { useState } from 'react'
import { Form } from 'antd'
import Layout from '../../components/Layout'
import SrLayout from '../../components/SrDoctorLayout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import '../../Layout.css'
import axios from 'axios';
import { url } from '../../const'
import AsyncStorage from '@react-native-async-storage/async-storage'


function Resources() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [role, setRole] = useState('')
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)


    const onFinish = async (values) => {
        dispatch(showLoading())
        const response = await axios.post(url + '/', values)
        dispatch(hideLoading())
        navigate('/home')
    }

    // Function to handle form submission
    function submitResource() {
        const videoLink = document.getElementById('videoLink').value;

        // Extract YouTube video ID
        const videoId = extractYouTubeId(videoLink);

        // Validate YouTube video ID
        if (!videoId) {
            alert('Please enter a valid YouTube video link.');
            return;
        }

        // Here, you can perform further processing like sending the video ID to the server

        // For now, let's just log it
        console.log('YouTube video ID:', videoId);

        // Clear input field after submission
        document.getElementById('videoLink').value = '';
    }

    // Function to extract YouTube video ID from URL
    function extractYouTubeId(link) {
        // Regular expression to match YouTube video ID
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = link.match(regex);
        return match ? match[1] : null;
    }


    return (
        <>
            {role === 'DOCTOR' ? (
                <Layout>
                    <h2>Add Resource</h2>
                    {/* <p> For User Name: </p> */}
                    <Form onsubmit="submitResource(); return false;">
                        <label for="videoLink">YouTube Video Link:</label>
                        <input type="text" id="videoLink" class="input-field" placeholder="Enter YouTube video link" required />
                        <button type="submit" class="submit-button">Submit</button>
                    </Form>
                </Layout>
            ) : (
                <SrLayout>
                    <h2>Add Resource</h2>
                    {/* <p> For User Name: </p> */}
                    <Form onsubmit="submitResource(); return false;">
                        <label for="videoLink">YouTube Video Link:</label>
                        <input type="text" id="videoLink" class="input-field" placeholder="Enter YouTube video link" required />
                        <button type="submit" class="submit-button">Submit</button>
                    </Form>
                </SrLayout>
            )}
        </>
    )
}

export default Resources