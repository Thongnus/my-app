import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import HeroSection from './HeroSection'
import TrainBookingForm from './TrainBookingForm'



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