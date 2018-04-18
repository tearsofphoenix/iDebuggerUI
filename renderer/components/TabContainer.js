import React from 'react';
import Tab from './Tab';
import PropTypes from 'prop-types'

const TabContainer = ({
                        tabs = [],
                        activeTab,
                        setActiveTab,
                        closeTab
                      }) => {
  const elements = tabs.map(({ name, id }, idx) => <Tab
      key={ idx }
      name={ name }
      setActiveTab={ setActiveTab }
      id={ id }
      active={activeTab === id}
      closeTab={ closeTab }
  />)
  return (<div className="idg-tab-container">{ elements }</div>)
}

TabContainer.propTypes = {
  tabs: PropTypes.array.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.string,
  closeTab: PropTypes.func
}

export default TabContainer;
