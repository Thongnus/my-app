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
import { Coach, FormDataPayment, FillFormTrip } from '../../Entity/Entity';
import { PromoCode, samplePromoCodes } from '../../Entity/PromoCode';

// Định nghĩa kiểu dữ liệu cho state từ useLocation
interface LocationState {
  outboundTrip: FillFormTrip;
  returnTrip: FillFormTrip | null;
  outboundSeats: string[];
  returnSeats: string[];
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  console.log("data", state?.outboundTrip.total);

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
      passengerType: '',
      contact: '',
    },
    paymentMethod: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Tính tổng giá vé
  const outboundTotal = state?.outboundTrip?.total || 0;
  const returnTotal = state?.returnTrip?.total || 0;
  const subtotal = outboundTotal + returnTotal;
  const finalTotal = subtotal - discountAmount;

  const getSeatsCount = (seats: string[] | undefined): number => {
    return seats?.length || 0;
  };

  const basePrice: number = useMemo(() => {
    const outboundPricePerSeat = state?.outboundTrip?.pricePerSeat ? parseInt(state.outboundTrip.pricePerSeat.toString()) || 0 : 0;
    const returnPricePerSeat = state?.returnTrip?.pricePerSeat ? parseInt(state.returnTrip.pricePerSeat.toString()) || 0 : 0;

    const outboundSeatsCount = getSeatsCount(state?.outboundSeats);
    const returnSeatsCount = getSeatsCount(state?.returnSeats);
    
    const outboundPrice = outboundSeatsCount * outboundPricePerSeat;
    const returnPrice = state?.returnTrip ? returnSeatsCount * returnPricePerSeat : 0;
    
    return outboundPrice + returnPrice;
  }, [state]);

  const discountRate: number = 10;
  const maxDiscount: number = Math.floor((basePrice * discountRate) / 100);

  const fetchPromoCodes = useCallback(async () => {
    const mockApiResponse = [
      {
        code: 'DISCOUNT10',
        discount: 10,
        minPrice: 2000000,
        description: 'Giảm 10% cho đơn hàng từ 2.000.000 VNĐ trở lên, tối đa ' + maxDiscount.toLocaleString() + ' VNĐ',
      },
    ];
    // setPromoCodes(mockApiResponse);
  }, [maxDiscount]);

  useEffect(() => {
    fetchPromoCodes();
  }, [fetchPromoCodes]);

  // Lọc mã giảm giá khả dụng
  const availablePromoCodes = useMemo(() => {
    const currentDate = new Date();
    return samplePromoCodes.filter(promo => 
      promo.isActive && 
      currentDate >= promo.startDate && 
      currentDate <= promo.endDate &&
      (!promo.usageLimit || !promo.usedCount || promo.usedCount < promo.usageLimit) &&
      (promo.isPublic || (promo.userId === 'VIP_USER_ID')) // Thay 'VIP_USER_ID' bằng ID người dùng thực tế
    );
  }, []);

  // Lấy danh sách danh mục
  const categories = useMemo(() => {
    const uniqueCategories = new Set(availablePromoCodes.map(promo => promo.category));
    return Array.from(uniqueCategories);
  }, [availablePromoCodes]);

  // Lọc mã giảm giá theo danh mục
  const filteredPromoCodes = useMemo(() => {
    if (selectedCategory === 'all') {
      return availablePromoCodes;
    }
    return availablePromoCodes.filter(promo => promo.category === selectedCategory);
  }, [availablePromoCodes, selectedCategory]);

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
    // Nếu đã có mã được áp dụng, không cho phép áp dụng mã mới
    if (appliedPromoCode) {
      setErrors({ ...errors, promoCode: 'Bạn đã áp dụng một mã giảm giá. Vui lòng hủy mã hiện tại trước khi áp dụng mã mới.' });
      return;
    }

    if (!promoCode) {
      setErrors({ ...errors, promoCode: 'Vui lòng nhập mã giảm giá' });
      return;
    }

    // Tìm mã giảm giá trong danh sách
    const promo = samplePromoCodes.find(p => p.code === promoCode);
    if (!promo) {
      setErrors({ ...errors, promoCode: 'Mã giảm giá không hợp lệ' });
      return;
    }

    // Kiểm tra điều kiện áp dụng
    const currentDate = new Date();
    if (!promo.isActive || currentDate < promo.startDate || currentDate > promo.endDate) {
      setErrors({ ...errors, promoCode: 'Mã giảm giá đã hết hạn' });
      return;
    }

    if (promo.minOrderValue && subtotal < promo.minOrderValue) {
      setErrors({ ...errors, promoCode: `Mã giảm giá chỉ áp dụng cho đơn hàng từ ${promo.minOrderValue.toLocaleString()} VNĐ` });
      return;
    }

    if (promo.usageLimit && promo.usedCount && promo.usedCount >= promo.usageLimit) {
      setErrors({ ...errors, promoCode: 'Mã giảm giá đã hết lượt sử dụng' });
      return;
    }

    // Tính số tiền giảm giá
    let discount = 0;
    if (promo.discountType === 'PERCENTAGE') {
      discount = subtotal * (promo.discountValue / 100);
      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    } else {
      discount = promo.discountValue;
    }

    setDiscountAmount(discount);
    setAppliedPromoCode(promoCode);
    setPromoCode('');
    setErrors({ ...errors, promoCode: '' });
  };

  const resetPromoCode = () => {
    setPromoCode('');
    setAppliedPromoCode(null);
    setDiscountAmount(0);
    setErrors({ ...errors, promoCode: '' });
  };

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
                'Ga Đi': state?.outboundTrip?.departure || 'N/A',
                'Ga Đến': state?.outboundTrip?.arrival || 'N/A',
                'Nhà Ga': state?.outboundTrip?.operator || 'LIVITRANS',
                'Toa tàu': state?.outboundTrip?.trainName || 'N/A',
                'Loại toa': state?.outboundTrip?.coachType || 'N/A',
                'Ghế đã chọn': state?.outboundTrip?.seats?.join(', ') || 'N/A',
                'Giá vé': state?.outboundTrip?.total
                  ? `${state.outboundTrip.total.toLocaleString()} VNĐ`
                  : 'N/A',
              }}
            />
            {state?.returnTrip && (
              <TripInfoCard
                title="Thông tin lượt về"
                details={{
                  'Ngày khởi hành': state?.returnTrip?.date || 'N/A',
                  'Ga Đi': state?.returnTrip?.departure || 'N/A',
                  'Ga Đến': state?.returnTrip?.arrival || 'N/A',
                  'Nhà Ga': state?.returnTrip?.operator || 'LIVITRANS',
                  'Toa tàu': state?.returnTrip?.trainName || 'N/A',
                  'Loại toa': state?.returnTrip?.coachType || 'N/A',
                  'Ghế đã chọn': state?.returnTrip?.seats?.join(', ') || 'N/A',
                  'Giá vé': state?.returnTrip?.total
                    ? `${state.returnTrip.total.toLocaleString()} VNĐ`
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
              
              </div>
              <div className="mt-4">
                {!appliedPromoCode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Nhập mã giảm giá"
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Áp dụng
                    </button>
                    <button
                      onClick={() => setShowPromoModal(true)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Xem mã khả dụng
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 dark:text-green-400">
                        Đã áp dụng mã: {appliedPromoCode}
                      </span>
                      <span className="text-sm text-gray-500">
                        (Giảm {discountAmount.toLocaleString()} VNĐ)
                      </span>
                    </div>
                    <button
                      onClick={resetPromoCode}
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      Hủy
                    </button>
                  </div>
                )}
                {errors.promoCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.promoCode}</p>
                )}
              </div>
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
                    {state?.outboundTrip?.total
                      ? `${state.outboundTrip.total.toLocaleString()} VNĐ`
                      : 'N/A'}
                  </span>
                </div>
                {state?.returnTrip && (
                  <div className="flex justify-between">
                    <span>Vé lượt về:</span>
                    <span>
                      {state?.returnTrip?.total
                        ? `${state.returnTrip.total.toLocaleString()} VNĐ`
                        : 'N/A'}
                    </span>
                  </div>
                )}
                {appliedPromoCode && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Giảm giá:</span>
                    <span>-{discountAmount.toLocaleString()} VNĐ</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-blue-600 dark:text-blue-400">
                  <span>Tổng:</span>
                  <span>{finalTotal.toLocaleString()} VNĐ</span>
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
                Bạn sắp thanh toán <span className="font-bold text-blue-600 dark:text-blue-400">{finalTotal.toLocaleString()} VNĐ</span>. Vui lòng kiểm tra thông tin trước khi tiếp tục.
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

      {showPromoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Mã giảm giá khả dụng</h2>
              <button
                onClick={() => setShowPromoModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Danh mục */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Tất cả
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category || 'all')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {filteredPromoCodes.length > 0 ? (
                filteredPromoCodes.map((promo) => (
                  <div
                    key={promo.code}
                    className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      setPromoCode(promo.code);
                      setShowPromoModal(false);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400">{promo.code}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{promo.description}</p>
                        {promo.minOrderValue && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Áp dụng cho đơn từ {promo.minOrderValue.toLocaleString()} VNĐ
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {promo.discountType === 'PERCENTAGE' 
                            ? `Giảm ${promo.discountValue}%`
                            : `Giảm ${promo.discountValue.toLocaleString()} VNĐ`}
                        </p>
                        {promo.maxDiscount && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Tối đa {promo.maxDiscount.toLocaleString()} VNĐ
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-300 text-center py-4">
                  Không có mã giảm giá nào khả dụng trong danh mục này.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Tooltip id="tooltip" className="max-w-xs" />
    </div>
  );
};

export default PaymentPage;