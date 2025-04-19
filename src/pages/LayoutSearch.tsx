import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
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

  // Định dạng ngày cho TripTabs
  const formattedDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? format(departureDate, 'dd MMMM yyyy, EEE')
    : 'N/A';
  const formattedReturnDate = roundTrip && returnDate && !isNaN(returnDate.getTime())
    ? format(returnDate, 'dd MMMM yyyy, EEE')
    : null;

  // Định dạng ngày cho TrainSearchResults (giữ định dạng YYYY-MM-DD để lọc)
  const rawDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? departureDate.toISOString().split('T')[0]
    : '';

  console.log('Search params:', {
    from,
    to,
    departureDate: formattedDepartDate,
    returnDate: formattedReturnDate,
    passengers,
    roundTrip,
  });

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
      {from && to && rawDepartDate && (
        <>
          <TripTabs
            from={from}
            to={to}
            returnFrom={to}
            returnTo={from}
            departDate={formattedDepartDate}
            returnDate={formattedReturnDate}
            roundTrip={roundTrip}
          />
          <TrainSearchResults
      
          />
        </>
      )}
    </>
  );
};

export default LayoutSearch;