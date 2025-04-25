export interface TripDetails {
    departureDate: string;
    departureStation: string;
    arrivalStation: string;
    train: string;
    bedCount: number;
    adultPrice: number;
    childPrice: number;
    total: number;
    operator: string;
  }
  export interface FormErrors {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
}
export interface SelectedTrip {
  operator: string;
  departureTime: string;
  seats: string[];
  departure: string;
  arrival: string;
  date: string;
  trainName: string;
  coach: string;
  pricePerSeat: number;
}
  // Định nghĩa kiểu dữ liệu cho thông tin toa (coach) của tàu
export interface Coach {
    [x: string]: any;
    coach: string; // Tên toa, ví dụ: "Toa 1", "Toa 2",...
    type: string; // Loại toa, ví dụ: "Ngồi mềm điều hòa" hoặc "Giường nằm khoang 6 điều hòa"
    availability: number; // Số ghế còn trống trong toa, ví dụ: 11 ghế
    price: number; // Giá vé, ví dụ: 333000 hoặc 572000
    description: string;
    amenities: string[];
  }
  
  // Định nghĩa kiểu dữ liệu cho các props của component HeaderSelectionPopup
  export interface HeaderProps {
    [x: string]: any;
    departure: string; // Điểm khởi hành, ví dụ: "Ga Hà Nội"
    arrival: string; // Điểm đến, ví dụ: "Ga Đà Nẵng"
    date: string; // Ngày đi, ví dụ: "10/04/2025"
    trainName: string; // Tên tàu hoặc mã tàu, ví dụ: "SE19: VIP 2X - Private Twin-bed Cabin"
    Coach: Coach[]; // Danh sách các toa của tàu, mỗi toa có thông tin như trên
    onCoachClick?: (coach: string) => void; // Hàm callback khi người dùng click vào một toa, truyền tên toa (ví dụ: "Toa 1")
  }
  
  export interface HeaderSelectionProps {
    departure: string;
    arrival: string;
    date: string;
    trainName: string;
    coach: Coach[];
    onCoachClick: (coach: string) => void;
    onClose?: () => void;
    onContinue?: (state?: { 
      tripDirection: 'outbound' | 'return'; 
      roundTrip: boolean;
      selectedSeats?: string[];
    }) => void;
    tripDirection?: 'outbound' | 'return';
    roundTrip?: boolean;
    selectedOutboundTrip?: SelectedTrip | null;
    selectedReturnTrip?: SelectedTrip | null;
    setSelectedOutboundTrip?: React.Dispatch<React.SetStateAction<SelectedTrip | null>>;
    setSelectedReturnTrip?: React.Dispatch<React.SetStateAction<SelectedTrip | null>>;
  }
  

  export interface Seat {
    seatNumber: string;
    isAvailable: boolean;
    type: string;
    compartment?: number;
    tier?: number;
    price: number;
  }
  
  export interface SeatSelectionProps {
    coach: Coach;
    seats: Seat[];
    onSeatClick?: (seatNumber: string) => void;
    totalAvailableSeats?: number;
    onContinue?: (state?: { 
      tripDirection: 'outbound' | 'return'; 
      roundTrip: boolean;
      selectedSeats?: string[];
    }) => void;
    onBook?: (selectedSeats: string[]) => void;
    departure?: string;
    arrival?: string;
    date?: string;
    trainName?: string;
    tripDirection?: 'outbound' | 'return';
    roundTrip?: boolean;
    selectedOutboundTrip?: SelectedTrip | null;
    selectedReturnTrip?: SelectedTrip | null;
  }
  

  // Định nghĩa kiểu dữ liệu cho props của component BookingSearch
export interface BookingSearchProps {
    from: string; // Điểm đi (giá trị value của ga), ví dụ: "hanoi"
    to: string; // Điểm đến (giá trị value của ga), ví dụ: "danang"
    departureDate: Date; // Ngày đi
    returnDate: Date; // Ngày về (dành cho chuyến khứ hồi)
    passengers: string; // Số hành khách, ví dụ: "1"
    roundTrip: boolean; // Có phải chuyến khứ hồi không: true/false
  }
  
  // Định nghĩa kiểu dữ liệu cho một ga (station)
  export interface Station {
    value: string; // Giá trị của ga, ví dụ: "hanoi"
    label: string; // Tên hiển thị của ga, ví dụ: "Hà Nội"
  }

  
export interface TrainRoute {
    departure: string; // Điểm đi, ví dụ: "Sài Gòn"
    arrival: string; // Điểm đến, ví dụ: "Nha Trang"
    duration: string; // Thời gian di chuyển, ví dụ: "8h20p"
    trainNumber: string; // Mã tàu, ví dụ: "SNT2"
    price: number; // Giá vé, ví dụ: 385000
  }
  export interface FormData {
    ticketCollector: any;
    passenger: any;
    departure: { value: string; label: string } | null; // Điểm đi, ví dụ: { value: "hanoi", label: "Hà Nội" }
    destination: { value: string; label: string } | null; // Điểm đến, ví dụ: { value: "danang", label: "Đà Nẵng" }
    departureDate: Date; // Ngày đi
    returnDate: Date | null; // Ngày về (null nếu không phải khứ hồi)
    passengers: string; // Số hành khách, ví dụ: "1"
    roundTrip: boolean; // Có phải chuyến khứ hồi không
  }


  // Định nghĩa kiểu dữ liệu cho một chuyến tàu
  export interface Trip {
    forEach(arg0: (Coach: { coach: string; type: string; availability: number; }) => void): unknown;
    [x: string]: any;
    id: string; // ID của chuyến tàu, ví dụ: "VN-int-int-3382-..."
    departureTime: string; // Giờ khởi hành, ví dụ: "07:50 PM"
    duration: string; // Thời gian di chuyển, ví dụ: "17 hr 11 min*"
    bedsAvailable: number; // Số giường còn trống, ví dụ: 16
    arrivalTime: string; // Giờ đến, ví dụ: "13:01"
    fromStation: string; // Ga khởi hành, ví dụ: "Ga Hà Nội"
    fromCity: string; // Thành phố khởi hành, ví dụ: "Hà Nội"
    toStation: string; // Ga đến, ví dụ: "Ga Đà Nẵng"
    toCity: string; // Thành phố đến, ví dụ: "Đà Nẵng"
    operator: string; // Nhà điều hành, ví dụ: "LOTUS TRAIN"
    trainName: string; // Tên tàu, ví dụ: "SE19"
    coachType: string; // Loại toa, ví dụ: "B"
    coachName: string; // Tên toa, ví dụ: "SE19: VIP 2X - Private Twin-bed Cabin"
    adultPrice: number; // Giá vé người lớn, ví dụ: 3600000
    childPrice: number; // Giá vé trẻ em, ví dụ: 3600000
    amenities: amenities; // Tiện nghi trên tàu
    isLuxury: boolean; // Có phải tàu cao cấp không
    fromAddress?: string; // Địa chỉ ga đi, ví dụ: "Ga Hà Nội"
    toAddress?: string; // Địa chỉ ga đến, ví dụ: "Ga Đà Nẵng"
    fromLatitude?: number; // Vĩ độ ga đi, ví dụ: 21.025062
    fromLongitude?: number; // Kinh độ ga đi, ví dụ: 105.841181
    departureDate: string; // Ngày khởi hành, ví dụ: "2025-04-10"
  }
  export interface   amenities {
    wifi?: boolean; // Có WiFi không
    powerPlug?: boolean; // Có ổ cắm không
    food?: boolean; // Có đồ ăn không
    tv?: boolean; // Có TV không
    massageChair?: boolean; // Có ghế massage không
  };
  // Định nghĩa kiểu dữ liệu cho thông tin toa (dùng trong popup chọn ghế)

  // Định nghĩa kiểu dữ liệu cho bộ lọc thời gian
  export type TimeFilter = {
    morning: boolean; // Lọc chuyến sáng (00:00 AM - 11:59 AM)
    afternoon: boolean; // Lọc chuyến chiều (12:00 PM - 06:59 PM)
    evening: boolean; // Lọc chuyến tối (07:00 PM - 11:59 PM)
    all: boolean; // Chọn tất cả thời gian
  };
  
  // Định nghĩa kiểu dữ liệu cho bộ lọc nhà điều hành
  export type OperatorFilter = {
    livitrans: boolean; // Lọc nhà điều hành LIVITRANS
    newLivitrans: boolean; // Lọc nhà điều hành New Livitrans
    lotusTrain: boolean; // Lọc nhà điều hành LOTUS TRAIN
    all: boolean; // Chọn tất cả nhà điều hành
  };
  
  // Định nghĩa kiểu dữ liệu cho tất cả bộ lọc
  export type FilterTypes = {
    time: TimeFilter; // Bộ lọc thời gian
    operator: OperatorFilter; // Bộ lọc nhà điều hành
    amenities: Record<string, boolean>; // Bộ lọc tiện nghi (wifi, food,...)
    pickup: Record<string, boolean>; // Bộ lọc điểm đón
    dropoff: Record<string, boolean>; // Bộ lọc điểm trả
  };
  export interface TripTabsProps {
    from: string;
    to: string;
    returnFrom: string;
    returnTo: string;
    departDate: string;
    returnDate: string | null;
    roundTrip: boolean;
    selectedOutboundTrip?: { operator: string; departureTime: string; seats?: string[] } | null;
    selectedReturnTrip?: { operator: string; departureTime: string; seats?: string[] } | null;
    setTripDirection: React.Dispatch<React.SetStateAction<'outbound' | 'return'>>;
    tripDirection: 'outbound' | 'return';
  }
  

  /**
 * Interface định nghĩa dữ liệu biểu mẫu cho toàn bộ trang thanh toán.
 */
