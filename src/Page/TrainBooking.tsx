import { useState } from 'react';
import FilterSection from './FilterPanel/FilterSection';
import TimeFilter from './FilterPanel/TimeFilter';
import OperatorFilter from './FilterPanel/OperatorFilter';
import AmenitiesFilter from './FilterPanel/AmenitiesFilter';
import LocationFilter from './FilterPanel/LocationFilter';
import TripItem from './TripList/TripItem';
import SortBar from './SortBar';
import RouteInfo from './RouteInfo';

const TrainBooking = () => {
  const [trips, setTrips] = useState([
    {
      id: 'trip-1',
      departureTime: '10:00 PM',
      duration: '8 hr 42 min*',
      seats: 28,
      arrivalTime: '06:42',
      fromStation: 'Ga Hà Nội',
      fromCity: 'Hà Nội',
      toStation: 'Ga Lào Cai (Sapa)',
      toCity: 'Lào Cai',
      price: 780000,
      operatorLogo: 'https://www.easybook.com/images/train/result-logo-livitrans.png',
      operatorName: 'LIVITRANS',
      trainInfo: 'TÀU SP3: HÀ NỘI - LÀO CAI 22:00',
      amenities: ['wifi', 'plug', 'food'],
      classes: 'cid1342 wifi power-plug food-on-board evening gahànội galàocai'
    },
    // Thêm các chuyến khác vào đây
  ]);

  return (
    <div className="row">
      <div className="trip-list">
        <div className="col-sm-3">
          <div className="journey-sort-filter">
            {/* Filter panel */}
            <div id="journey-sf" className="collapse in">
              <div id="depart-filter-box" className="panel panel-default">
                <div className="panel-body">
                  <FilterSection title="Thời gian khởi hành">
                    <TimeFilter />
                  </FilterSection>
                  
                  <FilterSection title="Nhà Tàu (Công ty)">
                    <OperatorFilter />
                  </FilterSection>
                  
                  <FilterSection title="Tiện nghi">
                    <AmenitiesFilter />
                  </FilterSection>
                  
                  <FilterSection title="Điểm Đón Khách">
                    <LocationFilter type="pickup" locations={['Ga Hà Nội']} />
                  </FilterSection>
                  
                  <FilterSection title="Điểm Trả Khách">
                    <LocationFilter type="dropoff" locations={['Ga Lào Cai']} />
                  </FilterSection>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-9">
          <RouteInfo from="Hà Nội, Việt Nam" to="Lào Cai, Việt Nam" />
          
          <div className="row">
            <div className="col-sm-12">
              <SortBar />
              
              <div className="search-result-div">
                {trips.map(trip => (
                  <TripItem key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBooking;