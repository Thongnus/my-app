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




const App: React.FC = () => {
  const [from, setFrom] = useState("Hà Nội");
  const [fromCode, setFromCode] = useState("HNO");
  const [to, setTo] = useState("Lào Cai");
  const [toCode, setToCode] = useState("LCA");
  return (
    <>
   {/* <Layout/> */}
   <Header/>
   <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/train-booking" element={<Layout />} />
                <Route path="/train-search-results" element={<LayoutSearch />} />
            </Routes>
   {/* <Layout/> */}
   <Footer/>
   {/* <TrainBookingForm/> */}
      {/* <BookingSearch/>
      <Breadcrumb  from={from} fromCode={fromCode} to={to} toCode={toCode} />
      <TripTabs/>
      <TrainSearchResults />
    // <Footer/> */}
     </>
  );
};

export default App;
