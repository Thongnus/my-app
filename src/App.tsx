import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Layout from './Page/Layout';
import BookingSearch from './Components/BookingSearch';
import Breadcrumb from './Components/BreadCrumb';
import TripTabs from './Components/TripTabs';
import TrainBookingForm from './Components/TrainBookingForm';
import TrainSearchResults from './Components/TrainSearchResults';
import Titlelogin from './Components/login/Titlelogin';
import LoginSignup from './Components/login/Titlelogin';


const App: React.FC = () => {
  const [from, setFrom] = useState("Hà Nội");
  const [fromCode, setFromCode] = useState("HNO");
  const [to, setTo] = useState("Lào Cai");
  const [toCode, setToCode] = useState("LCA");
  return (
    <>
   {/* <Layout/> */}
   <Header/>
   <LoginSignup/>
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
