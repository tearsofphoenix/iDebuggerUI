import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * parse CGPoint from string
 *
 * @param str {String}
 * @return {Array<Number>}
 */
function parsePointString(str) {
  const array = str.split(',')
  return array.map(looper => looper.replace(/(\{|\}|\s)/g, ''))
}

function pointToString(values) {
  return `{${values[0]}, ${values[1]}}`
}

export default class NumberPairInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    names: PropTypes.array,
    values: PropTypes.array,
    onChange: PropTypes.func
  }

  constructor(props, context) {
    super(props, context)
    const { value, values } = props
    let array = []
    if (values) {
      array = values.slice(0)
    } else {
      array = parsePointString(value)
    }
    this.state = { values: array }
  }

  componentWillReceiveProps(nexProps) {
    const { value, values } = nexProps
    let array = []
    if (values) {
      array = values.slice(0)
    } else {
      array = parsePointString(value)
    }
    this.setState({values: array})
  }

  onChange = (event, index) => {
    event.preventDefault()
    const { value } = event.target
    const { values } = this.state
    const result = values.slice(0)
    result[index] = value
    this.setState({values: result})
  }

  keyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      const str = pointToString(this.state.values)
      this.props.onChange(str)
    }
  }

  _renderInput = (names, values, idx) => {
    return (<div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
      <div style={{width: '36px', marginRight: 6, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>{ names[idx] }</div>
      <input className="input-number" type="text" style={{width: '60px'}} value={ values[idx] }
             onChange={ (event) => this.onChange(event, idx) } onKeyDown={this.keyDown} />
    </div>)
  }

  render() {
    const { label, names = [] } = this.props
    const { values = [] } = this.state
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
