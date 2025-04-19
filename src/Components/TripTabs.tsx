import React from 'react';
import { provinces } from '../Data.js/provinces';

interface TripTabsProps {
  from: string;
  to: string;
  returnFrom: string;
  returnTo: string;
  departDate: string;
  returnDate: string | null;
  roundTrip: boolean;
}

const TripTabs: React.FC<TripTabsProps> = ({
  from,
  to,
  returnFrom,
  returnTo,
  departDate,
  returnDate,
  roundTrip,
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
          className={`px-6 py-5 bg-[#303033] text-white font-bold ${
            showReturnTab ? 'flex-1' : 'w-full'
          }`}
        >
          <div className="text-sm font-semibold mb-2">Chuyến đi</div>
          <div className="text-lg flex items-center gap-3">
            <span className="truncate">{fromLabel}</span>
            <i className="fa fa-long-arrow-right text-gray-300" />
            <span className="truncate">{toLabel}</span>
          </div>
          <div className="mt-3 text-sm">
            <span>Ngày đi: {departDate}</span>
          </div>
        </div>

        {showReturnTab && (
          <>
            <div className="w-0 h-0 border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[15px] border-l-gray-300 bg-[#303033]"></div>

            <div className="flex-1 px-6 py-5 bg-[#303033] text-white font-bold">
              <div className="text-sm font-semibold mb-2">Chuyến về</div>
              <div className="text-lg flex items-center gap-3">
                <span className="truncate">{returnFromLabel}</span>
                <i className="fa fa-long-arrow-right text-gray-300" />
                <span className="truncate">{returnToLabel}</span>
              </div>
              <div className="mt-3 text-sm">
                <span>Ngày về: {returnDate}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripTabs;