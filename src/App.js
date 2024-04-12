import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Notifications from "./pages/Notifications";
import {useSelector} from 'react-redux'

import {Toaster} from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Doctor/Profile";
import Appointments from "./pages/Doctor/Appointments";
import DoctorsList from "./pages/Admin/DoctorsList";
import UsersList from "./pages/Admin/UsersList";
import Chats from "./pages/Chats";

function App() {
  const {loading} = useSelector(state => state.alerts); // change intial state loading as true in alertsSlice.js file to get spinner
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status">
          
          </div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false}/>
      
      <Routes>
        <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}/>
        <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
        {/* <Route path="/" element={<ProtectedRoute>  <Home /> </ProtectedRoute>}/> */}
        <Route path="/" element={<Posts/>}/>
        {/* <Route path="/app" element={<ProtectedRoute> <Notifications /> </ProtectedRoute>}/> */}
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/doctor/profile" element={<Profile />}/>
        <Route path="/doctor/appointments-list" element={<Appointments />}/>
        <Route path="/admin/doctors-list" element={<DoctorsList />}/>
        <Route path="/admin/users-list" element={<UsersList />}/>
        <Route path="/doctor/chats" element={<Chats />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
