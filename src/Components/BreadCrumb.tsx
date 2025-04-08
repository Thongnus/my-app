import React from "react";

const Breadcrumb = ({ from = "Hà Nội", fromCode = "HNO", to = "Lào Cai", toCode = "LCA" }) => {
  return (
    <div className="w-[70%]  mx-auto px-4 py-6 breadcrumb google-breadcrumb">
      <i className="fa fa-home text-gray-500" />
      <span className="text-blue-600 cursor-pointer">Trang chủ</span>
      <span>/</span>
      <span>
        Vé tàu hỏa {from} ({fromCode}) đi {to} ({toCode})
      </span>
    </div>
  );
};

export default Breadcrumb;
