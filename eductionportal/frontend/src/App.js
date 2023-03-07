import React, {useContext} from 'react';
import './App.css';
import Login from './Components/Login';
import Header from './Components/Header';
import SignupForm from './Components/SignupForm';
import { Route, Routes } from "react-router-dom";
import AdminDashboard from './Components/AdminDashboard';
import AuthContext from './context/AuthProvider';
import Home from './Components/Home';
import LoginUser from './Components/LoginUser';
import SignupFormUser from './Components/SignupFormUser';
import UserDashboard from './Components/UserDashboard';
import EditStudent from './Components/EditStudent';
import Footer from './Components/Footer';
import {ToastContainer, toast } from 'react-toastify';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // toast.configure();

  const{auth, setTastFun, toastFun} = useContext(AuthContext);
  // setToastFun()
  // toast('hello')
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login_user' element={<LoginUser />} />
        <Route path='/login_admin' element={<Login />} />

        <Route path='/signup_user' element={<SignupFormUser/>} />
           {/* <Login /> */}
        <Route path='/signup_admin' element={<SignupForm />} />
        {/* <Route path='/course' element={<Course />} /> */}
        <Route path='/user_dashboard' element={<UserDashboard />} />
        <Route path='/admin_dashboard' element={<AdminDashboard />} />
        <Route path ='/edit_student/:id' element={<EditStudent />} />
        {/* <Route path='/editStudent' element={<AdminDashboard />} /> */}
      </Routes>
      <Footer />
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
