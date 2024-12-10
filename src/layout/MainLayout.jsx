import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen  bg-gray-100'>
        <NavBar />
        <ToastContainer theme='dark'/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default MainLayout