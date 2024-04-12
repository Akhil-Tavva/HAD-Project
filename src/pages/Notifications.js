import React from 'react'
import Layout from '../components/Layout'
import {Tabs} from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertsSlice'

// Have to do this Remeber
function Notifications() {
    const {user} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const markAllAsSeen = async(values) => {
        try{
            dispatch(showLoading())
            // const response = await axios.post('/api/user/login', values); // have to change axios link
            dispatch(hideLoading())
            navigate("/");
            // if(response.data.success){
            //     toast.success(response.data.message);
            //     toast("Redirecting to home page");
            //     localStorage.setItem("token", response.data.data);
            //     navigate("/");
            // }
            // else{
            //     toast.error(response.data.message);
            // }
        }catch(error){
            // toast.error("Something went wrong");
        }
    }

    return (
        <Layout>
            <h1 className='page-title'> Notifications </h1>

            <Tabs>
                <Tabs.Tabpane tab='Unseen' key={0}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor'>Mark all as seen</h1>
                    </div>

                    {/* {user.unseenNotifications.map((notification) => (
                        <div className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className='card-text'> {notification.message} </div>
                        </div>
                    ))} */}
                </Tabs.Tabpane>
                <Tabs.Tabpane tab='Seen' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor'>Delete all</h1>
                    </div>
                </Tabs.Tabpane>
            </Tabs>
        </Layout>
    )
}

export default Notifications