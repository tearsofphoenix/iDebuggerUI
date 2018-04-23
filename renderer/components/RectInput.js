import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class RectInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    names: PropTypes.array,
    values: PropTypes.array,
    onChange: PropTypes.func
  }
  onChange = (event, index) => {
    event.preventDefault()
    const { value } = event.target
    const { values, onChange } = this.props
    const result = values.slice(0)
    result[index] = value
    onChange(result)
  }

  _renderInput = (names, values, idx) => {
    return (<div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
      <div style={{width: '36px', marginRight: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>{ names[idx] }</div>
      <input className="input-number" type="text" style={{width: '60px'}} value={ values[idx] }
             onChange={ (event) => this.onChange(event, idx) } />
    </div>)
  }

  render() {
    const { label, names = ['x', 'y', 'width', 'height'], values = [] } = this.props
    return (<div className="control-wrap" style={ { alignItems: 'flex-start' } }>
      { label && <div className="label" style={ { marginTop: 0, width: 42, marginRight: 0 } }>{ label }</div> }
      <div style={ { display: 'flex', flexDirection: 'column', height: '58px' } }>
        <div className="controls" style={ { display: 'flex', marginBottom: 6 } }>
          {this._renderInput(names, values, 0)}
          {this._renderInput(names, values, 1)}
        </div>
        <div className="controls" style={ { display: 'flex' } }>
          {this._renderInput(names, values, 2)}
          {this._renderInput(names, values, 3)}
        </div>
      </div>
    </div>)
  }
}