export interface FormDataPayment {
  ticketCollector: {
    salutation: string; // Quý danh (Ông/Bà)
    name: string; // Tên người đặt vé
    email: string; // Email người đặt vé
    repeatedEmail: string; // Email nhập lại để xác nhận
    contact: string; // Số điện thoại liên hệ
    nationality: string; // Quốc tịch
  };
  passenger: {
    name: string; // Tên hành khách
    gender: string; // Giới tính (M/F)
    nationality: string; // Quốc tịch hành khách
    identityType: string; // Loại giấy tờ tùy thân
    icOrPassport: string; // Số CMND/Hộ chiếu
    passengerType: string; // Loại hành khách (ADULT/CHILD)
    contact: string; // Số liên hệ của hành khách
  };
  paymentMethod: string; // Phương thức thanh toán (Momo, Payoo, ZaloPay, v.v.)
  agreeTerms: boolean; // Đồng ý với điều khoản và chính sách
  outboundTrip?: {
    totalPrice: number;
  };
  returnTrip?: {
    totalPrice: number;
  };
}

/**
 * Interface định nghĩa props cho component PassengerInfoForm.
 */
export interface PassengerInfoFormProps {
  formData: FormDataPayment; // Dữ liệu biểu mẫu chứa thông tin ticketCollector và passenger
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Hàm xử lý thay đổi giá trị input/select
  errors: { [key: string]: string }; // Đối tượng chứa các lỗi validation từ parent
}

/**
 * Interface định nghĩa props cho component PaymentOptions.
 */
export interface PaymentOptionsProps {
  formData: FormDataPayment; // Dữ liệu biểu mẫu chứa thông tin thanh toán
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Hàm xử lý thay đổi giá trị input
}

/**
 * Interface định nghĩa props cho component TripInfoCard.
 */
export interface TripInfoCardProps {
  title: string; // Tiêu đề của card (VD: Thông tin khởi hành)
  details: { [key: string]: string }; // Đối tượng chứa thông tin chi tiết (VD: Ngày khởi hành, Ga Đi, v.v.)
}

// Định nghĩa kiểu dữ liệu cho trip
export interface FillFormTrip {
  operator: string;
  departureTime: string;
  departure: string;
  arrival: string;
  date: string;
  trainName: string;
  coach: Coach;
  seats: string[];
  pricePerSeat: number | string;
  total: number;
  coachType?: string;
 
}

export interface TripData {
  operator: string;
  departureTime: string;
  seats?: string[];
  departure?: string;
  arrival?: string;
  date?: string;
  trainName?: string;
  coach?: Coach;
  pricePerSeat: number;
  totalPrice?: number;
  total: number;
  coachType?: string;

}