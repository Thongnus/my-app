import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import TrainBookingForm from '../Components/TrainBookingForm'
import React from 'react'
import HeroSection from '../pages/HeroSection'


const Layout = () => {
  return (
    
    <div className="layout">
         <Header/>
         <HeroSection/>
         <Footer/>
    </div>
  )
}

export default Layout