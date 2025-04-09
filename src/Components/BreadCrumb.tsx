import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";

type BreadcrumbItem = {
  path: string;
  name: string;
};
const CHiHome = HiHome as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const Breadcrumb = () => {
  const location = useLocation();
  
  // Tạo breadcrumbs dựa trên URL
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  const breadcrumbs: BreadcrumbItem[] = pathnames.map((path, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    return {
      path: routeTo,
      name: path.replace(/-/g, " "), // Chuyển vi-dụ thành "vi dụ"
    };
  });

  // Thêm logic đặc biệt cho các route cụ thể
  const getDisplayName = (path: string) => {
    switch(path) {
      case "login": return "Đăng nhập";
      case "register": return "Đăng ký";
      case "train-tickets": return "Vé tàu hỏa";
      default: return path;
    }
  };
  return (
    <div className="w-[70%] mx-auto px-4 py-6 flex items-center gap-2 text-sm">
      <Link to="/" className="text-blue-600 hover:underline flex items-center gap-1">
        <CHiHome className="text-gray-500" />
        Trang chủ
      </Link>
      
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          <span>/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-600 capitalize">
              {getDisplayName(crumb.name)}
            </span>
          ) : (
            <Link 
              to={crumb.path} 
              className="text-blue-600 hover:underline capitalize"
            >
              {getDisplayName(crumb.name)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;