import React from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { provinces } from '../Data.js/provinces';
import { TripTabsProps } from "../Entity/Entity";

const CFaCheckCircle = FaCheckCircle as unknown as React.FC<React.SVGProps<SVGSVGElement>>;


const TripTabs: React.FC<TripTabsProps> = ({
  from,
  to,
  returnFrom,
  returnTo,
  departDate,
  returnDate,
  roundTrip,
  selectedOutboundTrip,
  selectedReturnTrip,
  setTripDirection,
  tripDirection,
}) => {
  const fromStation = provinces.find((p) => p.value === from);
  const toStation = provinces.find((p) => p.value === to);
  const returnFromStation = provinces.find((p) => p.value === returnFrom);
  const returnToStation = provinces.find((p) => p.value === returnTo);

  const fromLabel = fromStation ? fromStation.label : from || 'N/A';
  const toLabel = toStation ? toStation.label : to || 'N/A';
  const returnFromLabel = returnFromStation ? returnFromStation.label : returnFrom || 'N/A';
  const returnToLabel = returnToStation ? returnToStation.label : returnTo || 'N/A';

  const showReturnTab = roundTrip && returnDate;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex rounded-xl overflow-hidden shadow-md bg-[#303033] text-white">
        <div
          className={`px-6 py-5 bg-[#303033] text-white font-bold cursor-pointer ${
            showReturnTab ? 'flex-1' : 'w-full'
          } ${tripDirection === 'outbound' ? 'bg-gray-700' : ''}`}
          onClick={() => setTripDirection('outbound')}
        >
          <div className="text-sm font-semibold mb-2 flex items-center gap-2">
            <span>Chuyến đi</span>
            {selectedOutboundTrip && selectedOutboundTrip.seats && selectedOutboundTrip.seats.length > 0 && (
              <CFaCheckCircle className="text-green-400" />
            )}
          </div>
          <div className="text-lg flex items-center gap-3">
            <span className="truncate">{fromLabel}</span>
            <i className="fa fa-long-arrow-right text-gray-300" />
            <span className="truncate">{toLabel}</span>
          </div>
          <div className="mt-3 text-sm">
            <span>Ngày đi: {departDate}</span>
          </div>
          {selectedOutboundTrip && (
            <div className="mt-2 text-sm">
              <span>{selectedOutboundTrip.operator} • {selectedOutboundTrip.departureTime}</span>
            </div>
          )}
        </div>

        {showReturnTab && (
          <>
            <div className="w-0 h-0 border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[15px] border-l-gray-300 bg-[#303033]"></div>

            <div
              className={`flex-1 px-6 py-5 bg-[#303033] text-white font-bold cursor-pointer ${
                tripDirection === 'return' ? 'bg-gray-700' : ''
              }`}
              onClick={() => setTripDirection('return')}
            >
              <div className="text-sm font-semibold mb-2 flex items-center gap-2">
                <span>Chuyến về</span>
                {selectedReturnTrip && selectedReturnTrip.seats && selectedReturnTrip.seats.length > 0 && (
                  <CFaCheckCircle className="text-green-400" />
                )}
              </div>
              <div className="text-lg flex items-center gap-3">
                <span className="truncate">{returnFromLabel}</span>
                <i className="fa fa-long-arrow-right text-gray-300" />
                <span className="truncate">{returnToLabel}</span>
              </div>
              <div className="mt-3 text-sm">
                <span>Ngày về: {returnDate}</span>
              </div>
              {selectedReturnTrip && (
                <div className="mt-2 text-sm">
                  <span>{selectedReturnTrip.operator} • {selectedReturnTrip.departureTime}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripTabs;