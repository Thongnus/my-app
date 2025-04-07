import React from 'react';

interface TrainRoute {
  departure: string;
  arrival: string;
  duration: string;
  trainNumber: string;
  price: number;
  url: string;
}

const PopularRoutes: React.FC = () => {
  const routes: TrainRoute[] = [
    {
      departure: "Sài Gòn",
      arrival: "Nha Trang", 
      duration: "8h20p",
      trainNumber: "SNT2",
      price: 385000,
      url: "https://www.ivivu.com/ve-tau/tim-kiem-chuyen-di?departPlaceCode=SGO&returnPlaceCode=NTR"
    },
    {
      departure: "Hà Nội",
      arrival: "Lào Cai",
      duration: "7h45p", 
      trainNumber: "SP3",
      price: 375000,
      url: "https://www.ivivu.com/ve-tau/tim-kiem-chuyen-di?departPlaceCode=HNO&returnPlaceCode=LCA"
    },
    // Add more routes as needed
  ];

  return (
    <div className="py-8">
      <div className="flex gap-6 flex-wrap">
        {routes.map((route, index) => (
          <div 
            key={index}
            className="card w-1/3 h-[127px] max-w-[364px] bg-white p-4 rounded-lg shadow-lg"
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
                <a
                  href={route.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Xem
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;