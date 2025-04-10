import React, { useState } from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

import BookingSearch from '../Components/BookingSearch';
import Breadcrumb from '../Components/BreadCrumb';
import TripTabs from '../Components/TripTabs';
import TrainSearchResults from '../Components/TrainSearchResults';


const LayoutSearch: React.FC = () => {
  const [from, setFrom] = useState("Hà Nội");
  const [fromCode, setFromCode] = useState("HNO");
  const [to, setTo] = useState("Lào Cai");
  const [toCode, setToCode] = useState("LCA");
  return (
    <>
   {/* <Layout/> */}
  
      <BookingSearch/>
      <TripTabs/>
      <TrainSearchResults/>
     </>
  );
};

export default LayoutSearch;
