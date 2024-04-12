import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import '../Layout.css'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import {Badge} from 'antd'

function Layout({children}) {
    const [collapsed, setCollapsed] = React.useState(false)
    const {user} = useSelector((state)=> state.user) 
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation();
    
    const doctorMenu = [
        {
            name: 'Forum',
            path: '/',
            icon: 'ri-home-line'
        },
        {
            name: 'Chats',
            path: '/doctor/chats',
            icon: 'ri-login-box-line'
        },
        {
            name: 'Video Call',
            path: '/video-call',
            icon: 'ri-login-box-line'
        },
        {
            name: 'Appointments List',
            path: '/doctor/appointments-list',
            icon: 'ri-file-list-line'
        },
        {
            name: 'Resources',
            path: '/resources',
            icon: 'ri-user-line'
        },
        
    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line'
        },
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
        {
            name: 'Profile',
            path: '/admin/profile',
            icon: 'ri-user-line'
        },
        {
            name: 'Add Doctor',
            path: '/add-doctor',
            icon: 'ri-login-box-line'
        },
    ];

    // const menuRendering = user?.isAdmin ? adminMenu : doctorMenu; // change here 
    const menuRendering = doctorMenu
    return (
        <div className='main p-2'>
            <div className='d-flex layout'>
                <div className='sidebar'>
                    <div className='sidebar-header'>
                        {!collapsed ? <h1 className='logo'>EMPATHEASE</h1> : <h1 className='logo'>EE</h1>}
                        <h1 className='role'> Doctor </h1>
                    </div>

                    <div className='menu'>
                        {menuRendering.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return (<div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                            );
                        })}
                        {/* <div className={`d-flex menu-item`} >
                                <i className='ri-logout-circle-line'></i>
                                {!collapsed && <Link to='/login'>Logout</Link>}
                        </div> */}
                    </div>
                </div>

                <div className='content'>
                    <div className='header'>
                        {collapsed ? <i className='ri-menu-2-fill header-action-icon' onClick={() => setCollapsed(false)}></i> : <i className='ri-close-fill header-action-icon' onClick={() => setCollapsed(true)}></i>}
                        
                        <div className='d-flex align-items-center px-4'>
                            <Badge count={1} onClick={() => navigate('/notifications')}>
                            {/* <Badge count = {user?.unseenNotifications.length} onClick={() => navigate('/notifications')}> */}
                                <i className='ri-notification-line header-action-icon px-2'></i>
                            </Badge>
                            
                            {/* when if we create a user or doctor then we it will directly visible here */}
                            <Link className='anchor mx-2' to='/doctor/profile'> Admin </Link> 

                            <i className='ri-logout-circle-line'></i>
                                {!collapsed && <Link className = "anchor mx-2" to='/login'> Logout </Link>}
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