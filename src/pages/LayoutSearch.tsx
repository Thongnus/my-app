import React, { useState, useEffect } from 'react'; // Import useEffect để xử lý side effects
import { useSearchParams } from 'react-router-dom'; // Hook để lấy query parameters từ URL
import { format } from 'date-fns'; // Thư viện để định dạng ngày
import BookingSearch from '../Components/BookingSearch'; // Component form tìm kiếm
import TripTabs from '../Components/TripTabs'; // Component hiển thị tab "Chuyến đi"/"Chuyến về"
import TrainSearchResults from '../Components/TrainSearchResults'; // Component hiển thị danh sách chuyến tàu

// Component LayoutSearch: Trang chính để hiển thị form tìm kiếm và kết quả tìm kiếm
const LayoutSearch: React.FC = () => {
  // Lấy thông tin từ query parameters trong URL
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || ''; // Điểm đi, ví dụ: "hanoi"
  const to = searchParams.get("to") || ''; // Điểm đến, ví dụ: "danang"
  const departureDate = new Date(searchParams.get("departureDate") || ''); // Ngày đi
  const returnDate = new Date(searchParams.get("returnDate") || ''); // Ngày về
  const passengers = searchParams.get("passengers")?.toString() ?? ''; // Số hành khách
  const roundTrip = searchParams.get("roundTrip") === "true"; // Có phải vé khứ hồi không

  // Quản lý trạng thái
  const [selectedOutboundTrip, setSelectedOutboundTrip] = useState<{ operator: string; departureTime: string } | null>(null); // Chuyến đi đã chọn
  const [selectedReturnTrip, setSelectedReturnTrip] = useState<{ operator: string; departureTime: string } | null>(null); // Chuyến về đã chọn
  const [tripDirection, setTripDirection] = useState<'outbound' | 'return'>('outbound'); // Hướng chuyến hiện tại (outbound/return)

  // Reset state khi searchParams thay đổi
  useEffect(() => {
    // Khi searchParams thay đổi (người dùng tìm kiếm lại), reset các trạng thái
    setSelectedOutboundTrip(null); // Xóa chuyến đi đã chọn
    setSelectedReturnTrip(null); // Xóa chuyến về đã chọn
    setTripDirection('outbound'); // Mặc định hiển thị tab "Chuyến đi"
  }, [searchParams]); // Chạy lại mỗi khi searchParams thay đổi

  // Định dạng ngày đi để hiển thị, ví dụ: "10 April 2025, Thu"
  const formattedDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? format(departureDate, 'dd MMMM yyyy, EEE')
    : 'N/A';

  // Định dạng ngày về (chỉ áp dụng nếu là vé khứ hồi)
  const formattedReturnDate = roundTrip && returnDate && !isNaN(returnDate.getTime())
    ? format(returnDate, 'dd MMMM yyyy, EEE')
    : null;

  // Ngày đi dạng thô (YYYY-MM-DD) để kiểm tra và truyền vào các component con
  const rawDepartDate = departureDate && !isNaN(departureDate.getTime())
    ? departureDate.toISOString().split('T')[0]
    : '';

  // Ghi log để debug thông tin tìm kiếm
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
      {/* Form tìm kiếm */}
      <BookingSearch
        from={from}
        to={to}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={passengers}
        roundTrip={roundTrip}
      />
      {/* Hiển thị tab và danh sách chuyến tàu nếu có đủ thông tin tìm kiếm */}
      {from && to && rawDepartDate && (
        <>
          {/* Tab chuyển đổi giữa "Chuyến đi" và "Chuyến về" */}
          <TripTabs
            from={from}
            to={to}
            returnFrom={to} // Điểm đi của chuyến về = điểm đến của chuyến đi
            returnTo={from} // Điểm đến của chuyến về = điểm đi của chuyến đi
            departDate={formattedDepartDate}
            returnDate={formattedReturnDate}
            roundTrip={roundTrip}
            selectedOutboundTrip={selectedOutboundTrip}
            selectedReturnTrip={selectedReturnTrip}
            setTripDirection={setTripDirection}
            tripDirection={tripDirection}
          />
          {/* Danh sách kết quả tìm kiếm chuyến tàu */}
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