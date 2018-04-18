import React from 'react'
import Item from './Item'

export default ({data, ...rest}) => {
  const items = [
    {
      name: 'Current IP',
      value: data.CurrentIPAddress
    },
    {
      name: 'External IP',
      value: data['External IP Address']
    },
    {
      name: 'Cell IP',
      value: data.CellIPAddress
    },
    {
      name: 'Cell Broadcast Address',
      value: data.CellBroadcastAddress
    },
    {
      name: 'Cell Netmask',
      value: data.CellNetmaskAddress
    },
    {
      name: 'WiFi IP',
      value: data.WiFiIPAddress
    },
    {
      name: 'WiFi Broadcast Address',
      value: data.WiFiBroadcastAddress
    },
    {
      name: 'WiFi Netmask',
      value: data.WiFiNetmaskAddress
    },
    {
      name: 'WiFi Router',
      value: data.WiFiRouterAddress
    }
  ]
  return (<section className="bordered" {...rest}>
    <h3 style={{color: '#d6dae1'}}>Network</h3>
    <div className="control">
      <div className="control-rendered">
        { items.map((looper, idx) => <Item key={ idx } { ...looper } />) }
      </div>
    </div>
  </section>)
}
