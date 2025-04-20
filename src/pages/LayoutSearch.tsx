import React, { useState, useEffect } from 'react'; // Thêm useEffect
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

  const [selectedOutboundTrip, setSelectedOutboundTrip] = useState<{ operator: string; departureTime: string } | null>(null);
  const [selectedReturnTrip, setSelectedReturnTrip] = useState<{ operator: string; departureTime: string } | null>(null); // Thêm state cho selectedReturnTrip
  const [tripDirection, setTripDirection] = useState<'outbound' | 'return'>('outbound');

  // Reset state khi searchParams thay đổi
  useEffect(() => {
    // Reset các state khi searchParams thay đổi (tức là người dùng tìm kiếm lại)
    setSelectedOutboundTrip(null);
    setSelectedReturnTrip(null);
    setTripDirection('outbound');
  }, [searchParams]); // Chạy lại mỗi khi searchParams thay đổi

  const formattedDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? format(departureDate, 'dd MMMM yyyy, EEE')
    : 'N/A';
  const formattedReturnDate = roundTrip && returnDate && !isNaN(returnDate.getTime())
    ? format(returnDate, 'dd MMMM yyyy, EEE')
    : null;

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
            selectedOutboundTrip={selectedOutboundTrip}
            selectedReturnTrip={selectedReturnTrip} // Truyền selectedReturnTrip
            setTripDirection={setTripDirection}
            tripDirection={tripDirection}
          />
          <TrainSearchResults
            setSelectedOutboundTrip={setSelectedOutboundTrip}
            setTripDirection={setTripDirection}
            tripDirection={tripDirection}
          />
        </>
      )}
    </>
  );
};

export default LayoutSearch;