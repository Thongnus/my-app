const FilterSection = ({ title, children, isOpen = true }) => {
    return (
      <div className="row sf-item">
        <div className="col-sm-12">
          <div className={`title ${!isOpen && 'title-collapsed'}`}>
            <a data-toggle="collapse" data-target={`#${title.toLowerCase().replace(/\s+/g, '-')}-content`}>
              {title}
            </a>
          </div>
          <div id={`${title.toLowerCase().replace(/\s+/g, '-')}-content`} className={`collapse ${isOpen ? 'in' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterSection;