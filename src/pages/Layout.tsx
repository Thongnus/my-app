import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HeroSection from './HeroSection'
import TrainBookingForm from '../Components/TrainBookingForm'
import { Link } from 'react-router-dom'



const Layout = () => {
  return (
    
    <div className="layout">
         <HeroSection/>
    </div>
  )
}

export default Layout