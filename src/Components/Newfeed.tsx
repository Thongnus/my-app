import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {getNewFeeds } from '../Service/Newfeed'; // Adjust the import path as necessary
import { NewFeed } from "../Entity/Entity";
const Newfeed = () => {
  const [newFeeds, setNewFeeds] = useState<NewFeed[]>([]);

  useEffect(() => {
    getNewFeeds()
      .then(data => setNewFeeds(data))
      .catch(err => {
        console.error("Lỗi khi tải tin tức mới:", err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-2">Transport Operators' Offers & News</h2>
      <p className="text-sm text-gray-500 mb-6">
        Don't miss out on these incredible deals - book now before they're gone!
      </p>

      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={40}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        loop={true}
      >
        {newFeeds.map((feed, index) => (
          <SwiperSlide key={feed.id || index} className="h-full">
            <div className="bg-yellow-300 rounded-lg shadow-md p-4 flex flex-col justify-between h-full min-h-[400px]">
              <img
                src={feed.image}
                alt={feed.title}
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2">{feed.title}</h3>
                <p className="text-sm text-gray-700 mb-4 flex-1">{feed.description}</p>
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-auto">
                  {feed.buttonText}
                </button> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Newfeed;
