import React from "react";

const promotions = [
  {
    image: "/images/da-nang.jpg", // Bạn thay bằng URL thật hoặc import ảnh
    title: "Vì vu Đà Nẵng - Không vui không về",
    description: "Khám phá thành phố đáng sống nhất Việt Nam: Bãi biển Mỹ Khê | Cầu Rồng | Bà Nà Hills",
    buttonText: "Đặt Ngay",
  },
  {
    image: "/images/vietnam-explore.jpg",
    title: "Du lịch miền Trung cùng Vietnam Explore Travel",
    description: "150K VND - Đà Nẵng → Huế, Hội An,... Giá chỉ từ *T&C Apply",
    buttonText: "Đặt vé ngay",
  },
  {
    image: "/images/ho-chi-minh-con-dao.jpg",
    title: "Sài Gòn - Côn Đảo: Trải nghiệm mới cùng siêu tàu Thăng Long",
    description: "Giá vé chỉ từ 615K/người. Bắt đầu từ 13/5/2024 *T&C Apply",
    buttonText: "BOOK NOW",
  },
];

const Newfeed = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-2">Transport Operators' Offers & News</h2>
      <p className="text-sm text-gray-500 mb-6">Don’t miss out on these incredible deals - book now before they're gone!</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto">
        {promotions.map((promo, index) => (
          <div key={index} className="bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col justify-between">
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-700 mb-4">{promo.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {promo.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newfeed;
