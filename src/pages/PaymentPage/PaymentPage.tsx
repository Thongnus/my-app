import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { ArrowRightIcon, CreditCardIcon, TagIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import { TrainIcon } from 'lucide-react';
import PassengerInfoForm from './PasengerInfoForm';
import TripInfoCard from './TripInfoCard';
import PaymentOptions from './PaymentOptions';
import { FormDataPayment } from '../../Entity/Entity';

// Định nghĩa kiểu dữ liệu cho trip
interface Trip {
  operator: string;
  departureTime: string;
  departure: string;
  arrival: string;
  date: string;
  trainName: string;
  coach: string;
  seats: string[];
  pricePerSeat: number;
}

// Định nghĩa kiểu dữ liệu cho state từ useLocation
interface LocationState {
  outboundTrip: Trip;
  returnTrip: Trip | null;
  outboundSeats: string[];
  returnSeats: string[];
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  console.log("data", state?.returnTrip?.arrival);

  const [formData, setFormData] = useState<FormDataPayment>({
    ticketCollector: {
      salutation: '',
      name: '',
      email: '',
      repeatedEmail: '',
      contact: '',
      nationality: '',
    },
    passenger: {
      name: '',
      gender: '',
      nationality: '',
      identityType: '',
      icOrPassport: '',
      passengerType: 'ADULT',
      contact: '',
    },
    paymentMethod: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<{ applied: boolean; discount: number; message: string }>({
    applied: false,
    discount: 0,
    message: '',
  });
  const [promoCodes, setPromoCodes] = useState<{ code: string; discount: number; minPrice: number; description: string }[]>([]);
  const [showPromoModal, setShowPromoModal] = useState(false);

  const basePrice = useMemo(() => {
    const outboundPrice = state?.outboundSeats?.length * (state?.outboundTrip?.pricePerSeat || 0);
    const returnPrice = state?.returnTrip ? state?.returnSeats?.length * (state?.returnTrip?.pricePerSeat || 0) : 0;
    return outboundPrice + returnPrice;
  }, [state]);

  const discountRate = 10;
  const maxDiscount = (basePrice * discountRate) / 100;

  const fetchPromoCodes = useCallback(async () => {
    const mockApiResponse = [
      {
        code: 'DISCOUNT10',
        discount: 10,
        minPrice: 2000000,
        description: 'Giảm 10% cho đơn hàng từ 2.000.000 VNĐ trở lên, tối đa ' + maxDiscount.toLocaleString() + ' VNĐ',
      },
    ];
    setPromoCodes(mockApiResponse);
  }, [maxDiscount]);

  useEffect(() => {
    fetchPromoCodes();
  }, [fetchPromoCodes]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const fieldValue = type === 'checkbox' ? checked : value;

    const parts = name.split('.');
    if (parts.length === 2) {
      const [section, field] = parts;
      if (section === 'ticketCollector' || section === 'passenger') {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section as 'ticketCollector' | 'passenger'],
            [field]: fieldValue,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.ticketCollector.name) newErrors['ticketCollector.name'] = 'Vui lòng nhập tên';
    if (!formData.ticketCollector.email) newErrors['ticketCollector.email'] = 'Vui lòng nhập email';
    if (formData.ticketCollector.email !== formData.ticketCollector.repeatedEmail)
      newErrors['ticketCollector.repeatedEmail'] = 'Email không khớp';
    if (!formData.ticketCollector.contact) newErrors['ticketCollector.contact'] = 'Vui lòng nhập số liên hệ';
    if (!formData.ticketCollector.nationality) newErrors['ticketCollector.nationality'] = 'Vui lòng chọn quốc tịch';
    if (!formData.passenger.nationality) newErrors['passenger.nationality'] = 'Vui lòng chọn quốc tịch';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoApplied({ applied: false, discount: 0, message: '' });
      return;
    }

    const promo = promoCodes.find((p) => p.code === promoCode);
    if (!promo) {
      setPromoApplied({ applied: false, discount: 0, message: 'Mã khuyến mãi không hợp lệ' });
      return;
    }

    if (basePrice < promo.minPrice) {
      setPromoApplied({
        applied: false,
        discount: 0,
        message: `Mã ${promoCode} chỉ áp dụng cho đơn hàng từ ${promo.minPrice.toLocaleString()} VNĐ trở lên`,
      });
      return;
    }

    const discount = (basePrice * promo.discount) / 100;
    const appliedDiscount = Math.min(discount, maxDiscount);
    setPromoApplied({
      applied: true,
      discount: appliedDiscount,
      message: `Mã ${promoCode} đã được áp dụng! Giảm ${appliedDiscount.toLocaleString()} VNĐ.`,
    });
  };

  const selectPromoCode = (code: string) => {
    setPromoCode(code);
    setShowPromoModal(false);
    applyPromoCode();
  };

  const resetPromoCode = () => {
    setPromoCode('');
    setPromoApplied({ applied: false, discount: 0, message: '' });
  };

  const totalPrice = useMemo(() => {
    return promoApplied.applied ? basePrice - promoApplied.discount : basePrice;
  }, [basePrice, promoApplied]);

  const handlePayment = useCallback(async () => {
    if (!validateForm()) return;
    if (!formData.agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản và chính sách!');
      return;
    }
    if (!formData.paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán!');
      return;
    }
    setShowModal(true);
  }, [formData, validateForm]);

  const confirmPayment = useCallback(() => {
    setShowModal(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Đang xử lý thanh toán... (Chưa có API để tích hợp)');
    }, 2000);
  }, []);

  const formProgress = useMemo(() => {
    let completedFields = 0;
    const totalFields = 5;
    if (formData.ticketCollector.name) completedFields++;
    if (formData.ticketCollector.email) completedFields++;
    if (formData.ticketCollector.repeatedEmail) completedFields++;
    if (formData.ticketCollector.contact) completedFields++;
    if (formData.ticketCollector.nationality) completedFields++;
    return (completedFields / totalFields) * 100;
  }, [formData]);

  if (!state || !state.outboundTrip) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Lỗi: Không tìm thấy thông tin chuyến đi</h1>
        <p className="mt-4 text-gray-600">Vui lòng quay lại và chọn chuyến đi trước khi tiếp tục.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen font-roboto overflow-hidden">
     

      <div className="relative z-10 container mx-auto p-6 lg:p-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-8 flex items-center"
        >
          <TrainIcon className="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400" />
          Điền thông tin & Thanh toán
        </motion.h1>

        <div className="mb-8">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Tiến độ hoàn thành: {Math.round(formProgress)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <motion.div
              className="bg-blue-600 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${formProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            className="w-full lg:w-1/3 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TripInfoCard
              title="Thông tin khởi hành"
              details={{
                'Ngày khởi hành': state?.outboundTrip?.date || 'N/A',
                'Giờ khởi hành': state?.outboundTrip?.departureTime || 'N/A',
                'Ga Đi': state?.outboundTrip?.departure || 'N/A',
                'Ga Đến': state?.outboundTrip?.arrival || 'N/A',
                'Nhà Ga': state?.outboundTrip?.operator || 'LIVITRANS',
                'Toa tàu': state?.outboundTrip?.trainName || 'N/A',
                'Sàn': state?.outboundTrip?.coach || 'Giường',
                'Số giường': state?.outboundSeats?.length.toString() || '0',
                'Ghế đã chọn': state?.outboundSeats?.join(', ') || 'N/A',
                'Giá vé': state?.outboundTrip?.pricePerSeat
                  ? `${(state.outboundTrip.pricePerSeat * state.outboundSeats.length).toLocaleString()} VNĐ`
                  : 'N/A',
              }}
            />
            {state?.returnTrip && (
              <TripInfoCard
                title="Thông tin lượt về"
                details={{
                  'Ngày khởi hành': state?.returnTrip?.date || 'N/A',
                  'Giờ khởi hành': state?.returnTrip?.departureTime || 'N/A',
                  'Ga Đi': state?.returnTrip?.departure || 'N/A',
                  'Ga Đến': state?.returnTrip?.arrival || 'N/A',
                  'Nhà Ga': state?.returnTrip?.operator || 'LIVITRANS',
                  'Toa tàu': state?.returnTrip?.trainName || 'N/A',
                  'Sàn': state?.returnTrip?.coach || 'Giường',
                  'Số giường': state?.returnSeats?.length.toString() || '0',
                  'Ghế đã chọn': state?.returnSeats?.join(', ') || 'N/A',
                  'Giá vé': state?.returnTrip?.pricePerSeat
                    ? `${(state.returnTrip.pricePerSeat * state.returnSeats.length).toLocaleString()} VNĐ`
                    : 'N/A',
                }}
              />
            )}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white flex items-center">
                  <TagIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
                  Mã Khuyến Mãi (Không bắt buộc)
                </h2>
                <motion.button
                  onClick={() => setShowPromoModal(true)}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <InformationCircleIcon className="h-5 w-5 mr-1" />
                  Xem mã khả dụng
                </motion.button>
              </div>
              <div className="flex space-x-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Nhập mã khuyến mãi (VD: DISCOUNT10)"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {promoCode && (
                    <button
                      onClick={resetPromoCode}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <motion.button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Áp dụng
                </motion.button>
              </div>
              {promoApplied.message && (
                <p className={`text-sm mt-2 ${promoApplied.applied ? 'text-green-500' : 'text-red-500'}`}>
                  {promoApplied.message}
                </p>
              )}
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              whileHover={{ y: -5 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
                Thông tin Thanh toán
              </h2>
              <div className="text-gray-600 dark:text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Vé lượt đi:</span>
                  <span>
                    {state?.outboundTrip?.pricePerSeat
                      ? `${(state.outboundTrip.pricePerSeat * state.outboundSeats.length).toLocaleString()} VNĐ`
                      : 'N/A'}
                  </span>
                </div>
                {state?.returnTrip && (
                  <div className="flex justify-between">
                    <span>Vé lượt về:</span>
                    <span>
                      {state?.returnTrip?.pricePerSeat
                        ? `${(state.returnTrip.pricePerSeat * state.returnSeats.length).toLocaleString()} VNĐ`
                        : 'N/A'}
                    </span>
                  </div>
                )}
                {promoApplied.applied && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Giảm giá:</span>
                    <span>-{promoApplied.discount.toLocaleString()} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-blue-600 dark:text-blue-400">
                  <span>Tổng:</span>
                  <span>{totalPrice.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PassengerInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors} />
            <PaymentOptions formData={formData} handleInputChange={handleInputChange} />

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="flex items-center text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mr-3 h-5 w-5 text-blue-500 rounded focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
                />
                <span>
                  Tôi đồng ý với <a href="#disclaimer" className="text-blue-600 dark:text-blue-400 hover:underline">Chính sách Bảo mật</a> &{' '}
                  <a href="/vi/privacy-policy" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">Bán vé</a> của Easybook. Có mặt tại điểm đón sớm 30 phút.
                </span>
              </label>
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
                Vui lòng hoàn tất thanh toán trong <span className="text-red-600 dark:text-red-400 font-bold">7 phút</span> sau khi nhấn{' '}
                <span className="text-red-600 dark:text-red-400 font-bold">"Thanh toán ngay"</span>.
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
                <span className="text-red-600 dark:text-red-400 font-bold">KHÔNG NHẤN QUAY LẠI</span> sau khi nhấn{' '}
                <span className="text-red-600 dark:text-red-400 font-bold">"Thanh toán ngay"</span>.
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handlePayment}
                disabled={isLoading}
                className={`relative inline-flex items-center px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
                } dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-800 dark:hover:from-blue-700 dark:hover:to-blue-900`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : null}
                {isLoading ? 'Đang xử lý...' : 'Thanh Toán Ngay'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Xác nhận thanh toán</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Bạn sắp thanh toán <span className="font-bold text-blue-600 dark:text-blue-400">{totalPrice.toLocaleString()} VNĐ</span>. Vui lòng kiểm tra thông tin trước khi tiếp tục.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmPayment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPromoModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Danh sách mã khuyến mãi</h2>
                <button
                  onClick={() => setShowPromoModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              {promoCodes.length > 0 ? (
                <div className="space-y-4">
                  {promoCodes.map((promo) => (
                    <motion.div
                      key={promo.code}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                      onClick={() => selectPromoCode(promo.code)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{promo.code}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{promo.description}</p>
                        </div>
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                          Chọn
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">Không có mã khuyến mãi nào khả dụng.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tooltip id="tooltip" className="max-w-xs" />
    </div>
  );
};

export default PaymentPage;