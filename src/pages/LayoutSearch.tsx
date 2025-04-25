import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import BookingSearch from '../Components/BookingSearch';
import TripTabs from '../Components/TripTabs';
import TrainSearchResults from '../Components/TrainSearchResults';
import { SelectedTrip } from '../Entity/Entity';

// Component chính hiển thị trang kết quả tìm kiếm
const LayoutSearch: React.FC = () => {
  // Lấy thông tin từ URL
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || '';
  const to = searchParams.get("to") || '';
  const departureDate = new Date(searchParams.get("departureDate") || '');
  const returnDate = new Date(searchParams.get("returnDate") || '');
  const passengers = searchParams.get("passengers")?.toString() ?? '';
  const roundTrip = searchParams.get("roundTrip") === "true";

  // State quản lý chuyến đã chọn
  const [selectedOutboundTrip, setSelectedOutboundTrip] = useState<SelectedTrip | null>(null);
  const [selectedReturnTrip, setSelectedReturnTrip] = useState<SelectedTrip | null>(null);
  const [tripDirection, setTripDirection] = useState<'outbound' | 'return'>('outbound');

  // Reset state khi thay đổi tham số tìm kiếm
  useEffect(() => {
    setSelectedOutboundTrip(null);
    setSelectedReturnTrip(null);
    setTripDirection('outbound');
  }, [searchParams]);

  // Format ngày đi
  const formattedDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? format(departureDate, 'dd MMMM yyyy, EEE')
    : 'N/A';

  // Format ngày về (nếu có)
  const formattedReturnDate = roundTrip && returnDate && !isNaN(returnDate.getTime())
    ? format(returnDate, 'dd MMMM yyyy, EEE')
    : null;

  // Format ngày đi cho API
  const rawDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? departureDate.toISOString().split('T')[0]
    : '';

  // Log thông tin tìm kiếm
  console.log('Search params:', {
    from,
    to,
    departureDate: formattedDepartDate,
    returnDate: formattedReturnDate,
    passengers,
    roundTrip,
  });

  // Render component
  return (
    <>
      {/* Form tìm kiếm */}
      <BookingSearch
        from={from}
        to={to}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={passengers}
        roundTrip={roundTrip}
      />
      {/* Hiển thị kết quả tìm kiếm nếu có đủ thông tin */}
      {from && to && rawDepartDate && (
        <>
          {/* Tab chuyển đổi giữa chuyến đi và chuyến về */}
          <TripTabs
            from={from}
            to={to}
            returnFrom={to}
            returnTo={from}
            departDate={formattedDepartDate}
            returnDate={formattedReturnDate}
            roundTrip={roundTrip}
            selectedOutboundTrip={selectedOutboundTrip}
            selectedReturnTrip={selectedReturnTrip}
            setTripDirection={setTripDirection}
            tripDirection={tripDirection}
          />
          {/* Hiển thị danh sách chuyến tàu */}
          <TrainSearchResults
            setSelectedOutboundTrip={setSelectedOutboundTrip}
            setSelectedReturnTrip={setSelectedReturnTrip}
            selectedOutboundTrip={selectedOutboundTrip}
            selectedReturnTrip={selectedReturnTrip}
            setTripDirection={setTripDirection}
            tripDirection={tripDirection}
          />
        </>
      )}
    </>
  );
};

export default LayoutSearch;