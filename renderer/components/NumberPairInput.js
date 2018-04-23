import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class NumberPairInput extends PureComponent {
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
    const { label, names = [], values = [] } = this.props
    return (<div className="control-wrap">
      { label && <div className="label" style={ { marginTop: 0, width: 42, marginRight: 0 } }>{ label }</div> }
      <div className="controls" style={ { display: 'flex' } }>
        {this._renderInput(names, values, 0)}
        {this._renderInput(names, values, 1)}
      </div>
    </div>)
  }
}

export class SizeInput extends PureComponent {
  render() {
    return <NumberPairInput names={ ['width', 'height'] } { ...this.props } />
  }
}

export class PointInput extends PureComponent {
  render() {
    return <NumberPairInput names={ ['x', 'y'] } { ...this.props } />
  }
}
