import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { PaymentOptionsProps } from '../../Entity/Entity';
 // Import interface từ entity.ts

/**
 * Component PaymentOptions để chọn phương thức thanh toán.
 * Hiển thị các tab (Ví Điện Tử, Ngân Hàng Trực Tuyến, ZaloPay) và các tùy chọn thanh toán tương ứng.
 */
const PaymentOptions: React.FC<PaymentOptionsProps> = ({ formData, handleInputChange }) => {
  // State để quản lý tab đang active (mặc định là Ví Điện Tử)
  const [activeTab, setActiveTab] = useState('tab_EWallet');

  // Hàm xử lý thay đổi tab khi người dùng click
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Tiêu đề phần thanh toán */}
      <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-6 flex items-center">
        <CreditCardIcon className="h-6 w-6 mr-2 text-blue-500 dark:text-blue-400" />
        Thanh toán
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Chọn phương thức thanh toán:</p>

      {/* Các tab để chọn phương thức thanh toán */}
      <div className="flex space-x-4 mb-6">
        <motion.button
          onClick={() => handleTabChange('tab_EWallet')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${activeTab === 'tab_EWallet' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ví Điện Tử
        </motion.button>
        <motion.button
          onClick={() => handleTabChange('tab_OnlineBanking')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${activeTab === 'tab_OnlineBanking' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ngân Hàng Trực Tuyến
        </motion.button>
        <motion.button
          onClick={() => handleTabChange('tab_ZaloPay')}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${activeTab === 'tab_ZaloPay' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ZaloPay
        </motion.button>
      </div>

      {/* Nội dung tương ứng với tab được chọn */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tab Ví Điện Tử */}
        {activeTab === 'tab_EWallet' && (
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <img src="/images/payment/p-easybookWallet.jpg" alt="Easybook Wallet" className="h-10 rounded-md mr-4" />
              <p className="text-gray-600 dark:text-gray-300">
                Vui lòng <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Đăng nhập hoặc Đăng ký</a> để sử dụng Ví Easybook.
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">Thẻ ATM nội địa:</p>
              <div className="flex space-x-4">
                <motion.label
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  whileHover={{ scale: 1.03 }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Momo"
                    checked={formData.paymentMethod === 'Momo'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <img src="/images/payment/momo.png" alt="Momo" className="h-10 rounded-md" />
                </motion.label>
                <motion.label
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  whileHover={{ scale: 1.03 }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Payoo"
                    checked={formData.paymentMethod === 'Payoo'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <img src="/images/payment/p-payoo.jpg" alt="Payoo" className="h-10 rounded-md" />
                </motion.label>
              </div>
            </div>
          </div>
        )}

        {/* Tab Ngân Hàng Trực Tuyến */}
        {activeTab === 'tab_OnlineBanking' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Thẻ ATM nội địa:</p>
            <motion.label
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              whileHover={{ scale: 1.03 }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="PayooBank"
                checked={formData.paymentMethod === 'PayooBank'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <img src="/images/payment/p-internetbanking.jpg" alt="Internet Banking" className="h-10 rounded-md" />
            </motion.label>
          </div>
        )}

        {/* Tab ZaloPay */}
        {activeTab === 'tab_ZaloPay' && (
          <div className="space-y-4">
            <div className="text-gray-600 dark:text-gray-300">
              <p className="mb-2">Hỗ trợ:</p>
              <div className="flex space-x-2 mb-2">
                <img src="/images/payment/p-zalopay.png" alt="Zalopay" className="h-6 rounded-md" />
                <img src="/images/payment/p-vnbank.png" alt="VN Bank" className="h-6 rounded-md" />
                <img src="/images/payment/visa.jpg" alt="Visa" className="h-6 rounded-md" />
                <img src="/images/payment/master.jpg" alt="Master" className="h-6 rounded-md" />
              </div>
              <p>Ví điện tử ZaloPay/Thẻ ATM nội địa/Internetbanking và thẻ Visa & Mastercard.</p>
            </div>
            <motion.label
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
              whileHover={{ scale: 1.03 }}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="ZaloPay"
                checked={formData.paymentMethod === 'ZaloPay'}
                onChange={handleInputChange}
                className="mr-3"
              />
              <img src="/images/payment/p-zalopay-40.png" alt="ZaloPay" className="h-10 rounded-md" />
            </motion.label>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PaymentOptions;