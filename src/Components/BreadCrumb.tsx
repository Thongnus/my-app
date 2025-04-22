import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // useLocation để lấy đường dẫn hiện tại, Link để tạo liên kết điều hướng

const Breadcrumb: React.FC = () => {
    // Lấy thông tin đường dẫn hiện tại
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x); // Chia đường dẫn thành mảng, loại bỏ phần tử rỗng

    // Tạo danh sách các mục trong breadcrumb
    const breadcrumbItems = [
        { path: '/', label: 'Trang Chủ' }, // Mục đầu tiên luôn là Trang Chủ
        ...pathnames.map((value, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`; // Đường dẫn của mục: ví dụ "/train-search-results"
            const label = value.charAt(0).toUpperCase() + value.slice(1); // Tên hiển thị: viết hoa chữ cái đầu, ví dụ: "Train-search-results"
            return { path, label };
        }),
    ];

    return (
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="flex space-x-2">
                {breadcrumbItems.map((item, index) => (
                    <li key={item.path} className="flex items-center">
                        {index < breadcrumbItems.length - 1 ? (
                            <>
                                {/* Hiển thị liên kết cho các mục không phải mục cuối */}
                                <Link to={item.path} className="text-gray-500 hover:underline">
                                    {item.label}
                                </Link>
                                <span className="mx-2 text-gray-500">/</span> {/* Dấu phân cách giữa các mục */}
                            </>
                        ) : (
                            // Mục cuối cùng không có liên kết, chỉ hiển thị text
                            <span className="text-gray-700">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;