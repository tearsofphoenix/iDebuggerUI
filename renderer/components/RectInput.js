import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * parse CGRect from string
 *
 * @param str {String}
 * @return {Array<Number>}
 */
function parseRectString(str) {
  const array = str.split(',')
  return array.map(looper => looper.replace(/(\{|\}|\s)/g, ''))
}

/**
 * @param array {Array}
 * @return {String}
 */
function arrayToRectString(array) {
  const x = array[0]
  const y = array[1]
  const w = array[2]
  const h = array[3]
  return `{{${x}, ${y}}, {${w}, ${h}}}`
}

export default class RectInput extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    names: PropTypes.array,
    value: PropTypes.string,
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
      array = parseRectString(value)
    }
    this.state = { values: array }
  }

  componentWillReceiveProps(nexProps) {
    const { value, values } = nexProps
    let array = []
    if (values) {
      array = values.slice(0)
    } else {
      array = parseRectString(value)
    }
    this.setState({values: array})
  }

  onChange = (event, index) => {
    event.preventDefault()
    const { value } = event.target
    const { values } = this.state
    const result = values.slice(0)
    result[index] = value
    this.setState({ values: result })
  }

  keyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault()
      const { onChange } = this.props
      onChange(arrayToRectString(this.state.values))
    }
  }

  _renderInput = (names, values, idx) => {
    return (<div style={ { display: 'flex', flex: 1, justifyContent: 'flex-end' } }>
      <div style={ {
        width: '36px',
        marginRight: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      } }>{ names[idx] }</div>
      <input className="input-number" type="text" style={ { width: '60px' } } value={ values[idx] }
             onChange={ (event) => this.onChange(event, idx) } onKeyDown={ this.keyDown } />
    </div>)
  }

  render() {
    const { label, names = ['x', 'y', 'width', 'height'] } = this.props
    const { values } = this.state
    return (<div className="control-wrap" style={ { alignItems: 'flex-start' } }>
      { label && <div className="label" style={ { marginTop: 0, width: 42, marginRight: 0 } }>{ label }</div> }
      <div style={ { display: 'flex', flexDirection: 'column', height: '58px' } }>
        <div className="controls" style={ { display: 'flex', marginBottom: 6 } }>
          { this._renderInput(names, values, 0) }
          { this._renderInput(names, values, 1) }
        </div>
        <div className="controls" style={ { display: 'flex' } }>
          { this._renderInput(names, values, 2) }
          { this._renderInput(names, values, 3) }
        </div>
      </div>
    </div>)
  }
}
