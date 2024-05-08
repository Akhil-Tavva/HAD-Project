import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'
import {Toaster} from "react-hot-toast"

import Login from "./pages/Login";
import ForumDetailsPage from "./pages/Forum/ForumDetailsPage";
import Home from "./pages/Forum/Home";
import Notifications from "./pages/Notifications";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Doctor/Profile";
import Appointments from "./pages/Doctor/Appointments";
import AllDoctorsList from "./pages/Admin/AllDoctorsList";
import AllUsersList from "./pages/Admin/AllUsersList";
import Chats from "./pages/Chats"
import CreatePost from "./pages/Forum/CreatePost"
import AddDoctor from "./pages/Admin/AddDoctor";
import YourPosts from "./pages/Forum/YourPosts";
import ForgetPassword from './pages/ForgetPassword'
import UpdatePassword from './pages/UpdatePassword'
import CreateForum from "./pages/Forum/CreateForum";
import PostDetailsPage from "./pages/Forum/PostDetailsPage";
import Resources from "./pages/Doctor/Resources";
import DoctorsList from "./pages/Sr Doctor/DoctorList";
import UsersList from "./pages/Sr Doctor/UsersList";
import CreateModerator from "./pages/Moderator/Create Moderator";

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
        <Route path="/home" element={<Home/>}/>
        <Route path="/forum/:Forumname" element={<ForumDetailsPage />}/>
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/doctor/profile" element={<Profile />}/>
        <Route path="/srdoctor/profile" element={<Profile />}/>
        <Route path="/appointments-list" element={<Appointments />}/>
        <Route path="/all-doctors-list" element={<AllDoctorsList />}/> 
        <Route path="/all-users-list" element={<AllUsersList />}/>
        <Route path="/add-doctor" element={<AddDoctor />}/>
        <Route path="/chats" element={<Chats />}/>
        <Route path="/newpost" element={<CreatePost />}/>
        <Route path="/createforum" element={<CreateForum />}/>
        <Route path="/post/:postId" element={<PostDetailsPage />}/>
        <Route path="/yourposts" element={<YourPosts />}/>
        <Route path="/resources" element={<Resources />}/>
        <Route path="/doctors-list" element={<DoctorsList />}/>
        <Route path="/users-list" element={<UsersList />}/>
        <Route path="/create-moderator" element={<CreateModerator />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
