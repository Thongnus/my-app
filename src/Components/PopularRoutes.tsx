import React from 'react';
import { useNavigate } from 'react-router-dom';
import { provinces } from '../Data.js/provinces';

interface TrainRoute {
  departure: string;
  arrival: string;
  duration: string;
  trainNumber: string;
  price: number;
}

const PopularRoutes: React.FC = () => {
  const navigate = useNavigate();

  const routes: TrainRoute[] = [
    {
      departure: "Sài Gòn",
      arrival: "Nha Trang",
      duration: "8h20p",
      trainNumber: "SNT2",
      price: 385000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p",
      trainNumber: "SP3",
      price: 375000,
  
    },
  ];

  const handleViewClick = (route: TrainRoute) => {
    // Ánh xạ departure và arrival sang value từ provinces
    const fromStation = provinces.find((p) => p.label === route.departure);
    const toStation = provinces.find((p) => p.label === route.arrival);

    if (!fromStation || !toStation) {
      console.error('Không tìm thấy điểm đi hoặc điểm đến trong provinces:', route);
      return;
    }

    // Lấy ngày hiện tại hoặc ngày tiếp theo làm ngày khởi hành mặc định
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const departureDate = tomorrow.toISOString().split('T')[0]; // Định dạng YYYY-MM-DD

    // Tạo query parameters
    const queryParams = new URLSearchParams({
      from: fromStation.value,
      to: toStation.value,
      departureDate: departureDate,
      roundTrip: 'false',
      passengers: '1',
    }).toString();

    // Điều hướng tới trang train-search-results
    navigate(`/train-search-results?${queryParams}`);
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Các Tuyến Đường Phổ Biến</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className="car-2/4 h-[127px] max-w-[364px] bg-white p-4 rounded-lg shadow-lg"
            itemScope
            itemType="https://schema.org/TrainTrip"
          >
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="route-left">
                  <div className="route-city hover:text-[#26bed6] hover:underline cursor-pointer">
                    <span>{route.departure}</span>
                  </div>
                </div>

                <div className="arrow text-center">
                  <span className="block text-sm text-gray-600">{route.duration}</span>
                  <span className="block text-blue-600">{route.trainNumber}</span>
                </div>

                <div className="route-right">
                  <div className="route-city hover:text-[#26bed6] hover:underline cursor-pointer">
                    <span>{route.arrival}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-lg font-semibold">
                  {route.price.toLocaleString()}
                  <span className="text-sm"> đ</span>
                </div>
                <button
                  onClick={() => handleViewClick(route)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;