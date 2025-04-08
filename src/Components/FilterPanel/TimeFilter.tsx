const TimeFilter = () => {
    return (
      <ul className="duration-list">
        <li><input className="all search-filter duration-filter" data-filter="all" type="checkbox" /> All</li>
        <li><input className="filterDepartTimeMorning depart search-filter duration-filter" data-filter="morning" type="checkbox" /> Sáng (từ 00:00 AM - 11:59 AM)</li>
        <li><input className="filterDepartTimeAfternoon depart search-filter duration-filter" data-filter="afternoon" type="checkbox" /> Chiều (từ 12:00 PM - 06:59 PM)</li>
        <li><input className="filterDepartTimeEvening depart search-filter duration-filter" data-filter="evening" type="checkbox" /> Tối (từ 07:00 PM - 11:59 PM)</li>
      </ul>
    );
  };
  
  export default TimeFilter;