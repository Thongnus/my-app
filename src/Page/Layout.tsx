import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HeroSection from './HeroSection'
import TrainBookingForm from '../Components/TrainBookingForm'



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