import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SeatSelectionProps, Coach, Trip } from "../../Entity/Entity";
import { parsePrice, formatPrice } from '../../utils/priceUtils';
import { log } from "console";

interface TripData {
  operator: string;
  departureTime: string;
  seats?: string[];
  departure?: string;
  arrival?: string;
  date?: string;
  trainName?: string;
  coach?: Coach;
  pricePerSeat: number;
  totalPrice?: number;
  total: number;
  coachType?: string;
}

interface NavigationState {
  outboundTrip: TripData;
  returnTrip?: TripData;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  coach,
  seats,
  onSeatClick,
  totalAvailableSeats,
  onContinue,
  onBook,
  departure,
  arrival,
  date,
  trainName,
  tripDirection,
  roundTrip,
  selectedOutboundTrip,
  selectedReturnTrip,
}) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const outboundTripData: TripData = {
    operator: selectedOutboundTrip?.operator || '',
    departureTime: selectedOutboundTrip?.departureTime || '',
    seats: selectedOutboundTrip?.seats || [],
    departure: departure || '',
    arrival: arrival || '',
    date: date || '',
    trainName: trainName || '',
    coach: coach,
    pricePerSeat: selectedOutboundTrip?.pricePerSeat || 0,
    totalPrice: selectedOutboundTrip?.seats?.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      return total + (seat?.price || 0);
    }, 0) || 0,
    total: selectedOutboundTrip?.seats?.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      return total + (seat?.price || 0);
    }, 0) || 0,
    coachType: coach.type
  };

  const returnTripData: TripData = roundTrip && selectedReturnTrip ? {
    operator: selectedReturnTrip.operator,
    departureTime: selectedReturnTrip.departureTime,
    seats: selectedReturnTrip.seats || [],
    departure: departure || '',
    arrival: arrival || '',
    date: date || '',
    trainName: trainName || '',
    coach: coach,
    pricePerSeat: selectedReturnTrip.pricePerSeat || 0,
    totalPrice: selectedReturnTrip.seats?.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      return total + (seat?.price || 0);
    }, 0) || 0,
    total: selectedReturnTrip.seats?.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      return total + (seat?.price || 0);
    }, 0) || 0,
    coachType: coach.type
  } : outboundTripData;

  // Hàm xử lý khi click vào ghế
  const handleSeatClick = (seatNumber: string) => {
    if (selectedSeats.includes(seatNumber)) {
      // Nếu ghế đã được chọn, bỏ chọn
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // Nếu ghế chưa được chọn, thêm vào danh sách
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    onSeatClick?.(seatNumber);
  };


  // Hàm xử lý khi click nút đặt vé/tiếp tục
  const handleContinue = () => {
    console.log('Selected Seats:', selectedSeats);
    console.log('Trip Direction:', tripDirection);
    console.log('Round Trip:', roundTrip);
    
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ghế trước khi tiếp tục!");
      return;
    }

    // Tính tổng giá vé dựa trên các ghế đã chọn
    const totalPrice = selectedSeats.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.seatNumber === seatNumber);
      return total + (seat?.price || 0);
    }, 0);

    const navigationState: NavigationState = {
      outboundTrip: {
        operator: selectedOutboundTrip?.operator || '',
        departureTime: selectedOutboundTrip?.departureTime || '',
        seats: selectedSeats,
        departure: departure || '',
        arrival: arrival || '',
        date: date || '',
        trainName: trainName || '',
        coach: coach,
        coachType: coach.type,
        pricePerSeat: selectedOutboundTrip?.pricePerSeat || 0,
        totalPrice: totalPrice,
        total: totalPrice
      }
    };

    // Nếu là chuyến khứ hồi và đang ở chuyến đi
    if (roundTrip && tripDirection === 'outbound') {
      // Cập nhật state và chuyển sang tab chuyến về
      onContinue?.({
        tripDirection: 'return',
        roundTrip: true,
        selectedSeats: selectedSeats
      });
      return;
    }

    // Nếu là chuyến khứ hồi và đang ở chuyến về
    if (roundTrip && tripDirection === 'return') {
      // Kiểm tra xem đã có thông tin chuyến đi chưa
      if (!selectedOutboundTrip || !selectedOutboundTrip.seats || selectedOutboundTrip.seats.length === 0) {
        alert("Vui lòng chọn ghế cho chuyến đi trước!");
        return;
      }

      navigationState.returnTrip = {
        operator: selectedReturnTrip?.operator || '',
        departureTime: selectedReturnTrip?.departureTime || '',
        seats: selectedSeats,
        departure: departure || '',
        arrival: arrival || '',
        date: date || '',
        trainName: trainName || '',
        coach: coach,
        coachType: coach.type,
        pricePerSeat: selectedReturnTrip?.pricePerSeat || 0,
        totalPrice: totalPrice,
        total: totalPrice
      };
    }

    console.log('Navigation State:', navigationState);
    navigate("/payment", { state: navigationState });
  };

  // Xác định có hiển thị nút đặt vé hay không
  const showBookButton = !roundTrip || (roundTrip && tripDirection === "return" && selectedOutboundTrip?.seats && selectedOutboundTrip.seats.length > 0);

  // Lấy thông tin về loại toa
  const coachNumber = parseInt(coach.coach.replace("Toa ", ""));
  const isSeatCoach = coachNumber <= 2;
  const isBedCoach = coachNumber >= 3;
  const seatRows = 4;
  const seatsPerSide = 8;
  const seatCols = seatsPerSide * 2;
  const bedsPerCompartment = 6;
  const compartments = isBedCoach ? Math.ceil(seats.length / bedsPerCompartment) : 1;

  // Cập nhật hiển thị giá
  const displayPrice = formatPrice(selectedSeats.reduce((total, seatNumber) => {
    const seat = seats.find(s => s.seatNumber === seatNumber);
    return total + (seat?.price || 0);
  }, 0));

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm sm:p-4">
      {/* Hiển thị thông tin toa và giá vé */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {coach.coach} {coach.type}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{coach.description}</p>
        <div className="flex flex-wrap gap-2">
          {coach.amenities.map((amenity, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
        <p className="text-lg font-semibold text-orange-600 mt-2">
          Giá vé: {coach.price}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          {isSeatCoach ? (
            // Hiển thị sơ đồ ghế ngồi
            <div className="flex flex-col gap-3 sm:gap-2">
              {Array.from({ length: seatRows }).map((_, rowIdx) => {
                const rowSeats = seats.slice(rowIdx * seatCols, (rowIdx + 1) * seatCols);
                const leftSeats = rowSeats.slice(0, seatsPerSide).filter(seat => seat);
                const rightSeats = rowSeats.slice(seatsPerSide).filter(seat => seat);

                return (
                  <div key={rowIdx} className="flex justify-center items-center gap-2 sm:gap-1">
                    <div className="flex justify-end gap-2 sm:gap-1">
                      {leftSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-16 sm:w-10 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                              ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                            {seat.isAvailable && (
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                {`${(seat.price / 1000).toLocaleString()}K`}
                              </span>
                            )}
                            <div
                              className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                            >
                              {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 w-4 sm:w-3 h-12 sm:h-10 rounded"></div>
                    </div>
                    <div className="flex justify-start gap-2 sm:gap-1">
                      {rightSeats.map((seat) => {
                        const isSelected = selectedSeats.includes(seat.seatNumber);
                        return (
                          <div
                            key={seat.seatNumber}
                            className={`relative group w-12 h-16 sm:w-10 sm:h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                              ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                            onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                          >
                            <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                            {seat.isAvailable && (
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                {`${(seat.price / 1000).toLocaleString()}K`}
                              </span>
                            )}
                            <div
                              className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                            >
                              {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Hiển thị sơ đồ giường nằm
            <div className="overflow-x-auto">
              <div className="flex flex-row gap-4 sm:gap-3">
                {Array.from({ length: compartments }).map((_, compIdx) => (
                  <div key={compIdx} className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <h3 className="text-lg sm:text-base font-medium mb-3 text-gray-700">Khoang {compIdx + 1}</h3>
                    <div className="flex flex-row gap-4 sm:gap-3">
                      <div className="flex flex-col gap-2 sm:gap-1.5">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return null;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-24 h-14 sm:w-20 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                                ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                T{seat.tier}
                              </span>
                              {seat.isAvailable && (
                                <span className="text-[10px] sm:text-[9px] text-gray-600">
                                  {`${(seat.price / 1000).toLocaleString()}K`}
                                </span>
                              )}
                              <div
                                className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="w-4 sm:w-3 h-40 sm:h-36 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex flex-col gap-2 sm:gap-1.5">
                        {Array.from({ length: 3 }).map((_, tierIdx) => {
                          const seatIdx = compIdx * bedsPerCompartment + 3 + tierIdx;
                          const seat = seats[seatIdx];
                          if (!seat) return null;
                          const isSelected = selectedSeats.includes(seat.seatNumber);
                          return (
                            <div
                              key={seat.seatNumber}
                              className={`relative group w-24 h-14 sm:w-20 sm:h-12 rounded-xl flex flex-col items-center justify-center transition-all duration-200
                                ${isSelected ? "border-2 border-blue-500 shadow-md bg-white cursor-pointer" : seat.isAvailable ? "border border-gray-300 hover:shadow-md hover:border-gray-400 bg-white cursor-pointer" : "border border-gray-300 bg-gray-200 cursor-not-allowed"}`}
                              onClick={() => seat.isAvailable && handleSeatClick(seat.seatNumber)}
                            >
                              <span className="font-bold text-sm sm:text-xs text-gray-800">{seat.seatNumber}</span>
                              <span className="text-[10px] sm:text-[9px] text-gray-600">
                                T{seat.tier}
                              </span>
                              {seat.isAvailable && (
                                <span className="text-[10px] sm:text-[9px] text-gray-600">
                                  {`${(seat.price / 1000).toLocaleString()}K`}
                                </span>
                              )}
                              <div
                                className={`absolute top-[-30px] sm:top-[-26px] text-xs sm:text-[10px] text-white px-2 sm:px-1.5 py-1 rounded shadow hidden group-hover:block ${isSelected ? "bg-blue-500" : seat.isAvailable ? "bg-green-500" : "bg-gray-500"}`}
                              >
                                {isSelected ? "Chỗ đang chọn" : seat.isAvailable ? "Chỗ còn trống" : "Chỗ đã bán"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Hiển thị chú thích và thông tin ghế đã chọn */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:space-y-0 space-y-3">
        {/* Phần chú thích */}
        <div className="flex space-x-6 sm:space-x-4">
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-white border border-gray-300 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ trống</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-gray-200 border border-gray-300 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ đã bán</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-1.5">
            <div className="w-5 h-5 sm:w-4 sm:h-4 bg-white border-2 border-blue-500 rounded"></div>
            <span className="text-sm sm:text-xs text-gray-700">Chỗ đang chọn</span>
          </div>
        </div>
      </div>

      {/* Phần thông tin ghế đã chọn */}
      {selectedSeats.length > 0 && (
        <div className="w-full mt-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {selectedSeats.map((seatNumber) => {
                const seat = seats.find(s => s.seatNumber === seatNumber);
                return (
                  <div key={seatNumber} className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium">Ghế {seatNumber}</span>
                      {seat?.tier && <span className="ml-1 text-gray-600">(T{seat.tier})</span>}
                    </div>
                    <div className="text-orange-600 font-medium">
                      {seat ? `${(seat.price / 1000).toLocaleString()}K` : ''}
                    </div>
                  </div>
                );
              })}
              <div className="border-l h-6 mx-2"></div>
              <div className="flex items-center font-semibold text-sm">
                <span>Tổng:</span>
                <span className="text-orange-600 ml-2">
                  {displayPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nút đặt vé */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleContinue}
          className="bg-orange-500 text-white px-6 py-2 sm:px-4 sm:py-1.5 rounded-lg flex items-center text-sm sm:text-xs hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {showBookButton ? 'Đặt vé' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;