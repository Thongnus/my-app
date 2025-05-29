import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import fetchPromotions from '../Service/NewFeedService';
import { NewfeedDto } from '../Entity/Entity';

// Tùy chọn: Import file CSS nếu tạo riêng
// import './Newfeed.css';

const Newfeed: React.FC = () => {
  const [promotions, setPromotions] = useState<NewfeedDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const data = await fetchPromotions();
        setPromotions(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-gray-600">Đang tải...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (promotions.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center text-gray-600">Không có khuyến mãi nào.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Transport Operators' Offers & News</h2>
      <p className="text-lg text-gray-600 mb-8">Don't miss out on these incredible deals - book now before they're gone!</p>
      
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        loop={true}
      >
        {promotions.map((promo) => (
          <SwiperSlide key={promo.id} className="h-full">
            <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between h-full min-h-[350px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.src = '/images/default.jpg';
                }}
              />
              <div className="mt-4 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{promo.title}</h3>
                <p className="text-base text-gray-600 flex-1">{promo.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Newfeed;