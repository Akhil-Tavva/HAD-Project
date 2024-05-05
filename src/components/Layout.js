import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Layout.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from 'antd'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Layout({ children }) {
    const [collapsed, setCollapsed] = React.useState(false)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    // const [role, setRole] = useState(null);
    // const [MenuRendering, setMenuRendering] = useState(null);

    const doctorMenu = [
        {
            name: 'Home',
            path: '/home',
            icon: 'ri-home-line'
        },
        {
            name: 'Chats',
            path: '/chats',
            icon: 'ri-chat-1-fill'
        },
        // {
        //     name: 'Video Call',
        //     path: '/video-call',
        //     icon: 'ri-video-chat-line'
        // },
        { 
            name: 'Appointments List',
            path: '/appointments-list',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Resources',
            path: '/resources',
            icon: 'ri-database-line'
        },
        // {
        //     name: 'Add Doctor',
        //     path: '/add-doctor',
        //     icon: 'ri-login-box-line'
        // },

    ];

    // const SeniordoctorMenu = [
    //     {
    //         name: 'Forum',
    //         path: '/',
    //         icon: 'ri-home-line'
    //     },
    //     {
    //         name: 'Chats',
    //         path: '/doctor/chats',
    //         icon: 'ri-chat-1-fill'
    //     },
    //     {
    //         name: 'Video Call',
    //         path: '/video-call',
    //         icon: 'ri-video-chat-line'
    //     },
    //     {
    //         name: 'Appointments List',
    //         path: '/doctor/appointments-list',
    //         icon: 'ri-file-list-line'
    //     },
    //     {
    //         name: 'Resources',
    //         path: '/resources',
    //         icon: 'ri-database-line'
    //     },

    // ];

    // const adminMenu = [
    //     {
    //         name: 'Home',
    //         path: '/',
    //         icon: 'ri-home-line'
    //     },
    //     {
    //         name: 'Users',
    //         path: '/admin/users-list',
    //         icon: 'ri-user-line'
    //     },
    //     {
    //         name: 'Doctors',
    //         path: '/admin/doctors-list',
    //         icon: 'ri-user-star-line'
    //     },
    //     {
    //         name: 'Profile',
    //         path: '/admin/profile',
    //         icon: 'ri-user-line'
    //     },
    //     {
    //         name: 'Add Doctor',
    //         path: '/add-doctor',
    //         icon: 'ri-login-box-line'
    //     },
    // ];

    // const moderatorMenu = [
    //     {
    //         name: 'Home',
    //         path: '/',
    //         icon: 'ri-home-line'
    //     },
    //     {
    //         name: 'Users',
    //         path: '/admin/users-list',
    //         icon: 'ri-user-line'
    //     },
    //     {
    //         name: 'Doctors',
    //         path: '/admin/doctors-list',
    //         icon: 'ri-user-star-line'
    //     },
    //     {
    //         name: 'Profile',
    //         path: '/admin/profile',
    //         icon: 'ri-user-line'
    //     },
    //     {
    //         name: 'Add Doctor',
    //         path: '/add-doctor',
    //         icon: 'ri-login-box-line'
    //     },
    // ];

    const handleLogout = async () => {
        console.log("1");
        
        await AsyncStorage.clear();
        console.log("2");
        navigate('/')
    }

    // const menuRendering = user?.isAdmin ? adminMenu : doctorMenu; // change here 
    // const Userdetails = AsyncStorage.getItem('User Details')
    // console.log('Getting user details:',Userdetails)
    // async function someFunction() {
    //     await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    // }
    // someFunction()

    // CHANGE THIS IN LOGIN FILE TO MAKE IT EASY
    // useEffect(() => {
    //     // console.log(role);
    //     // if (role !== null && menuRendering === null) {
    //     //     switch (role) {
    //     //         case 'ADMIN':
    //     //             setMenuRendering(doctorMenu) // TEMP SETTING MENU RENDERING AS DOCTOR
    //     //             break
    //     //         case 'MODERATOR':
    //     //             setMenuRendering(moderatorMenu)
    //     //             break
    //     //         case 'SENIOR_DOCTOR':
    //     //             setMenuRendering(SeniordoctorMenu)
    //     //             break
    //     //         default:
    //     //             setMenuRendering(doctorMenu)
    //     //     }
    //         // if(role === 'ADMIN'){
    //         //     setMenuRendering(doctorMenu)
    //         // }
    //         // else if(role === 'MODERATOR'){
    //         //     setMenuRendering(moderatorMenu)
    //         // }
    //         // else if(role === 'SENIOR_DOCTOR'){
    //         //     setMenuRendering(SeniordoctorMenu)
    //         // }
    //         // else{
    //         //     setMenuRendering(doctorMenu)
    //         // }
    //         // setMenuRendering(adminMenu)
    // }, [role, menuRendering])
    // setMenuRendering(adminMenu)

    const DoctormenuRendering = doctorMenu

    return (
        <div className='main p-2'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        {!collapsed ? <h1 className='logo'>EMPATHEASE</h1> : <h1 className='logo'>EE</h1>}
                        <h1 className='role'> Doctor </h1>
                    </div>

                    {DoctormenuRendering ? (
                        <div className='menu'>
                            {DoctormenuRendering.map((menu, index) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div key={index} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                        <i className={menu.icon}></i>
                                        {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                    </div>
                                );
                            })}
                        </div>
                    ) : undefined}

                </div>

                <div className='content'>
                    <div className='header'>
                        {collapsed ? <i className='ri-menu-2-fill header-action-icon' onClick={() => setCollapsed(false)}></i> : <i className='ri-close-fill header-action-icon' onClick={() => setCollapsed(true)}></i>}

                        <div className='d-flex align-items-center px-4'>
                            <Badge count={0} onClick={() => navigate('/notifications')}>
                                {/* <Badge count = {user?.unseenNotifications.length} onClick={() => navigate('/notifications')}> */}
                                <i className='ri-notification-line header-action-icon px-2'></i>
                            </Badge>

                            {/* when if we create a user or doctor then we it will directly visible here */}
                            <Link className='anchor mx-2' to='/doctor/profile'> Doctor</Link>

                            <Button className="anchor mx-2" onClick={handleLogout}>Logout </Button>
                        </div>
                    </div>

                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout

