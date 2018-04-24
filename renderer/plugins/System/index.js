import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Network from './Network'
import Memory from './Memory'
import Profile from './Profile'

export const kSectionStyle = {
  flex: 1,
  paddingLeft: '40px',
  paddingTop: 0,
  borderLeft: '1px solid #1a1d23',
  marginRight: 30
}

@connect(({ system }) => ({ system }))
export default class System extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'system/getSystemInfo'
    })
  }

  render() {
    const { system: { info } } = this.props
    return (<div style={ { display: 'flex', width: '100%' } }>
      <Profile data={ info } style={kSectionStyle} />
      <Network data={ info } style={kSectionStyle}  />
      <Memory data={ info }  style={kSectionStyle} />
    </div>)
  }
}
