import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

// Types
type SeatType = 'seat' | 'bed';
type BedLevel = 'upper' | 'lower';
type SeatStatus = 'available' | 'sold' | 'selected';

interface TrainCar {
  id: number;
  name: string;
  type: SeatType;
  price: string;
  availableSeats: number;
  totalSeats: number;
  hasTwoLevels?: boolean;
  rows?: number;
}

interface Seat {
  id: string;
  number: number;
  price: number;
  status: SeatStatus;
  level?: BedLevel;
}

const TrainBookingPopup: React.FC = () => {
  // State for selected car and seats
  const [selectedCar, setSelectedCar] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Mock data for train cars (reverse order - right to left)
  const trainCars: TrainCar[] = [
    { id: 6, name: "Toa 7: Giường nằm khoang 6 điều hòa", type: "bed", price: "800K - 1021K", availableSeats: 34, totalSeats: 36, hasTwoLevels: true },
    { id: 5, name: "Toa 6: Giường nằm khoang 6 điều hòa", type: "bed", price: "800K - 1021K", availableSeats: 30, totalSeats: 36, hasTwoLevels: true },
    { id: 4, name: "Toa 5: Giường nằm khoang 6 điều hòa", type: "bed", price: "800K - 1021K", availableSeats: 32, totalSeats: 36, hasTwoLevels: true },
    { id: 3, name: "Toa 4: Giường nằm khoang 6 điều hòa", type: "bed", price: "800K - 1021K", availableSeats: 28, totalSeats: 36, hasTwoLevels: true },
    { id: 2, name: "Toa 3: Giường nằm khoang 6 điều hòa", type: "bed", price: "800K - 1021K", availableSeats: 36, totalSeats: 36, hasTwoLevels: true },
    { id: 1, name: "Toa 2: Ngồi mềm điều hòa", type: "seat", price: "586K - 608K", availableSeats: 52, totalSeats: 64, rows: 4 },
    { id: 0, name: "Toa 1: Ngồi mềm điều hòa", type: "seat", price: "586K - 608K", availableSeats: 48, totalSeats: 64, rows: 4 },
  ];

  // Generate seats for current car
  const generateSeats = (car: TrainCar): Seat[] => {
    const seats: Seat[] = [];
    
    if (car.type === 'seat') {
      // Generate seats for seat-type car
      for (let i = 1; i <= car.totalSeats; i++) {
        // Randomly determine if seat is sold (unavailable)
        const status: SeatStatus = Math.random() > 0.2 ? 'available' : 'sold';
        
        seats.push({
          id: `${car.id}-${i}`,
          number: i,
          price: 586000 + Math.floor(Math.random() * 22000),
          status
        });
      }
    } else {
      // Generate beds for bed-type car
      const totalCompartments = 6; // 6 compartments per car
      const bedsPerCompartment = 6; // 6 beds per compartment (3 upper, 3 lower)
      
      for (let compartment = 0; compartment < totalCompartments; compartment++) {
        for (let bed = 0; bed < bedsPerCompartment; bed++) {
          const bedNumber = compartment * bedsPerCompartment + bed + 1;
          const level: BedLevel = bed < bedsPerCompartment / 2 ? 'lower' : 'upper';
          const status: SeatStatus = Math.random() > 0.2 ? 'available' : 'sold';
          
          seats.push({
            id: `${car.id}-${bedNumber}`,
            number: bedNumber,
            price: 800000 + Math.floor(Math.random() * 221000),
            status,
            level
          });
        }
      }
    }
    
    return seats;
  };

  const currentCarSeats = generateSeats(trainCars[selectedCar]);

  // Handle seat selection
  const handleSeatClick = (seatId: string) => {
    const seat = currentCarSeats.find(s => s.id === seatId);
    
    if (!seat || seat.status === 'sold') {
      return; // Do nothing if seat is sold or doesn't exist
    }
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // Get current status of seat (including if it's selected by user)
  const getSeatStatus = (seat: Seat): SeatStatus => {
    if (selectedSeats.includes(seat.id)) return 'selected';
    return seat.status;
  };

  // SVG icons for train cars in header
  const TrainCarIcon: React.FC<{ isSelected: boolean, type: SeatType }> = ({ isSelected, type }) => {
    const baseColor = isSelected ? 'fill-blue-100 stroke-blue-500' : 'fill-gray-100 stroke-gray-400';
    const strokeWidth = isSelected ? 'stroke-2' : 'stroke-1';
    
    return (
      <svg viewBox="0 0 60 30" className={`w-full h-8 ${baseColor} ${strokeWidth}`}>
        {/* Basic train car shape */}
        <rect x="5" y="5" width="50" height="20" rx="3" />
        {/* Train car details based on type */}
        {type === 'seat' ? (
          // Seats representation
          <>
            <line x1="15" y1="5" x2="15" y2="25" className="stroke-inherit" />
            <line x1="30" y1="5" x2="30" y2="25" className="stroke-inherit" />
            <line x1="45" y1="5" x2="45" y2="25" className="stroke-inherit" />
          </>
        ) : (
          // Beds representation
          <>
            <line x1="20" y1="5" x2="20" y2="25" className="stroke-inherit" />
            <line x1="40" y1="5" x2="40" y2="25" className="stroke-inherit" />
            <line x1="5" y1="15" x2="55" y2="15" className="stroke-inherit" />
          </>
        )}
        {/* Wheels */}
        <circle cx="15" cy="27" r="2" className="fill-gray-500" />
        <circle cx="45" cy="27" r="2" className="fill-gray-500" />
      </svg>
    );
  };

  // SVG for seat icon
  const SeatIcon: React.FC<{ status: SeatStatus, number: number, price: number }> = ({ status, number, price }) => {
    let fillColor = 'fill-white';
    let strokeColor = 'stroke-gray-400';
    let textColor = 'text-gray-700';
    
    switch (status) {
      case 'sold':
        fillColor = 'fill-gray-200';
        strokeColor = 'stroke-gray-400';
        textColor = 'text-gray-500';
        break;
      case 'selected':
        fillColor = 'fill-blue-100';
        strokeColor = 'stroke-blue-500 stroke-2';
        textColor = 'text-blue-700';
        break;
      case 'available':
        fillColor = 'fill-white';
        strokeColor = 'stroke-gray-400';
        textColor = 'text-gray-700';
        break;
    }
    
    return (
      <div className="relative w-full h-14">
        <svg viewBox="0 0 40 40" className={`w-full h-full ${fillColor} ${strokeColor}`}>
          {/* Basic seat shape */}
          <rect x="5" y="5" width="30" height="30" rx="3" />
          {/* Seat back */}
          <rect x="8" y="8" width="24" height="6" rx="1" className={status === 'sold' ? 'fill-gray-300' : 'fill-gray-100'} />
          {/* Seat cushion */}
          <rect x="8" y="16" width="24" height="16" rx="1" className={status === 'sold' ? 'fill-gray-300' : 'fill-gray-100'} />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${textColor}`}>
          <span className="font-medium">{number}</span>
          <span className="text-xs">{Math.floor(price / 1000)}K</span>
        </div>
      </div>
    );
  };

  // SVG for bed icon
  const BedIcon: React.FC<{ status: SeatStatus, number: number, price: number, level: BedLevel }> = ({ status, number, price, level }) => {
    let fillColor = 'fill-white';
    let strokeColor = 'stroke-gray-400';
    let textColor = 'text-gray-700';
    
    switch (status) {
      case 'sold':
        fillColor = 'fill-gray-200';
        strokeColor = 'stroke-gray-400';
        textColor = 'text-gray-500';
        break;
      case 'selected':
        fillColor = 'fill-blue-100';
        strokeColor = 'stroke-blue-500 stroke-2';
        textColor = 'text-blue-700';
        break;
      case 'available':
        fillColor = 'fill-white';
        strokeColor = 'stroke-gray-400';
        textColor = 'text-gray-700';
        break;
    }
    
    return (
      <div className="relative w-full h-14">
        <svg viewBox="0 0 60 30" className={`w-full h-full ${fillColor} ${strokeColor}`}>
          {/* Bed frame */}
          <rect x="5" y="5" width="50" height="20" rx="2" />
          {/* Pillow */}
          <rect x="8" y="8" width="10" height="14" rx="1" className={status === 'sold' ? 'fill-gray-300' : 'fill-gray-100'} />
          {/* Mattress */}
          <rect x="20" y="8" width="32" height="14" rx="1" className={status === 'sold' ? 'fill-gray-300' : 'fill-gray-100'} />
          {/* Upper/lower indicator */}
          {level === 'upper' && (
            <path d="M3,15 L3,5 L5,5" className="stroke-inherit fill-none" />
          )}
          {level === 'lower' && (
            <path d="M3,15 L3,25 L5,25" className="stroke-inherit fill-none" />
          )}
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${textColor}`}>
          <span className="font-medium">{number}</span>
          <span className="text-xs">{Math.floor(price / 1000)}K</span>
        </div>
      </div>
    );
  };

  // Render train car header
  const renderTrainCarHeader = () => {
    return (
      <div className="flex items-center overflow-x-auto py-2 px-1 border-b">
        <div className="flex items-center space-x-1">
          {trainCars.map((car) => (
            <div
              key={car.id}
              onClick={() => setSelectedCar(car.id)}
              className={`
                flex flex-col justify-center items-center
                cursor-pointer p-2 rounded
                border-2 transition-all
                ${selectedCar === car.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}
                min-w-28
              `}
            >
              <TrainCarIcon isSelected={selectedCar === car.id} type={car.type} />
              <div className="text-xs text-center mt-1">
                {car.type === 'seat' ? 'Ngồi mềm' : 'Giường nằm'}
              </div>
              <div className="text-xs text-gray-500">
                Giá từ {car.price}
              </div>
              <div className="text-xs text-blue-600">
                Còn {car.availableSeats}/{car.totalSeats} chỗ
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render seats based on car type
  const renderSeats = () => {
    const car = trainCars[selectedCar];
    
    if (car.type === 'seat') {
      // Render regular seats in grid with 4 rows
      const seatsPerRow = car.totalSeats / (car.rows || 4);
      
      return (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">{car.name}</h3>
          
          {/* Create 4 rows */}
          <div className="space-y-4">
            {Array.from({ length: car.rows || 4 }).map((_, rowIndex) => {
              const startSeat = rowIndex * seatsPerRow;
              const rowSeats = currentCarSeats.slice(startSeat, startSeat + seatsPerRow);
              
              return (
                <div key={rowIndex} className="grid grid-cols-8 gap-2">
                  {rowSeats.map((seat) => (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat.id)}
                      className={`${seat.status !== 'sold' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    >
                      <SeatIcon
                        status={getSeatStatus(seat)}
                        number={seat.number}
                        price={seat.price}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      // For bed cars, group by compartment
      // Each compartment has 6 beds (3 lower, 3 upper)
      const compartments = 6;
      
      return (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">{car.name}</h3>
          
          {/* Display compartments in a linear layout (one after another) */}
          <div className="space-y-4">
            {Array.from({ length: compartments }).map((_, compartmentIndex) => {
              // Get beds for this compartment
              const compartmentBeds = currentCarSeats.filter(bed => 
                Math.floor((bed.number - 1) / 6) === compartmentIndex
              );
              
              const lowerBeds = compartmentBeds.filter(bed => bed.level === 'lower');
              const upperBeds = compartmentBeds.filter(bed => bed.level === 'upper');
              
              return (
                <div key={compartmentIndex} className="border-2 border-gray-300 rounded-lg p-2 bg-gray-50">
                  <div className="text-sm font-medium mb-2">Khoang {compartmentIndex + 1}</div>
                  
                  <div className="flex flex-col">
                    {/* Upper beds */}
                    <div className="mb-4">
                      <div className="text-xs text-center mb-1 font-medium text-gray-500">Tầng trên</div>
                      <div className="flex justify-around">
                        {upperBeds.map((bed) => (
                          <div
                            key={bed.id}
                            onClick={() => handleSeatClick(bed.id)}
                            className={`${getSeatStatus(bed) !== 'sold' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                          >
                            <BedIcon
                              status={getSeatStatus(bed)}
                              number={bed.number}
                              price={bed.price}
                              level="upper"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Lower beds */}
                    <div>
                      <div className="text-xs text-center mb-1 font-medium text-gray-500">Tầng dưới</div>
                      <div className="flex justify-around">
                        {lowerBeds.map((bed) => (
                          <div
                            key={bed.id}
                            onClick={() => handleSeatClick(bed.id)}
                            className={`${getSeatStatus(bed) !== 'sold' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                          >
                            <BedIcon
                              status={getSeatStatus(bed)}
                              number={bed.number}
                              price={bed.price}
                              level="lower"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  // Render seat status legend
  const renderSeatLegend = () => {
    return (
      <div className="flex flex-wrap basis-2/5">
        <div className="flex items-center mr-4 mb-2">
          <div className="w-5 h-5 mr-1">
            <svg viewBox="0 0 20 20" className="w-full h-full fill-white stroke-gray-400">
              <rect x="2" y="2" width="16" height="16" rx="2" />
            </svg>
          </div>
          <span className="text-sm">Chỗ trống</span>
        </div>
        <div className="flex items-center mr-4 mb-2">
          <div className="w-5 h-5 mr-1">
            <svg viewBox="0 0 20 20" className="w-full h-full fill-gray-200 stroke-gray-400">
              <rect x="2" y="2" width="16" height="16" rx="2" />
            </svg>
          </div>
          <span className="text-sm">Chỗ đã bán</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-5 h-5 mr-1">
            <svg viewBox="0 0 20 20" className="w-full h-full fill-blue-100 stroke-blue-500 stroke-2">
              <rect x="2" y="2" width="16" height="16" rx="2" />
            </svg>
          </div>
          <span className="text-sm">Chỗ đang chọn</span>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Popup header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Tàu Tốc Hành SE7</h2>
            <p className="text-sm text-gray-600">Ga Hà Nội → Ga Đà Nẵng | 16/04/2025</p>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>
        
        {/* Train cars selection - right to left */}
        {renderTrainCarHeader()}
        
        {/* Seats section */}
        <div className="flex-1 overflow-y-auto">
          {renderSeats()}
        </div>
        
        {/* Footer section */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex flex-col md:flex-row">
            {/* Passenger info */}
            <div className="mb-4 md:mb-0 md:mr-4">
              <div className="border rounded-md p-3 shadow-md cursor-pointer bg-white">
                <div className="font-medium">Người lớn</div>
                <div className="text-gray-600">Chưa chọn</div>
              </div>
            </div>
            
            {/* Footer actions */}
            <div className="flex flex-col md:flex-row justify-between w-full mt-2 items-center">
              {/* Seat status legend */}
              {renderSeatLegend()}
              
              {/* Total and actions */}
              <div className="basis-3/5 flex flex-col md:flex-row items-center justify-end w-full gap-4">
                <div>
                  <div className="text-sm">
                    Đã chọn: <span className="font-medium">{selectedSeats.length}/1 chỗ</span>
                  </div>
                  <div className="text-orange-500 font-semibold text-sm">
                    Quý khách vui lòng chọn chỗ trống ở trên
                  </div>
                </div>
                
                <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center">
                  Tiếp tục chọn chiều về 
                  <ChevronRight size={16} className="ml-1"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBookingPopup;