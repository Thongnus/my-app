const RouteInfo = ({ from, to }) => {
    return (
      <div className="row">
        <div className="col-sm-12 route-info">
          <div id="depart-fromplace" style={{display: 'inline-block'}} className="ellipsis">{from}</div>
          <div style={{display: 'inline-block'}}><i className="fa fa-long-arrow-right"></i></div>
          <div id="depart-toplace" style={{display: 'inline-block'}} className="ellipsis">{to}</div>
          <div className="modify-search-icon hidden-lg hidden-md hidden-sm">
            <a data-toggle="collapse" href="#modify-search"><i className="fa fa-edit"></i></a>
          </div>
        </div>
      </div>
    );
  };
  
  export default RouteInfo;