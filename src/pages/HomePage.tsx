import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  FaTrain,
  FaBus,
  FaShip,
  FaExchangeAlt,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaSearchMinus
} from 'react-icons/fa';
import PopularRoutes from '../Components/PopularRoutes';
import Newfeed from '../Components/Newfeed';
import TrainBookingForm from '../Components/TrainBookingForm';

const IconTrain = FaTrain as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconBus = FaBus as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconShip = FaShip as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconSwap = FaExchangeAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconCalendar = FaCalendarAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const IconPassenger = FaUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('train');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  return (
    <>
          <TrainBookingForm/>
      <div className="bg-gray-100 py-8  ">
        <Newfeed />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Tại sao chọn chúng tôi?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <IconTrain className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Đặt vé dễ dàng</h3>
            <p>Chúng tôi cung cấp dịch vụ đặt vé trực tuyến nhanh chóng và tiện lợi.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <IconBus className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Giá cả hợp lý</h3>
            <p>Chúng tôi cam kết mang đến giá vé tốt nhất cho bạn.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <IconShip className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hỗ trợ 24/7</h3>
            <p>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn mọi lúc mọi nơi.</p>
          </div>
        </div>
      </div>
      <div className="  text-center text-[#3f3b3b] font-helvetica pt-[24px] pl-[15px] pr-[15px] pb-[24px] p-[100px]  ">
        <h2 className="text-[36px] mb-[6px] font-semibold pt-[0px]">Bản đồ tuyến đường sắt Việt Nam</h2>
        <h3 className=" col-xs-12 no-padding  sub-title-internation mb-[24px] text-[18px]">Xem thông tin chi tiết về các tuyến tàu hỏa, lịch trình và điểm dừng</h3>
        <div className='bg-gray-100'>
          <img alt="ivivu" className=" mx-auto container" src="https://res.ivivu.com/train/images/banner/ivivu_ban_do_duong_sat.webp" />
        </div>
        <div className=" bg-white pt-8"></div>
        <div className="container mx-auto px-4 "></div>
        <h2 className=" text-2xl font-bold mb-6 ">Các hành trình tàu hỏa phổ biến</h2>
        <h3 className="text-lg mb-6">Khám phá những tuyến đường được yêu thích nhất và đặt vé ngay với giá ưu đãi!</h3>
      </div>
      <div className=" container mx-auto px-4">
        <PopularRoutes />
      </div>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Đánh giá của khách hàng</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p>"Dịch vụ tuyệt vời, tôi đã có một chuyến đi rất thoải mái!"</p>
              <p className="mt-4 font-semibold">Nguyễn Văn A</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p>"Giá cả hợp lý và dễ dàng đặt vé trực tuyến."</p>
              <p className="mt-4 font-semibold">Trần Thị B</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p>"Tôi rất hài lòng với dịch vụ hỗ trợ khách hàng."</p>
              <p className="mt-4 font-semibold">Lê Văn C</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default HeroSection;
