const SortBar = () => {
    return (
      <div className="sorting-row hidden-xs">
        <div className="row sort-row">
          <div className="col-sm-2">
            <a href="javascript:void(0);" className="sort-time sort-target" data-sort="time">
              Giờ khởi hành<i className="fa fa-caret-down"></i>
            </a>
          </div>
          <div className="col-sm-4">
            <a href="javascript:void(0);" className="sort-fromsubplace sort-target" data-sort="fromsubplace">
              Tuyến<i className="fa fa-sort"></i>
            </a>
          </div>
          <div className="col-sm-2 text-right">
            <a href="javascript:void(0);" className="sort-seatleft sort-target" data-sort="seatleft">
              Loại ghế<i className="fa fa-sort"></i>
            </a>
          </div>
          <div className="col-sm-2 col-xs-7 text-right">
            <a href="javascript:void(0);" className="sort-fare sort-target" data-sort="fare">
              Giá vé<i className="fa fa-sort"></i>
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default SortBar;