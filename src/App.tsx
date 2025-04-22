import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

import BookingSearch from './Components/BookingSearch';
import Breadcrumb from './Components/BreadCrumb';
import TripTabs from './Components/TripTabs';
import TrainBookingForm from './Components/TrainBookingForm';
import TrainSearchResults from './Components/TrainSearchResults';
import Footer from './Components/Footer';
import Layout from './pages/Layout';
import Header from './Components/Header';
import { LoginForm, SignupForm } from './Components/login/LoginSignup';
import LayoutSearch from './pages/LayoutSearch';
import HeaderSelection from './Components/Popup/PopupSelectSeat';

import SeatSelection from './Components/Popup/SeatSelection';
import HeroSection from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';







const App: React.FC = () => {
  
  return (
    <>
   {/* <Layout/> */}
   <Header/>

   
   <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/train-booking" element={<Layout />} />
                <Route path="/train-search-results" element={<LayoutSearch />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path ="/train-selection" element={<HeaderSelection departure={''} arrival={''} date={''} trainName={''} seatTypes={[]} onCoachClick={function (coach: string): void {
          throw new Error('Function not implemented.');
        } } />} />
                <Route path ="/1" element={   <SeatSelection coach={''} seats={[]}/>} />
            </Routes>
   <Footer/>
  
     </>
  );
};

export default App;
