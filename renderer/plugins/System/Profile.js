import React from 'react'
import Item from './Item'

export default ({ data, ...rest }) => {
  const items = [
    {
      name: 'System Name',
      value: data.SystemName
    },
    {
      name: 'Device Name',
      value: data.DeviceName
    },
    {
      name: 'Screen Size',
      value: `${data.ScreenWidth || 0} x ${data.ScreenHeight || 0}`
    },
    {
      name: 'Time Zone',
      value: data.TimeZone
    },
    {
      name: 'Step Counting',
      value: data.StepCountingAvailable
    },
    {
      name: 'Free Disk',
      value: `${data['FreeDiskSpace (Not Formatted)'] || 0} ( ${data['FreeDiskSpace (Formatted)'] || 0} )`
    }
  ]

  return (<section className="bordered" {...rest}>
    <h3 style={{color: '#d6dae1'}}>Profile</h3>
    <div className="control">
      <div className="control-rendered">
        { items.map((looper, idx) => <Item key={ idx } { ...looper } />) }
      </div>
    </div>
  </section>)
}
