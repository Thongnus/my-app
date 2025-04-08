const TripItem = ({ trip }) => {
    return (
      <div id={trip.id} className={`result-list ${trip.classes}`} data-seatleft={trip.seats}>
        <div className="row">
          <div className="col-sm-2">
            <div className="depart-time">{trip.departureTime}</div>
            <div className="trip-duration">{trip.duration}</div>
            <div className="vacancy hidden-lg hidden-md hidden-sm">{trip.seats} Giường</div>
            <div className="arrival-time">Arrival Time: {trip.arrivalTime}</div>
          </div>
          
          {/* Route information */}
          <div className="col-sm-5">
            <div className="row route">
              <div className="col-xs-5">
                <div className="route-subplace">{trip.fromStation}</div>
                <div className="route-place">({trip.fromCity})</div>
              </div>
              <div className="col-xs-2 route-to">
                <i className="fa fa-angle-right"></i>
              </div>
              <div className="col-xs-5">
                <div className="route-subplace">{trip.toStation}</div>
                <div className="route-place">({trip.toCity})</div>
              </div>
            </div>
          </div>
          
          {/* Price and booking */}
          <div className="col-sm-2 col-xs-7">
            <div className="ticket-price">
              <div style={{display: 'inline-block'}}>
                <div className="price-icon">
                  <span className="price">
                    <i className="icon-adult"></i> VND {trip.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-sm-2 col-xs-5 text-right">
            <button className="btn btn-lg btn-orange get-seat-plan">Chọn</button>
          </div>
        </div>
        
        {/* Additional info */}
        <div className="row additional-info">
          <div className="col-sm-2 col-xs-3">
            <img src={trip.operatorLogo} alt={trip.operatorName} />
          </div>
          <div className="col-sm-5 col-xs-9">
            <div className="coach-info">
              <span className="coachname">{trip.operatorName} • {trip.trainInfo}</span>
              <span className="features">
                {trip.amenities.map(amenity => (
                  <i key={amenity} className={`fa icon-${amenity}`}></i>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default TripItem;