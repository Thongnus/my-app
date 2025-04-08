const OperatorFilter = () => {
    return (
      <ul className="operator-list">
        <li><input type="checkbox" className="all search-filter company-filter" data-filter="all" />All</li>
        <li><input className="cid1342 search-filter company-filter" data-filter="cid1342" type="checkbox" value="ret-1342" />LIVITRANS</li>
        <li><input className="cid6530 search-filter company-filter" data-filter="cid6530" type="checkbox" value="ret-6530" />SAPALY EXPRESS TRAIN</li>
      </ul>
    );
  };
  
  export default OperatorFilter;