import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { FormData, Trip, Coach, Seat } from "./Entity/Entity";
import HeaderSelectionPopup from "./Components/Popup/HeaderSeat";
import SeatSelection from "./Components/Popup/SeatSelection";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import BookingSearch from "./Components/BookingSearch";
import TripTabs from "./Components/TripTabs";
import HeaderSelection from "./Components/Popup/PopupSelectSeat";
import Breadcrumb from './Components/BreadCrumb';
import { LoginForm, SignupForm } from './Components/login/LoginSignup';
import LayoutSearch from './pages/LayoutSearch';
import HeroSection from './pages/HomePage';
import Layout from './pages/Layout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import DetailNewFeed from "./Components/DetailNewFeed";

const generateSeatData = (coach: string, type: string, availability: number): Seat[] => {
  const totalSeats = 64;
  const availableSeats = Math.min(availability, totalSeats);
  const seats: Seat[] = [];
  const isSeatCoach = coach.includes("Toa 1") || coach.includes("Toa 2");
  const isBedCoach = coach.includes("Toa 3") || coach.includes("Toa 4");
  const isLuxuryBedCoach = coach.includes("Toa 5") || coach.includes("Toa 6");

  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      seatNumber: isSeatCoach ? `${i}` : `G${i}`,
      isAvailable: i <= availableSeats,
      type: isSeatCoach ? "Ngồi mềm" : (isLuxuryBedCoach ? "Giường nằm VIP" : "Giường nằm"),
      compartment: isSeatCoach ? undefined : Math.ceil(i / 6),
      tier: isSeatCoach ? undefined : (i % 3 === 0 ? 3 : i % 3),
      price: isSeatCoach 
        ? 582000 
        : isLuxuryBedCoach 
          ? (i % 3 === 0 ? 906000 : i % 3 === 1 ? 856000 : 806000)
          : (i % 3 === 0 ? 756000 : i % 3 === 1 ? 706000 : 656000)
    });
  }

  return seats;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    departure: null,
    destination: null,
    departureDate: new Date(),
    returnDate: null,
    passengers: "1",
    roundTrip: false,
  

  });

  const [selectedOutboundTrip, setSelectedOutboundTrip] = useState<{
    operator: string;
    departureTime: string;
    seats: string[];
    departure: string;
    arrival: string;
    date: string;
    trainName: string;
    coach: string;
    pricePerSeat: number;
  } | null>(null);

  const [selectedReturnTrip, setSelectedReturnTrip] = useState<{
    operator: string;
    departureTime: string;
    seats: string[];
    departure: string;
    arrival: string;
    date: string;
    trainName: string;
    coach: string;
    pricePerSeat: number;
  } | null>(null);

  const [tripDirection, setTripDirection] = useState<"outbound" | "return">("outbound");

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
  };

  const handleTripSelect = (trip: Trip) => {
    console.log("Selected trip:", trip);
  };

  const handleCoachClick = (coach: string) => {
    console.log("Selected coach:", coach);
  };

  const handleSeatClick = (seatNumber: string) => {
    console.log("Selected seat:", seatNumber);
  };

  const handleBook = (selectedSeats: string[]) => {
    console.log("Booked seats:", selectedSeats);
  };

  const handleContinue = () => {
    console.log("Continue to next step");
  };

  const handleClose = () => {
    console.log("Close popup");
  };

  const coachData: Coach[] = [
    { 
      coach: "Toa 1", 
      type: "Ngồi mềm điều hòa", 
      availability: 10, 
      price: 582000,
      description: "Ghế ngồi mềm, có điều hòa, khoảng cách rộng rãi",
      amenities: ["Điều hòa", "Ghế mềm", "Khoảng cách rộng"]
    },
    { 
      coach: "Toa 2", 
      type: "Ngồi mềm điều hòa", 
      availability: 15, 
      price: 582000,
      description: "Ghế ngồi mềm, có điều hòa, khoảng cách rộng rãi",
      amenities: ["Điều hòa", "Ghế mềm", "Khoảng cách rộng"]
    },
    { 
      coach: "Toa 3", 
      type: "Giường nằm điều hòa", 
      availability: 20, 
      price: 656000,
      description: "Giường nằm 3 tầng, có điều hòa, chăn gối",
      amenities: ["Điều hòa", "Giường nằm", "Chăn gối", "Nước uống"]
    },
    { 
      coach: "Toa 4", 
      type: "Giường nằm điều hòa", 
      availability: 18, 
      price: 656000,
      description: "Giường nằm 3 tầng, có điều hòa, chăn gối",
      amenities: ["Điều hòa", "Giường nằm", "Chăn gối", "Nước uống"]
    },
    { 
      coach: "Toa 5", 
      type: "Giường nằm VIP", 
      availability: 12, 
      price: 806000,
      description: "Giường nằm VIP 3 tầng, có điều hòa, chăn gối cao cấp",
      amenities: ["Điều hòa", "Giường nằm VIP", "Chăn gối cao cấp", "Nước uống", "Khăn lạnh"]
    },
    { 
      coach: "Toa 6", 
      type: "Giường nằm VIP", 
      availability: 12, 
      price: 806000,
      description: "Giường nằm VIP 3 tầng, có điều hòa, chăn gối cao cấp",
      amenities: ["Điều hòa", "Giường nằm VIP", "Chăn gối cao cấp", "Nước uống", "Khăn lạnh"]
    }
  ];

  const selectedCoach = coachData[0];
  const seatData = generateSeatData(selectedCoach.coach, selectedCoach.type, selectedCoach.availability);

  return (
    
    <div className="min-h-screen bg-gray-100">
      <Header/>
      
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/train-booking" element={<Layout />} />
        <Route path="/train-search-results" element={<LayoutSearch />} />
        <Route path="/detail-new-feed/:id" element={<DetailNewFeed />} />
        <Route path="/header-selection"
          element={
            <HeaderSelectionPopup
              departure="Ga Hà Nội"
              arrival="Ga Đà Nẵng"
              date="10/04/2025"
              trainName="SE19: VIP 2X - Private Twin-bed Cabin"
              Coach={coachData}
              onCoachClick={handleCoachClick}
            />
          }
        />
        <Route
          path="/1"
          element={
            <SeatSelection
              coach={selectedCoach}
              seats={seatData}
              onSeatClick={handleSeatClick}
              totalAvailableSeats={selectedCoach.availability}
              onBook={handleBook}
              onContinue={handleContinue}
              departure="Ga Hà Nội"
              arrival="Ga Đà Nẵng"
              date="10/04/2025"
              trainName="SE19: VIP 2X - Private Twin-bed Cabin"
              tripDirection="outbound"
              roundTrip={false}
              selectedOutboundTrip={selectedOutboundTrip}
              selectedReturnTrip={selectedReturnTrip}
            />
          }
        />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
