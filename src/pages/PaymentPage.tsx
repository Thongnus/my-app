import React from "react";
import { useLocation } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { outboundTrip, returnTrip, outboundSeats, returnSeats } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Thanh Toán</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Thông Tin Đặt Vé</h2>
        <div className="space-y-6">
          {outboundTrip && (
            <div>
              <h3 className="text-lg font-medium mb-2">Chuyến Đi</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nhà điều hành: </span>
                  {outboundTrip.operator}
                </div>
                <div>
                  <span className="font-medium">Giờ khởi hành: </span>
                  {outboundTrip.departureTime}
                </div>
                <div>
                  <span className="font-medium">Ghế đã chọn: </span>
                  {outboundSeats?.join(", ") || "Không có ghế nào được chọn"}
                </div>
              </div>
            </div>
          )}

          {returnTrip && (
            <div>
              <h3 className="text-lg font-medium mb-2">Chuyến Về</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Nhà điều hành: </span>
                  {returnTrip.operator}
                </div>
                <div>
                  <span className="font-medium">Giờ khởi hành: </span>
                  {returnTrip.departureTime}
                </div>
                <div>
                  <span className="font-medium">Ghế đã chọn: </span>
                  {returnSeats?.join(", ") || "Không có ghế nào được chọn"}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => alert("Thanh toán thành công!")}
          >
            Xác Nhận Thanh Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;