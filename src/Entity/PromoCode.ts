export interface PromoCode {
  code: string;           // Mã giảm giá
  description: string;    // Mô tả mã giảm giá
  discountType: 'PERCENTAGE' | 'FIXED';  // Loại giảm giá: phần trăm hoặc cố định
  discountValue: number;  // Giá trị giảm giá (phần trăm hoặc số tiền cố định)
  minOrderValue?: number; // Giá trị đơn hàng tối thiểu để áp dụng
  maxDiscount?: number;   // Giá trị giảm tối đa
  startDate: Date;       // Ngày bắt đầu hiệu lực
  endDate: Date;         // Ngày kết thúc hiệu lực
  isActive: boolean;     // Trạng thái hoạt động
  isPublic: boolean;     // Mã công khai cho tất cả người dùng
  userId?: string;       // ID người dùng (nếu là mã riêng)
  usageLimit?: number;   // Giới hạn số lần sử dụng
  usedCount?: number;    // Số lần đã sử dụng
  category?: string;     // Danh mục mã giảm giá
}

// Danh sách mã giảm giá mẫu
export const samplePromoCodes: PromoCode[] = [
  {
    code: 'WELCOME10',
    description: 'Giảm 10% cho lần đặt vé đầu tiên',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrderValue: 500000,
    maxDiscount: 200000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 1,
    usedCount: 0,
    category: 'New User'
  },
  {
    code: 'SUMMER20',
    description: 'Giảm 20% cho chuyến đi mùa hè',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minOrderValue: 1000000,
    maxDiscount: 500000,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 1000,
    usedCount: 0,
    category: 'Seasonal'
  },
  {
    code: 'TRAIN100K',
    description: 'Giảm 100.000 VNĐ cho mọi chuyến tàu',
    discountType: 'FIXED',
    discountValue: 100000,
    minOrderValue: 500000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 2000,
    usedCount: 0,
    category: 'General'
  },
  {
    code: 'VIP500K',
    description: 'Giảm 500.000 VNĐ cho khách hàng VIP',
    discountType: 'FIXED',
    discountValue: 500000,
    minOrderValue: 3000000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: false,
    userId: 'VIP_USER_ID',
    usageLimit: 1,
    usedCount: 0,
    category: 'VIP'
  },
  {
    code: 'WEEKEND15',
    description: 'Giảm 15% cho chuyến đi cuối tuần',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 800000,
    maxDiscount: 300000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 500,
    usedCount: 0,
    category: 'Weekend'
  },
  {
    code: 'FIRST50K',
    description: 'Giảm 50.000 VNĐ cho lần đặt vé đầu tiên',
    discountType: 'FIXED',
    discountValue: 50000,
    minOrderValue: 300000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 1,
    usedCount: 0,
    category: 'New User'
  },
  {
    code: 'HOLIDAY30',
    description: 'Giảm 30% cho chuyến đi ngày lễ',
    discountType: 'PERCENTAGE',
    discountValue: 30,
    minOrderValue: 2000000,
    maxDiscount: 1000000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 200,
    usedCount: 0,
    category: 'Holiday'
  },
  {
    code: 'TRAIN50K',
    description: 'Giảm 50.000 VNĐ cho mọi chuyến tàu',
    discountType: 'FIXED',
    discountValue: 50000,
    minOrderValue: 100000, // Chỉ cần đơn hàng từ 100.000đ
    startDate: new Date('2024-01-01'),
    endDate: new Date('2026-12-31'),
    isActive: true,
    isPublic: true,
    usageLimit: 1000,
    usedCount: 0,
    category: 'General'
  }
]; 