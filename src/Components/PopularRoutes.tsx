import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { provinces } from '../Data.js/provinces';
import { TrainRoute } from '../Entity/Entity';
import fetchPopularRoutes from '../Service/fetchPopularRoutes';


const PopularRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<TrainRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularRoutes()
      .then(setRoutes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleViewClick = (route: TrainRoute) => {
    const fromStation = provinces.find((p) => p.label === route.departure);
    const toStation = provinces.find((p) => p.label === route.arrival);

    if (!fromStation || !toStation) {
      console.error('Không tìm thấy điểm đi hoặc đến:', route);
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const departureDate = tomorrow.toISOString().split('T')[0];

    const queryParams = new URLSearchParams({
      from: fromStation.value,
      to: toStation.value,
      departureDate,
      roundTrip: 'false',
      passengers: '1',
    }).toString();

    navigate(`/train-search-results?${queryParams}`);
  };

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;

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
                  {(route.averagePrice ?? 0).toLocaleString()} <span className="text-sm">đ</span>
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
