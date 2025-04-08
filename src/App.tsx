import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Layout from './Page/Layout';
import BookingSearch from './Components/BookingSearch';
import Breadcrumb from './Components/BreadCrumb';
import TripTabs from './Components/TripTabs';

const App: React.FC = () => {
  const [from, setFrom] = useState("Hà Nội");
  const [fromCode, setFromCode] = useState("HNO");
  const [to, setTo] = useState("Lào Cai");
  const [toCode, setToCode] = useState("LCA");
  return (
    <>
   {/* <Layout/> */}
   <Header/>
      <BookingSearch/>
      <Breadcrumb  from={from} fromCode={fromCode} to={to} toCode={toCode} />
      <TripTabs/>
     </>
  );
};

export default App;
