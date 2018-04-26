import React, { PureComponent } from 'react'
import { connect } from 'dva'

function colorForStatusCode(code) {
  const codeColorMap = {
    2: 'green',
    3: 'yellow',
    4: 'red',
    5: 'red'
  }
  code = parseInt(code)
  return codeColorMap[Math.floor(code / 100)] || 'grey'
}

function colorForMethod(method) {
  method = method.toLowerCase()
  const colorMap = {
    post: '#49cc90',
    get: '#61affe',
    delete: '#f93e3e',
    put: '#fca130'
  }
  return colorMap[method] || '#ebebeb'
}

@connect(({ network }) => ({ network }))
export default class List extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'network/listRequests'
    })
  }
  selectNetworkRequest = (idx) => {
    this.props.dispatch({
      type: 'network/selectRequest',
      payload: idx
    })
  }
  _renderItem = (info, idx, selectedID) => {
    const { request, response, startDate } = info
    const color = colorForStatusCode(response.status)
    const methodColor = colorForMethod(request.method)
    const methodStyle = {
      width: 30,
      background: methodColor,
      color: 'white',
      textAlign: 'center',
      marginRight: 10,
      borderRadius: 2
    }

    const className = (info.id === selectedID) ? 'idg-network-item idg-network-item-active' : 'idg-network-item'
    return (<div key={ idx } onClick={ () => this.selectNetworkRequest(idx) } className={className}>
      <div className="idg-flex" style={{marginBottom: 4}}>
        <div style={methodStyle}>{ request.method }</div>
        <div className="idg-flex" style={{alignItems: 'center', color: '#e9eef5'}}>{ request.url }</div>
      </div>
      <div className="idg-flex">
        <div style={{color, width: 30, marginRight: 10}}>{ response.status }</div>
        <div>{ startDate }</div>
      </div>
    </div>)
  }

  render() {
    const { network: { requests, selected } } = this.props
    return (<div className="tree-view-resizer tool-panel">
      <div className="tree-view-scroller">
        { requests.map((looper, idx) => this._renderItem(looper, idx, selected.id)) }
      </div>
    </div>)
  }
}
