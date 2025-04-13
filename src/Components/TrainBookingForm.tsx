import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface FormData {
  departure: { value: string; label: string } | null;
  destination: { value: string; label: string } | null;
  departureDate: Date;
  returnDate: Date | null;
  passengers: string;
  roundTrip: boolean;
}

interface FormErrors {
  departure?: string;
  destination?: string;
  passengers?: string;
}

const TrainBookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    departure: null,
    destination: null,
    departureDate: new Date(),
    returnDate: null,
    passengers: '1',
    roundTrip: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const swapStations = () => {
    setFormData(prev => ({
      ...prev,
      departure: prev.destination,
      destination: prev.departure,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.departure) {
      newErrors.departure = 'Vui lòng chọn điểm đi';
    }
    if (!formData.destination) {
      newErrors.destination = 'Vui lòng chọn điểm đến';
    }
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      newErrors.passengers = 'Số hành khách phải từ 1 đến 10';
    }
    if (parseInt(formData.passengers) > 10) {
      newErrors.passengers = 'Số hành khách tối đa là 10';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePassengerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Chỉ cho phép giá trị từ 1 đến 10
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 10)) {
      setFormData(prev => ({ ...prev, passengers: value }));
      setErrors(prev => ({ ...prev, passengers: undefined }));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/train-search-results');
    }
  };

  return (
    <div className="bg-[length:100%_auto] bg-no-repeat bg-[url(https://easycdn.blob.core.windows.net/images/hero-images/vn-05.jpg)] py-12">
      <div className="container max-w-[1300px] mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          Đặt Vé Tàu Hỏa
        </h1>

        <div className="bg-black bg-opacity-80 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="flex items-center px-6 py-4 border-b border-gray-600 text-yellow-400 font-semibold text-lg bg-black bg-opacity-50">
            <IconTrain className="mr-2" /> Tàu Hỏa
          </div>

          {/* Form */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-white mb-2 font-medium">Điểm Đi</label>
                <Select
                  options={provinces}
                  value={formData.departure}
                  onChange={(newValue) =>
                    setFormData(prev => ({ ...prev, departure: newValue }))
                  }
                  placeholder="Chọn điểm đi"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderColor: errors.departure ? '#ef4444' : '#e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#facc15',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? '#facc15' : 'transparent',
                      color: isFocused ? '#ffffff' : '#374151',
                      '&:hover': {
                        backgroundColor: '#facc15',
                        color: '#ffffff',
                      },
                    }),
                  }}
                />
                {errors.departure && (
                  <p className="text-red-400 text-sm mt-1">{errors.departure}</p>
                )}
              </div>

              <div className="flex items-center justify-center pt-6 md:pt-0">
                <button
                  title="Đổi chiều"
                  onClick={swapStations}
                  className="p-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <IconSwap className="text-white" />
                </button>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Điểm Đến</label>
                <Select
                  options={provinces}
                  value={formData.destination}
                  onChange={(newValue) =>
                    setFormData(prev => ({ ...prev, destination: newValue }))
                  }
                  placeholder="Chọn điểm đến"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderColor: errors.destination ? '#ef4444' : '#e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '0.25rem',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#facc15',
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      maxHeight: '200px',
                      overflowY: 'auto',
                    }),
                    option: (base, { isFocused }) => ({
                      ...base,
                      backgroundColor: isFocused ? '#facc15' : 'transparent',
                      color: isFocused ? '#ffffff' : '#374151',
                      '&:hover': {
                        backgroundColor: '#facc15',
                        color: '#ffffff',
                      },
                    }),
                  }}
                />
                {errors.destination && (
                  <p className="text-red-400 text-sm mt-1">{errors.destination}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="relative">
                <label className="block text-white mb-2 font-medium">Ngày Đi</label>
                <div className="relative">
                  <DatePicker
                    selected={formData.departureDate}
                    onChange={(date) =>
                      setFormData(prev => ({ ...prev, departureDate: date || new Date() }))
                    }
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 bg-white hover:border-yellow-500"
                  />
                  <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {formData.roundTrip && (
                <div className="relative">
                  <label className="block text-white mb-2 font-medium">Ngày Về</label>
                  <div className="relative">
                    <DatePicker
                      selected={formData.returnDate}
                      onChange={(date) =>
                        setFormData(prev => ({ ...prev, returnDate: date || new Date() }))
                      }
                      className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300 bg-white hover:border-yellow-500"
                    />
                    <IconCalendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              <div className="relative">
                <label className="block text-white mb-2 font-medium">Hành Khách</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.passengers}
                    onChange={handlePassengerChange}
                    min="1"
                    max="10"
                    className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 bg-white hover:border-yellow-500 ${
                      errors.passengers
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-yellow-500'
                    }`}
                  />
                  <IconPassenger className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.passengers && (
                  <p className="text-red-400 text-sm mt-1">{errors.passengers}</p>
                )}
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg w-full flex items-center justify-center transition duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <IconTrain className="mr-2" /> Tìm Kiếm
                </button>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="roundtrip"
                checked={formData.roundTrip}
                onChange={() =>
                  setFormData(prev => ({
                    ...prev,
                    roundTrip: !prev.roundTrip,
                    returnDate: !prev.roundTrip ? new Date() : null,
                  }))
                }
                className="mr-2 h-5 w-5 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded"
              />
              <label htmlFor="roundtrip" className="text-white font-medium">Khứ Hồi</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBookingForm;