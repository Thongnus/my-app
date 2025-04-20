import React, { useState } from 'react';
import {
  FaSlidersH,
  FaEdit,
  FaLongArrowAltRight,
  FaAngleRight,
  FaAngleDown,
  FaSort,
  FaCaretDown,
  FaCaretUp,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { provinces } from '../Data.js/provinces';
import HeaderSelection from './Popup/PopupSelectSeat';

const CFaTimes = FaTimes as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaInfoCircle = FaInfoCircle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaSort = FaSort as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaAngleDown = FaAngleDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaAngleRight = FaAngleRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaLongArrowAltRight = FaLongArrowAltRight as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaEdit = FaEdit as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaSlidersH = FaSlidersH as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaCaretDown = FaCaretDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const CFaCaretUp = FaCaretUp as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

interface Trip {
  id: string;
  departureTime: string;
  duration: string;
  bedsAvailable: number;
  arrivalTime: string;
  fromStation: string;
  fromCity: string;
  toStation: string;
  toCity: string;
  operator: string;
  trainName: string;
  coachType: string;
  coachName: string;
  adultPrice: string;
  childPrice: string;
  amenities: {
    wifi?: boolean;
    powerPlug?: boolean;
    food?: boolean;
    tv?: boolean;
    massageChair?: boolean;
  };
  isLuxury: boolean;
  fromAddress?: string;
  toAddress?: string;
  fromLatitude?: number;
  fromLongitude?: number;
  departureDate: string;
}

interface SeatType {
  coach: string;
  type: string;
  availability: number;
  price: string;
}

type TimeFilter = { morning: boolean; afternoon: boolean; evening: boolean; all: boolean };
type OperatorFilter = { livitrans: boolean; newLivitrans: boolean; lotusTrain: boolean; all: boolean };
type FilterTypes = {
  time: TimeFilter;
  operator: OperatorFilter;
  amenities: Record<string, boolean>;
  pickup: Record<string, boolean>;
  dropoff: Record<string, boolean>;
};

const FilterSidebar: React.FC<{
  filters: FilterTypes;
  setFilters: React.Dispatch<React.SetStateAction<FilterTypes>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  resetFilters: () => void;
}> = ({ filters, setFilters, showFilters, setShowFilters, resetFilters }) => {
  const handleFilterChange = (filterType: keyof FilterTypes, filterKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };

      if (filterType === 'time') {
        const timeFilter = { ...newFilters.time };
        if (filterKey === 'all') {
          timeFilter.morning = false;
          timeFilter.afternoon = false;
          timeFilter.evening = false;
          timeFilter.all = true;
        } else {
          timeFilter[filterKey as keyof TimeFilter] = !timeFilter[filterKey as keyof TimeFilter];
          timeFilter.all = !(timeFilter.morning || timeFilter.afternoon || timeFilter.evening);
        }
        newFilters.time = timeFilter;
      } else if (filterType === 'operator') {
        const operatorFilter = { ...newFilters.operator };
        if (filterKey === 'all') {
          operatorFilter.livitrans = false;
          operatorFilter.newLivitrans = false;
          operatorFilter.lotusTrain = false;
          operatorFilter.all = true;
        } else {
          operatorFilter[filterKey as keyof OperatorFilter] = !operatorFilter[filterKey as keyof OperatorFilter];
          operatorFilter.all = !(operatorFilter.livitrans || operatorFilter.newLivitrans || operatorFilter.lotusTrain);
        }
        newFilters.operator = operatorFilter;
      } else {
        const otherFilter = { ...newFilters[filterType] };
        otherFilter[filterKey] = !otherFilter[filterKey];
        newFilters[filterType] = otherFilter;
      }

      return newFilters;
    });
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded"
          >
            <CFaSlidersH /> <span>Lọc</span>
          </button>
        </div>
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="border-b pb-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Lọc</h3>
              <button onClick={resetFilters} className="text-purple-600 text-sm">
                Đặt lại
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">Thời gian khởi hành</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="time-all"
                  checked={filters.time.all}
                  onChange={() => handleFilterChange('time', 'all')}
                  className="mr-2"
                />
                <label htmlFor="time-all">Tất cả</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="time-morning"
                  checked={filters.time.morning}
                  onChange={() => handleFilterChange('time', 'morning')}
                  className="mr-2"
                />
                <label htmlFor="time-morning">Sáng (từ 00:00 AM - 11:59 AM)</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="time-afternoon"
                  checked={filters.time.afternoon}
                  onChange={() => handleFilterChange('time', 'afternoon')}
                  className="mr-2"
                />
                <label htmlFor="time-afternoon">Chiều (từ 12:00 PM - 06:59 PM)</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="time-evening"
                  checked={filters.time.evening}
                  onChange={() => handleFilterChange('time', 'evening')}
                  className="mr-2"
                />
                <label htmlFor="time-evening">Tối (từ 07:00 PM - 11:59 PM)</label>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">Nhà Tàu (Công ty)</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="operator-all"
                  checked={filters.operator.all}
                  onChange={() => handleFilterChange('operator', 'all')}
                  className="mr-2"
                />
                <label htmlFor="operator-all">Tất cả</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="operator-livitrans"
                  checked={filters.operator.livitrans}
                  onChange={() => handleFilterChange('operator', 'livitrans')}
                  className="mr-2"
                />
                <label htmlFor="operator-livitrans">LIVITRANS</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="operator-newLivitrans"
                  checked={filters.operator.newLivitrans}
                  onChange={() => handleFilterChange('operator', 'newLivitrans')}
                  className="mr-2"
                />
                <label htmlFor="operator-newLivitrans">New Livitrans</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="operator-lotusTrain"
                  checked={filters.operator.lotusTrain}
                  onChange={() => handleFilterChange('operator', 'lotusTrain')}
                  className="mr-2"
                />
                <label htmlFor="operator-lotusTrain">LOTUS TRAIN</label>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold">Tiện nghi</h4>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="amenity-food"
                  checked={filters.amenities.food}
                  onChange={() => handleFilterChange('amenities', 'food')}
                  className="mr-2"
                />
                <label htmlFor="amenity-food">Đồ ăn trên xe</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="amenity-chair"
                  checked={filters.amenities.chair}
                  onChange={() => handleFilterChange('amenities', 'chair')}
                  className="mr-2"
                />
                <label htmlFor="amenity-chair">Ghế Massage</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="amenity-socketPlug"
                  checked={filters.amenities.socketPlug}
                  onChange={() => handleFilterChange('amenities', 'socketPlug')}
                  className="mr-2"
                />
                <label htmlFor="amenity-socketPlug">Ổ cắm</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="amenity-tv"
                  checked={filters.amenities.tv}
                  onChange={() => handleFilterChange('amenities', 'tv')}
                  className="mr-2"
                />
                <label htmlFor="amenity-tv">Ti Vi</label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="amenity-wifi"
                  checked={filters.amenities.wifi}
                  onChange={() => handleFilterChange('amenities', 'wifi')}
                  className="mr-2"
                />
                <label htmlFor="amenity-wifi">WiFi</label>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button onClick={resetFilters} className="bg-purple-600 text-white px-4 py-2 rounded">
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripCard: React.FC<{ trip: Trip; openTripDetails: (trip: Trip) => void; onSelectTrip: (trip: Trip) => void }> = ({ trip, openTripDetails, onSelectTrip }) => (
  <div className="border rounded-lg overflow-hidden">
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 md:col-span-2">
        <div className="font-bold text-lg">{trip.departureTime}</div>
        <div className="text-sm text-gray-500">{trip.duration}</div>
        <div className="md:hidden text-sm mt-1">• {trip.bedsAvailable} Giường</div>
        <div className="text-sm text-gray-500">Arrival Time: {trip.arrivalTime}</div>
      </div>
      <div className="col-span-12 md:col-span-5">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="font-medium">{trip.fromStation}</div>
            <div className="text-sm text-gray-500">({trip.fromCity})</div>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <CFaAngleRight />
          </div>
          <div className="col-span-5">
            <div className="font-medium">{trip.toStation}</div>
            <div className="text-sm text-gray-500">({trip.toCity})</div>
          </div>
        </div>
      </div>
      <div className="hidden md:col-span-1 md:flex items-center">{trip.bedsAvailable} Giường</div>
      <div className="col-span-12 md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-end gap-2">
        <div className="flex items-center gap-1">
          <span className="font-medium">VND {trip.adultPrice}</span>
          <CFaAngleDown />
        </div>
      </div>
      <div className="col-span-12 md:col-span-2 flex justify-end">
        <button
          onClick={() => onSelectTrip(trip)}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Chọn
        </button>
      </div>
    </div>
    <div className="bg-gray-50 p-4 grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-2 flex items-center">
        <img
          src={`https://www.easybook.com/images/train/${
            trip.operator === 'LIVITRANS' ? 'result-logo-livitrans.png' : 'cid-3382-lotus-train.png'
          }`}
          alt={trip.operator}
          className="h-12"
        />
      </div>
      <div className="col-span-12 md:col-span-7">
        <div className="font-medium">
          {trip.operator} • Train {trip.trainName} • Coach {trip.coachName}
        </div>
        <div className="flex gap-2 mt-1">
          {trip.amenities.wifi && (
            <div className="relative group">
              <span className="text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                WiFi
              </span>
            </div>
          )}
          {trip.amenities.powerPlug && (
            <div className="relative group">
              <span className="text-green-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l-7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Socket Plug
              </span>
            </div>
          )}
          {trip.amenities.food && (
            <div className="relative group">
              <span className="text-red-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 6a4 4 0 00-4-4h-3a4 4 0 00-4 4v11a1 1 0 102 0V6a2 2 0 012-2h3a2 2 0 012 2v11a1 1 0 102 0V6z" />
                  <path d="M5 5a1 1 0 100-2H4a1 1 0 000 2h1zM3 11a1 1 0 100-2H2a1 1 0 000 2h1zM5 15a1 1 0 100-2H4a1 1 0 000 2h1z" />
                </svg>
              </span>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-8 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Food On Board
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 flex justify-end items-center">
        <button onClick={() => openTripDetails(trip)} className="text-purple-600 text-sm">
          Hình ảnh | Chi tiết
        </button>
      </div>
    </div>
  </div>
);

const TripDetailsModal: React.FC<{
  selectedTrip: Trip;
  activeTab: 'details' | 'operator';
  setActiveTab: React.Dispatch<React.SetStateAction<'details' | 'operator'>>;
  closeModal: () => void;
}> = ({ selectedTrip, activeTab, setActiveTab, closeModal }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold">Chi tiết</h3>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
            <CFaTimes />
          </button>
        </div>
        <div className="mb-4 border-b">
          <div className="flex space-x-4">
            <button
              className={`pb-2 px-1 ${
                activeTab === 'details' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Trip Details
            </button>
            <button
              className={`pb-2 px-1 ${
                activeTab === 'operator' ? 'border-b-2 border-purple-600 text-purple-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('operator')}
            >
              Operator Info
            </button>
          </div>
        </div>
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-green-50 p-3 mb-4">
                <h4 className="font-bold">Thông tin khởi hành</h4>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium w-1/3">Ngày</td>
                    <td className="py-2">{selectedTrip.departureDate}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Giờ</td>
                    <td className="py-2">{selectedTrip.departureTime}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Địa điểm</td>
                    <td className="py-2">{selectedTrip.fromStation}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Địa chỉ</td>
                    <td className="py-2">{selectedTrip.fromAddress || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="bg-green-50 p-3 mb-4">
                <h4 className="font-bold">Thông tin điểm đến</h4>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium w-1/3">Ngày</td>
                    <td className="py-2">{selectedTrip.departureDate}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Giờ</td>
                    <td className="py-2">{selectedTrip.arrivalTime}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Địa điểm</td>
                    <td className="py-2">{selectedTrip.toStation}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Địa chỉ</td>
                    <td className="py-2">{selectedTrip.toAddress || '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="bg-green-50 p-3 mb-4">
                <h4 className="font-bold">Thông tin loại xe và giá vé</h4>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium w-1/3">Mã tàu</td>
                    <td className="py-2">{selectedTrip.trainName || '-'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Loại ghế</td>
                    <td className="py-2">Berth Coach</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Giá vé</td>
                    <td className="py-2">
                      Người lớn: VND {selectedTrip.adultPrice}
                      <br />
                      Trẻ em: VND {selectedTrip.childPrice}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {selectedTrip.fromLatitude && selectedTrip.fromLongitude && (
              <div>
                <div className="bg-green-50 p-3 mb-4">
                  <h4 className="font-bold">Depart Location Map</h4>
                </div>
                <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500">Map would be displayed here</span>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'operator' && (
          <div className="mt-4">
            <h1 className="text-xl font-bold">{selectedTrip.operator}</h1>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button onClick={closeModal} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
);

interface TrainSearchResultsProps {
  setSelectedOutboundTrip: React.Dispatch<React.SetStateAction<{ operator: string; departureTime: string } | null>>;
  setTripDirection: React.Dispatch<React.SetStateAction<'outbound' | 'return'>>;
  tripDirection: 'outbound' | 'return';
}

const TrainSearchResults: React.FC<TrainSearchResultsProps> = ({ setSelectedOutboundTrip, setTripDirection, tripDirection }) => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || '';
  const to = searchParams.get("to") || '';
  const departureDate = searchParams.get("departureDate") || '';
  const returnDate = searchParams.get("returnDate") || '';

  const [activeTab, setActiveTab] = useState<'details' | 'operator'>('details');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterTypes>({
    time: { morning: false, afternoon: false, evening: false, all: true },
    operator: { livitrans: false, newLivitrans: false, lotusTrain: false, all: true },
    amenities: { food: false, chair: false, socketPlug: false, tv: false, wifi: false },
    pickup: { gaHanoi: false },
    dropoff: { gaDanang: false },
  });
  const [showSeatSelectionPopup, setShowSeatSelectionPopup] = useState<boolean>(false);
  const [selectedTripForSeats, setSelectedTripForSeats] = useState<Trip | null>(null);

  const fromStation = provinces.find((p) => p.value === from);
  const toStation = provinces.find((p) => p.value === to);
  const fromLabel = fromStation ? `${fromStation.label}, Việt Nam` : 'N/A';
  const toLabel = toStation ? `${toStation.label}, Việt Nam` : 'N/A';
  const returnFromLabel = toStation ? `${toStation.label}, Việt Nam` : 'N/A';
  const returnToLabel = fromStation ? `${fromStation.label}, Việt Nam` : 'N/A';

  const outboundTrips: Trip[] = [
    {
      id: "VN-int-int-3382-1496266-3044-2023-3048-2020-202504101950-3286-0e1e3f4c-06f5-46e4-800a-c5bad5ea4269",
      departureTime: "07:50 PM",
      duration: "17 hr 11 min*",
      bedsAvailable: 16,
      arrivalTime: "13:01",
      fromStation: "Ga Hà Nội",
      fromCity: "Hà Nội",
      toStation: "Ga Đà Nẵng",
      toCity: "Đà Nẵng",
      operator: "LOTUS TRAIN",
      trainName: "",
      coachType: "B",
      coachName: "SE19: VIP 2X - Private Twin-bed Cabin",
      adultPrice: "3.600.000",
      childPrice: "3.600.000",
      amenities: {},
      isLuxury: false,
      fromAddress: "Ga Hà Nội",
      toAddress: "Ga Đà Nẵng",
      fromLatitude: 21.025062,
      fromLongitude: 105.841181,
      departureDate: "2025-04-10",
    },
    {
      id: "VN-int-int-1342-1467997-3044-2023-3048-2020-202504101920-3174-d9be515c-61d2-4807-a06f-4b8111d4f91d",
      departureTime: "07:20 PM",
      duration: "17 hr 11 min*",
      bedsAvailable: 28,
      arrivalTime: "12:31",
      fromStation: "Ga Hà Nội",
      fromCity: "Hà Nội",
      toStation: "Ga Đà Nẵng",
      toCity: "Đà Nẵng",
      operator: "LIVITRANS",
      trainName: "",
      coachType: "B",
      coachName: "TÀU SE3: HÀ NỘI - ĐÀ NẴNG 19:20",
      adultPrice: "1.850.000",
      childPrice: "1.850.000",
      amenities: { wifi: true, powerPlug: true, food: true },
      isLuxury: false,
      departureDate: "2025-04-10",
    },
    {
      id: "VN-int-int-5678-9876543-20250419-1234-abcd1234-56ef-7890-ghij5678",
      departureTime: "08:00 PM",
      duration: "20 hr 30 min*",
      bedsAvailable: 20,
      arrivalTime: "16:30",
      fromStation: "Ga Sài Gòn",
      fromCity: "Hồ Chí Minh",
      toStation: "Ga Hải Phòng",
      toCity: "Hải Phòng",
      operator: "LIVITRANS",
      trainName: "SE5",
      coachType: "B",
      coachName: "SE5: HỒ CHÍ MINH - HẢI PHÒNG 20:00",
      adultPrice: "2.200.000",
      childPrice: "2.200.000",
      amenities: { wifi: true, powerPlug: true },
      isLuxury: false,
      fromAddress: "Ga Sài Gòn",
      toAddress: "Ga Hải Phòng",
      fromLatitude: 10.780048,
      fromLongitude: 106.678491,
      departureDate: "2025-04-19",
    },
    {
      id: "VN-int-int-9999-1234567-20250419-5678-efgh5678-90ij-1234-klmn7890",
      departureTime: "06:30 PM",
      duration: "16 hr 45 min*",
      bedsAvailable: 24,
      arrivalTime: "11:15",
      fromStation: "Ga Hà Nội",
      fromCity: "Hà Nội",
      toStation: "Ga Đà Nẵng",
      toCity: "Đà Nẵng",
      operator: "LOTUS TRAIN",
      trainName: "SE7",
      coachType: "B",
      coachName: "SE7: HÀ NỘI - ĐÀ NẴNG 18:30",
      adultPrice: "3.200.000",
      childPrice: "3.200.000",
      amenities: { wifi: true, food: true },
      isLuxury: true,
      fromAddress: "Ga Hà Nội",
      toAddress: "Ga Đà Nẵng",
      fromLatitude: 21.025062,
      fromLongitude: 105.841181,
      departureDate: "2025-04-19",
    },
    {
      id: "VN-int-int-8888-7654321-20250419-4321-hijk4321-09kl-5678-mnop1234",
      departureTime: "09:00 PM",
      duration: "16 hr 30 min*",
      bedsAvailable: 18,
      arrivalTime: "13:30",
      fromStation: "Ga Hà Nội",
      fromCity: "Hà Nội",
      toStation: "Ga Đà Nẵng",
      toCity: "Đà Nẵng",
      operator: "LIVITRANS",
      trainName: "SE9",
      coachType: "B",
      coachName: "SE9: HÀ NỘI - ĐÀ NẴNG 21:00",
      adultPrice: "2.000.000",
      childPrice: "2.000.000",
      amenities: { wifi: true, powerPlug: true, food: true, tv: true },
      isLuxury: false,
      fromAddress: "Ga Hà Nội",
      toAddress: "Ga Đà Nẵng",
      fromLatitude: 21.025062,
      fromLongitude: 105.841181,
      departureDate: "2025-04-19",
    },
  ];

  const returnTrips: Trip[] = [
    {
      id: "VN-int-int-1111-2222222-20250420-3333-abcd1111-4444-5555-efgh2222",
      departureTime: "06:00 PM",
      duration: "16 hr 45 min*",
      bedsAvailable: 22,
      arrivalTime: "10:45",
      fromStation: "Ga Đà Nẵng",
      fromCity: "Đà Nẵng",
      toStation: "Ga Hà Nội",
      toCity: "Hà Nội",
      operator: "LOTUS TRAIN",
      trainName: "SE8",
      coachType: "B",
      coachName: "SE8: ĐÀ NẴNG - HÀ NỘI 18:00",
      adultPrice: "3.300.000",
      childPrice: "3.300.000",
      amenities: { wifi: true, food: true },
      isLuxury: true,
      fromAddress: "Ga Đà Nẵng",
      toAddress: "Ga Hà Nội",
      departureDate: "2025-04-20",
    },
    {
      id: "VN-int-int-2222-3333333-20250420-4444-abcd2222-5555-6666-efgh3333",
      departureTime: "08:00 PM",
      duration: "17 hr 00 min*",
      bedsAvailable: 26,
      arrivalTime: "13:00",
      fromStation: "Ga Đà Nẵng",
      fromCity: "Đà Nẵng",
      toStation: "Ga Hà Nội",
      toCity: "Hà Nội",
      operator: "LIVITRANS",
      trainName: "SE10",
      coachType: "B",
      coachName: "SE10: ĐÀ NẴNG - HÀ NỘI 20:00",
      adultPrice: "2.100.000",
      childPrice: "2.100.000",
      amenities: { wifi: true, powerPlug: true, food: true },
      isLuxury: false,
      fromAddress: "Ga Đà Nẵng",
      toAddress: "Ga Hà Nội",
      departureDate: "2025-04-20",
    },
    {
      id: "VN-int-int-3333-4444444-20250420-5555-abcd3333-6666-7777-efgh4444",
      departureTime: "09:30 PM",
      duration: "16 hr 30 min*",
      bedsAvailable: 20,
      arrivalTime: "14:00",
      fromStation: "Ga Đà Nẵng",
      fromCity: "Đà Nẵng",
      toStation: "Ga Hà Nội",
      toCity: "Hà Nội",
      operator: "LOTUS TRAIN",
      trainName: "SE12",
      coachType: "B",
      coachName: "SE12: ĐÀ NẴNG - HÀ NỘI 21:30",
      adultPrice: "3.500.000",
      childPrice: "3.500.000",
      amenities: { wifi: true, food: true, tv: true },
      isLuxury: true,
      fromAddress: "Ga Đà Nẵng",
      toAddress: "Ga Hà Nội",
      departureDate: "2025-04-20",
    },
    {
      id: "VN-int-int-3333-4444444-20250420-5555-abcd3333-6666-7777-efgh4444",
      departureTime: "09:30 PM",
      duration: "16 hr 30 min*",
      bedsAvailable: 20,
      arrivalTime: "14:00",
      fromStation: "Ga Đà Nẵng",
      fromCity: "Đà Nẵng",
      toStation: "Ga Hà Nội",
      toCity: "Hà Nội",
      operator: "LOTUS TRAIN",
      trainName: "SE12",
      coachType: "B",
      coachName: "SE12: ĐÀ NẴNG - HÀ NỘI 21:30",
      adultPrice: "3.500.000",
      childPrice: "3.500.000",
      amenities: { wifi: true, food: true, tv: true },
      isLuxury: true,
      fromAddress: "Ga Đà Nẵng",
      toAddress: "Ga Hà Nội",
      departureDate: "2025-04-28",
    },
  ];

  const generateSeatTypes = (trip: Trip): SeatType[] => {
    const coachCount = 6;
    const seatTypes: SeatType[] = [];

    for (let i = 1; i <= coachCount; i++) {
      const isSeatCoach = trip.coachName.includes("VIP") || i === 1;
      seatTypes.push({
        coach: `Toa ${i}`,
        type: isSeatCoach ? "Ngồi mềm điều hòa" : "Giường nằm khoang 6 điều hòa",
        availability: trip.bedsAvailable,
        price: `${(parseInt(trip.adultPrice.replace(/\./g, "")) / 1000)}K`,
      });
    }

    return seatTypes;
  };

  const tripsToShow = tripDirection === 'outbound' ? outboundTrips : returnTrips;

  const filteredTrips = tripsToShow.filter((trip) => {
    const departureTime = trip.departureTime;
    const [hourStr, period] = departureTime.split(' ');
    let hour = parseInt(hourStr.split(':')[0]);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const isMorning = hour >= 0 && hour < 12;
    const isAfternoon = hour >= 12 && hour < 19;
    const isEvening = hour >= 19 && hour <= 23;

    const timeMatch =
      filters.time.all ||
      (filters.time.morning && isMorning) ||
      (filters.time.afternoon && isAfternoon) ||
      (filters.time.evening && isEvening);

    const operatorMatch =
      filters.operator.all ||
      (filters.operator.livitrans && trip.operator === 'LIVITRANS') ||
      (filters.operator.newLivitrans && trip.operator === 'New Livitrans') ||
      (filters.operator.lotusTrain && trip.operator === 'LOTUS TRAIN');

    const amenitiesMatch =
      (!filters.amenities.food || trip.amenities.food) &&
      (!filters.amenities.chair || trip.amenities.massageChair) &&
      (!filters.amenities.socketPlug || trip.amenities.powerPlug) &&
      (!filters.amenities.tv || trip.amenities.tv) &&
      (!filters.amenities.wifi || trip.amenities.wifi);

    const fromMatch = tripDirection === 'outbound'
      ? (from ? trip.fromCity.toLowerCase() === (fromStation?.label.toLowerCase() || '') : true)
      : (to ? trip.fromCity.toLowerCase() === (toStation?.label.toLowerCase() || '') : true);

    const toMatch = tripDirection === 'outbound'
      ? (to ? trip.toCity.toLowerCase() === (toStation?.label.toLowerCase() || '') : true)
      : (from ? trip.toCity.toLowerCase() === (fromStation?.label.toLowerCase() || '') : true);

    const searchDate = tripDirection === 'outbound'
      ? (departureDate ? new Date(departureDate).toISOString().split('T')[0] : '')
      : (returnDate ? new Date(returnDate).toISOString().split('T')[0] : '');
    const dateMatch = searchDate ? trip.departureDate === searchDate : true;

    const pickupMatch = !filters.pickup.gaHanoi || trip.fromStation === 'Ga Hà Nội';
    const dropoffMatch = !filters.dropoff.gaDanang || trip.toStation === 'Ga Đà Nẵng';

    return timeMatch && operatorMatch && amenitiesMatch && fromMatch && toMatch && dateMatch && pickupMatch && dropoffMatch;
  });

  const resetFilters = () =>
    setFilters({
      time: { morning: false, afternoon: false, evening: false, all: true },
      operator: { livitrans: false, newLivitrans: false, lotusTrain: false, all: true },
      amenities: { food: false, chair: false, socketPlug: false, tv: false, wifi: false },
      pickup: { gaHanoi: false },
      dropoff: { gaDanang: false },
    });

  const openTripDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setActiveTab('details');
  };

  const closeModal = () => setSelectedTrip(null);

  const openSeatSelection = (trip: Trip) => {
    setSelectedTripForSeats(trip);
    setShowSeatSelectionPopup(true);
  };

  const closeSeatSelectionPopup = () => {
    setShowSeatSelectionPopup(false);
    setSelectedTripForSeats(null);
  };

  const handleContinueToReturnTrip = () => {
    if (selectedTripForSeats) {
      setSelectedOutboundTrip({
        operator: selectedTripForSeats.operator,
        departureTime: selectedTripForSeats.departureTime,
      });
      setTripDirection('return');
      closeSeatSelectionPopup();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          resetFilters={resetFilters}
        />
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {tripDirection === 'outbound' ? fromLabel : returnFromLabel}
                </span>
                <CFaLongArrowAltRight />
                <span className="font-semibold">
                  {tripDirection === 'outbound' ? toLabel : returnToLabel}
                </span>
              </div>
              <button className="md:hidden">
                <CFaEdit />
              </button>
            </div>
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm border-b pb-2">
              <div className="col-span-2 font-semibold flex items-center gap-1">
                <span>Giờ khởi hành</span>
                <CFaCaretDown />
              </div>
              <div className="col-span-4 font-semibold flex items-center gap-1">
                <span>Tuyến</span>
                <CFaSort />
              </div>
              <div className="col-span-2 font-semibold flex items-center gap-1 justify-end">
                <span>Loại ghế</span>
                <CFaSort />
              </div>
              <div className="col-span-2 font-semibold flex items-center gap-1 justify-end">
                <span>Giá vé</span>
                <CFaCaretUp />
              </div>
              <div className="col-span-2"></div>
            </div>
            <div className="space-y-6">
              {filteredTrips.length > 0 ? (
                filteredTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    openTripDetails={openTripDetails}
                    onSelectTrip={openSeatSelection}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  Không tìm thấy chuyến đi nào phù hợp với bộ lọc.
                </div>
              )}
            </div>
          </div>
        </div>
        {selectedTrip && (
          <TripDetailsModal
            selectedTrip={selectedTrip}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeModal={closeModal}
          />
        )}
      </div>

      {showSeatSelectionPopup && selectedTripForSeats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <HeaderSelection
            departure={selectedTripForSeats.fromStation}
            arrival={selectedTripForSeats.toStation}
            date={selectedTripForSeats.departureDate.split('-').reverse().join('/')}
            trainName={selectedTripForSeats.trainName || selectedTripForSeats.coachName}
            seatTypes={generateSeatTypes(selectedTripForSeats)}
            onCoachClick={(coach: string) => console.log(`Đã chọn toa: ${coach}`)}
            onClose={closeSeatSelectionPopup}
            onContinue={handleContinueToReturnTrip}
          />
        </div>
      )}
    </div>
  );
};

export default TrainSearchResults;