import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AdminLayout from '../../components/AdminLayout'
import ModeratorLayout from '../../components/ModeratorLayout'
import SeniorDoctorLayout from '../../components/Layout'
import '../../components/PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Home() {
    const navigate = useNavigate();
    const [role, setRole] = useState('');

    // Handle the click event on the group card
    const handleGroupCardClick = () => {
        // Navigate to the Forum page
        navigate('/forum');
    };

    const Userdetails = AsyncStorage.getItem('User Details');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)
    return (
        // <>
        //     {role === 'ADMIN' ? (
        //         <AdminLayout>
        //             {/* Content for admin role */}
        //             <h2>Forums</h2>
        //             <Link to='/createforum'>
        //                 <button className='create-post'>Create Forum</button>
        //             </Link>
        //             <Link to='/forum'>
        //                 <button className='create-post'>Category 1</button>
        //             </Link>
        //             <hr />
        //             <Link to='/forum' onClick={handleGroupCardClick} className="link-no-outline">
        //                 <div className="group-card">
        //                     {/* Group Card Content */}
        //                 </div>
        //                 <div className="group-info">
        //                     <h1 className="group-name">Group Name</h1>
        //                     <p className="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //                     <p className="group-members">Members: 100</p>
        //                 </div>
        //             </Link>
        //         </AdminLayout>
        //     ) : role === 'SENIOR_DOCTOR' ? (
        //         <SeniorDoctorLayout>
        //             <h2>Forums</h2>
        //             <Link to='/createforum'>
        //                 <button className='create-post'>Create Forum</button>
        //             </Link>
        //             <Link to='/forum'>
        //                 <button className='create-post'>Category 1</button>
        //             </Link>
        //             <hr />
        //             <Link to='/forum' onClick={handleGroupCardClick} className="link-no-outline">
        //                 <div className="group-card">
        //                     <div className="group-card">
        //                         {/* Group Card Content */}
        //                     </div>
        //                     <div className="group-info">
        //                         <h1 className="group-name">Group Name</h1>
        //                         <p className="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //                         <p className="group-members">Members: 100</p>
        //                     </div>
        //                 </div>
        //             </Link>

        //         </SeniorDoctorLayout>
        //     ) : role === 'MODERATOR' ? ( 
        //         <ModeratorLayout>
        //             <h2>Forums</h2>
        //             <Link to='/createforum'>
        //                 <button className='create-post'>Create Forum</button>
        //             </Link>
        //             <Link to='/forum'>
        //                 <button className='create-post'>Category 1</button>
        //             </Link>
        //             <hr />
        //             <Link to='/forum' onClick={handleGroupCardClick} className="link-no-outline">
        //                 <div className="group-card">
        //                     <div className="group-card">
        //                         {/* Group Card Content */}
        //                     </div>
        //                     <div className="group-info">
        //                         <h1 className="group-name">Group Name</h1>
        //                         <p className="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //                         <p className="group-members">Members: 100</p>
        //                     </div>
        //                 </div>
        //             </Link>
        //         </ModeratorLayout>
        //     ) : (
        //         <Layout>
        //             <h2>Forums</h2>
        //             <Link to='/createforum'>
        //                 <button className='create-post'>Create Forum</button>
        //             </Link>
        //             <Link to='/forum'>
        //                 <button className='create-post'>Category 1</button>
        //             </Link>
        //             <hr />
        //             <Link to='/forum' onClick={handleGroupCardClick} className="link-no-outline">
        //                 <div className="group-card">
        //                     <div className="group-card">
        //                         {/* Group Card Content */}
        //                     </div>
        //                     <div className="group-info">
        //                         <h1 className="group-name">Group Name</h1>
        //                         <p className="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //                         <p className="group-members">Members: 100</p>
        //                     </div>
        //                 </div>
        //             </Link>
        //         </Layout>
        //     )}
        // </>
        <Layout>
            <h2>Forums</h2>
            <Link to='/createforum' >
                <button className='create-post'> Create Forum</button>
            </Link>
            
            <Link to='/deleteallforums' >
                <button className='create-post'> Delete All Forums</button>
            </Link>
            <hr />

            <div class="group-card" onClick={handleGroupCardClick}>
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
    );
}

export default Home;