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
      <Header />
      <Link to="/loginsignup" className="text-blue-600 hover:underline">
                    Đi đến Đăng Nhập / Đăng Ký
                </Link>
    </div>
  )
}

export default Layout