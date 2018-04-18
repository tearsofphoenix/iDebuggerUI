import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ name, active, setActiveTab, id, closeTab }) => {
  const className = active ? 'idg-tab idg-tab-active' : 'idg-tab'
  return (
      <div className={ className } onClick={ setActiveTab.bind(null, id) }>
        <div className="title">{ name }</div>
        { closeTab && <div className="close-icon" onClick={ closeTab.bind(null, id) } /> }
      </div>
  );
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  id: PropTypes.any,
  closeTab: PropTypes.func,
  active: PropTypes.bool
};

export default Tab;
