import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';
import { provinces } from '../Data.js/provinces';

import {
  FaTrain,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUser,
} from 'react-icons/fa';

const IconTrain = FaTrain as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSwap = FaExchangeAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconCalendar = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconPassenger = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const TrainBookingForm = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  type Option = { value: string; label: string; } | null;
  const [departure, setDeparture] = useState<Option>(null);
  const [destination, setDestination] = useState<Option>(null);

  const swapStations = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };
  const [formData, setFormData] = useState({
    departure: 'Đà Nẵng',
    date: '',
    passengers: '1 người lớn',
    destination: 'Đà Nẵng',
    roundTrip: false
  });

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Xử lý submit form ở đây
  };
  return (
    <div className=" bg-[length:100%_auto] bg-no-repeat bg-[url(https://easycdn.blob.core.windows.net/images/hero-images/vn-05.jpg)] from-blue-600 to-indigo-600 text-white py-12">
      <div className="container  max-w-[1300px] mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Đặt vé tàu hỏa</h1>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 text-blue-600 font-semibold text-lg bg-gray-100">
            <IconTrain className="mr-2" /> Tàu hỏa
          </div>

          {/* Form */}
          <div className="p-6 bg-gray-50">
            <div className="grid md:grid-cols-3 gap-6 mb-6 ">
              <div>
                <label className="block text-gray-700 mb-2">Điểm đi</label>
                <Select
                  options={provinces}
                  onChange={(newValue) => setDeparture(newValue)}
                  placeholder="Chọn điểm đi"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              <div className="flex items-center justify-center pt-6 md:pt-0">
                <button
                  title="Đổi chiều"
                  onClick={swapStations}
                  className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                >
                  <IconSwap />
                </button>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Điểm đến</label>
                <Select
                  options={provinces}
                  onChange={(newValue) => setDestination(newValue)}
                  placeholder="Chọn điểm đến"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="relative">
                <label className="block text-gray-700 mb-2">Ngày đi</label>
                <DatePicker
                  selected={departureDate}
                  onChange={(date) => setDepartureDate(date || new Date())}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <IconCalendar className="absolute right-3 top-11 text-gray-400" />
              </div>

              {isRoundTrip && (
                <div className="relative">
                  <label className="block text-gray-700 mb-2">Ngày về</label>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date || new Date())}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                  <IconCalendar className="absolute right-3 top-11 text-gray-400" />
                </div>
              )}

              <div className="relative">
                <label className="block text-gray-700 mb-2">Hành khách</label>
                <input
                  type="text"
                  placeholder="1 người lớn"
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <IconPassenger className="absolute right-3 top-11 text-gray-400" />
              </div>

              <div className="flex items-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md w-full flex items-center justify-center transition duration-300 transform hover:scale-105">
                  <IconTrain className="mr-2" /> Tìm kiếm
                </button>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="roundtrip"
                checked={isRoundTrip}
                onChange={() => setIsRoundTrip(!isRoundTrip)}
                className="mr-2"
              />
              <label htmlFor="roundtrip" className="text-gray-700">
                Khứ hồi
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBookingForm;
