import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import Forum from './Forum';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/ForumCard.css';
// import { hideLoading, showLoading } from '../../redux/alertsSlice'
import { useDispatch} from 'react-redux'
import toast from 'react-hot-toast'
import { Button } from 'antd';
import '../../components/ForumCard.css'

function Home() {
    const [forumId, setforumId] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const onClick = () => {
    //     // <Forum forumId={1} onClick={onClick}> </Forum>
    //     navigate('/forum/+ forumId')
    // }

    return (
        <Layout>
            <h2>Forums</h2>
            <Link to='/createforum' >
                <button className='create-post'> Create Forum</button>
            </Link>
            
            <Link to='/forum' >
                <button className='create-post'> Category 1 </button>
            </Link>
            <hr />

            <div class="group-card">
                <div class="group-avatar">
                    {/* <!-- Group Avatar Image --> */}
                </div>
                <div class="group-info">
                    <h1 class="group-name">Group Name</h1>
                    <p class="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p class="group-members">Members: 100</p>
                </div>
            </div>
        </Layout>
    )
}

export default Home