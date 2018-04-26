import React, { PureComponent } from 'react'
import { connect } from 'dva'
import JSONView from 'react-json-view'
import {headersToJSON} from '../../utils/shared'

const kEmptyString = '---'
const wrapperStyle = {
  flexDirection: 'column',
  overflowY: 'scroll',
  padding: '60px 0 0 40px',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
}

@connect(({ network }) => ({ network }))
export default class Preview extends PureComponent {
  render() {
    const { network: { selected } } = this.props
    const { request = {}, response = {} } = selected
    const sectionStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      overflowY: 'hidden'
    }
    const itemStyle = {
      height: 30,
      lineHeight: '30px',
      fontSize: '14px',
      display: 'flex'
    }
    const labelStyle = {
      width: '120px',
      marginRight: 16,
      textAlign: 'right'
    }
    const d1 = [
      {
        label: 'URL:',
        value: request.url
      },
      {
        label: 'Cache Policy:',
        value: request.cachePolicy || kEmptyString
      },
      {
        label: 'Timeout:',
        value: request.timeout
      },
      {
        label: 'Method:',
        value: request.method
      },
      {
        label: 'Body:',
        value: request.body || kEmptyString
      }
    ]
    const d2 = [
      {
        label: 'MIME:',
        value: response.MIME || kEmptyString
      },
      {
        label: 'Content Length:',
        value: response.contentLength || kEmptyString
      },
      {
        label: 'Encoding:',
        value: response.encoding || kEmptyString
      },
      {
        label: 'Body:',
        value: response.body || kEmptyString
      },
      {
        label: 'Status Code:',
        value: response.status || kEmptyString
      }
    ]
    return (<ride-pane>
      <div className="idg-preview" style={wrapperStyle}>
        <div style={ itemStyle }>
          <span style={ labelStyle }>Start Date</span>
          <span>{ selected.startDate }</span>
        </div>
        <div style={itemStyle}>
          <span style={labelStyle}>End Date</span>
          <span>{ selected.endDate }</span>
        </div>
        <div className="react-contextmenu-item--divider" />
        <div style={ sectionStyle }>
          <h4>Request</h4>
          <div style={{marginBottom: 40}}>
            {
              d1.map((looper, idx) => (<div key={ idx } style={ itemStyle }>
                <span style={ labelStyle }>{ looper.label }</span>
                <span>{ looper.value }</span>
              </div>))
            }
            <div style={ itemStyle }>
              <span style={ labelStyle }>Headers</span>
            </div>
            <JSONView src={headersToJSON(request.headers)} theme="monokai" displayDataTypes={false} enableEdit={false} />
          </div>
        </div>
        <div className="react-contextmenu-item--divider" />
        <div style={ sectionStyle }>
          <h4>Response</h4>
          <div style={{marginBottom: 40}}>
            {
              d2.map((looper, idx) => (<div key={ idx } style={ itemStyle }>
                <span style={ labelStyle }>{ looper.label }</span>
                <span>{ looper.value }</span>
              </div>))
            }
            <div style={ itemStyle }>
              <span style={ labelStyle }>Headers</span>
            </div>
            <JSONView src={headersToJSON(response.headers)} theme="monokai" displayDataTypes={false} enableEdit={false} />
          </div>
        </div>
      </div>
    </ride-pane>)
  }
}
