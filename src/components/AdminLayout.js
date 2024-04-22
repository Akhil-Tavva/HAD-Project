import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../Layout.css'
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { Badge, Button } from 'antd'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { hideLoading, showLoading } from '../redux/alertsSlice';
import axios from 'axios'

function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = React.useState(false)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    // const [role, setRole] = useState(null);
    // const [MenuRendering, setMenuRendering] = useState(null);

    const adminMenu = [
        {
            name: 'Home',
            path: '/admin',
            icon: 'ri-home-line'
        },
        // {
        //     name: 'Chats',
        //     path: '/admin/chats',
        //     icon: 'ri-chat-1-fill'
        // },
        {
            name: 'Users',
            path: '/admin/users-list',
            icon: 'ri-user-line'
        },
        {
            name: 'Doctors',
            path: '/admin/doctors-list',
            icon: 'ri-user-star-line'
        },
        // {
        //     name: 'Profile',
        //     path: '/admin/profile',
        //     icon: 'ri-user-line'
        // },
        {
            name: 'Add Doctor',
            path: '/admin/add-doctor',
            icon: 'ri-login-box-line'
        },
    ];

    const handleLogout = async () => {
        console.log('1')
        await AsyncStorage.clear();
        console.log("2");
        navigate('/')
    }

    const AdminmenuRendering = adminMenu

    return (
        <div className='main p-2'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        {!collapsed ? <h1 className='logo'>EMPATHEASE</h1> : <h1 className='logo'>EE</h1>}
                        <h1 className='role'> Admin </h1>
                    </div>

                    <div className='menu'>
                        {AdminmenuRendering.map((menu, index) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div key={index} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}
                    </div>
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
                            <Link className='anchor mx-2' to='/admin/profile'> Admin</Link>
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

export default AdminLayout

