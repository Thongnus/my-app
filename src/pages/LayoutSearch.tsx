import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingSearch from '../Components/BookingSearch';
import TripTabs from '../Components/TripTabs';
import TrainSearchResults from '../Components/TrainSearchResults';

const LayoutSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || '';
  const to = searchParams.get("to") || '';
  const departureDate = new Date(searchParams.get("departureDate") || '');
  const returnDate = new Date(searchParams.get("returnDate") || '');
  const passengers = searchParams.get("passengers")?.toString() ?? '';
  const roundTrip = searchParams.get("roundTrip") === "true";

  console.log(searchParams);

  return (
    <>
      <BookingSearch
        from={from}
        to={to}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={passengers}
        roundTrip={roundTrip}
      />
      <TripTabs />
      <TrainSearchResults />
    </>
  );
};

export default LayoutSearch;