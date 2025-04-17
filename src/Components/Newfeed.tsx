import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const promotions = [
  {
    image: "/images/da-nang.jpg",
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
  {
    image: "/images/ho-chi-minh-con-dao.jpg",
    title: "Sài Gòn - Côn Đảo: Trải nghiệm mới cùng siêu tàu Thăng Long",
    description: "Giá vé chỉ từ 615K/người. Bắt đầu từ 13/5/2024 *T&C Apply",
    buttonText: "BOOK NOW",
  },
  {
    image: "/images/ho-chi-minh-con-dao.jpg",
    title: "Sài Gòn - Côn Đảo: Trải nghiệm mới cùng siêu tàu Thăng Long",
    description: "Giá vé chỉ từ 615K/người. Bắt đầu từ 13/5/2024 *T&C Apply",
    buttonText: "BOOK NOW",
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
    <div className=" container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-2">Transport Operators' Offers & News</h2>
      <p className="text-sm text-gray-500 mb-6">Don't miss out on these incredible deals - book now before they're gone!</p>
      
      <Swiper
       autoplay={{
        delay: 2000, // Delay 2 giây
        disableOnInteraction: false, // Tiếp tục autoplay sau khi người dùng tương tác
      }}
        modules={[Navigation]}
        navigation
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        loop={true}
      >
        {promotions.map((promo, index) => (
    <SwiperSlide key={index} className="h-full">
    <div className="bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col justify-between h-full min-h-[400px]">
      <img
        src={promo.image}
        alt={promo.title}
        className="w-full h-40 object-cover rounded"
      />
      <div className="mt-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2">{promo.title}</h3>
        <p className="text-sm text-gray-700 mb-4 flex-1">{promo.description}</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-auto">
          {promo.buttonText}
        </button>
      </div>
    </div>
  </SwiperSlide>
  
        ))}
      </Swiper>
    </div>
  );
};

export default Newfeed;
