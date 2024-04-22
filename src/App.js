import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'
import {Toaster} from "react-hot-toast"

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forum from "./pages/Forum/Forum";
import Home from "./pages/Forum/Home";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Doctor/Profile";
import Appointments from "./pages/Doctor/Appointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import UsersList from "./pages/Admin/UsersList";
import Chats from "./pages/Chats";
import CreatePost from "./pages/Forum/CreatePost";
import PostDetails from "./components/PostDetails";
import AddDoctor from "./pages/Admin/AddDoctor";
import YourPosts from "./pages/Forum/YourPosts";
import ModeratorHome from './pages/Moderator/ModeratorHome'
import AdminHome from './pages/Admin/AdminHome'
import ForgetPassword from './pages/ForgetPassword'
import UpdatePassword from './pages/UpdatePassword'
import CreateForum from "./pages/Forum/CreateForum";

function App() {
  const {loading} = useSelector(state => state.alerts); // change intial state loading as true in alertsSlice.js file to get spinner
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status">
          
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false}/>
      
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/ForgetPassword" element={<ForgetPassword />}/>
        <Route path="/UpdatePassword" element={<UpdatePassword />}/>
        <Route path="/doctor" element={<Home/>}/>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/moderator" element={<ModeratorHome />}/>
        <Route path="/forum" element={<Forum/>}/>
        {/* <Route path="/admin/forum" element={<Forum/>}/> */}
        {/* <Route path="/app" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>}/> */}
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/doctor/profile" element={<Profile />}/>
        <Route path="/admin/profile" element={<Profile />}/>
        <Route path="/doctor/appointments-list" element={<Appointments />}/>
        <Route path="/admin/doctors-list" element={<DoctorsList />}/>
        <Route path="/admin/users-list" element={<UsersList />}/>
        <Route path="/admin/add-doctor" element={<AddDoctor />}/>
        <Route path="/moderator/doctors-list" element={<DoctorsList />}/>
        <Route path="/moderator/users-list" element={<UsersList />}/>
        <Route path="/moderator/add-doctor" element={<AddDoctor />}/>
        <Route path="/doctor/chats" element={<Chats />}/>
        {/* <Route path="/admin/chats" element={<Chats />}/> */}
        <Route path="/newpost" element={<CreatePost />}/>
        <Route path="/createforum" element={<CreateForum />}/>
        <Route path="/post/id" element={<PostDetails />}/>
        <Route path="/yourposts" element={<YourPosts />}/>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
