import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AdminLayout from '../../components/AdminLayout'
import Forum from '../Forum/Forum';
import { Link, useNavigate } from 'react-router-dom';
import '../../components/PostCard.css'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import { useDispatch} from 'react-redux' 
import toast from 'react-hot-toast'
import { Button } from 'antd';
import ForumCard from '../../components/ForumCard';


function Home() {
    const [forumId, setforumId] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGroupCardClick = () => {
        // Navigate to the Forum page
        navigate('/forum');
    };

    return (
        <AdminLayout>
            {/* <h2>Forums</h2> */}
            <Link to='/createforum' >
                <button className='create-post'> Create Forum</button>
            </Link>
            
            <Link to='/deleteallforums' >
                <button className='create-post'> Delete All Forums</button>
            </Link>
            <hr />
            
            <ForumCard />
            <ForumCard />
            <ForumCard />
            <ForumCard />

        </AdminLayout>
    )
}

export default Home