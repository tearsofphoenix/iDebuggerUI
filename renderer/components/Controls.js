import React, { PureComponent } from 'react'
import { checkBOOLValue } from '../utils/convert'
import PropTypes from 'prop-types'

export const TextInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-text" type="text" { ...rest } />
  </div>
</div>)

export const RangeInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-range" type="range" { ...rest } />
  </div>
</div>)

export const NumberInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls"><input className="input-number" type="number" { ...rest } /></div>
</div>)


export class ColorInput extends PureComponent {
  static contextTypes = {
    showColorPicker: PropTypes.func
  }

  showColorPicker = (event) => {
    event.preventDefault()
    const { value, onChange } = this.props
    const callback = onChange
    this.context.showColorPicker({
      color: value,
      callback
    })
  }

  render() {
    const { label, value } = this.props
    return (<div className="control-wrap">
      <div className="label">{ label }</div>
      <div className="controls">
        <div style={ {
          backgroundColor: value, width: '16px', height: '16px',
          borderRadius: '8px', display: 'inline-block'
        } } onClick={ this.showColorPicker } />
      </div>
    </div>)
  }
}

export const Select = ({ label, options, onChange, selectStyle, ...rest }) => (<div className="control-wrap">
  { label && <div className="label">{ label }</div> }
  <div className="controls">
    <select className="input-select" style={ selectStyle } onChange={ onChange }>
      { options.map((loopper, idx) => (<option key={ idx }>{ loopper }</option>)) }
    </select>
  </div>
</div>)

export const Segment = ({ label, selected, options, onChange, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <div className="btn-group">
      { options.map((looper, idx) => (<button className={ selected === looper ? 'btn selected' : 'btn' }
                                              onClick={ () => onChange(looper) }
                                              key={ idx }>{ looper }</button>)) }
    </div>
  </div>
</div>)

export const Toggle = ({ label, value, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-toggle" type="checkbox" checked={ checkBOOLValue(value) } { ...rest } />
  </div>
</div>)

export const Checkbox = ({ label, value, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-checkbox" type="checkbox" checked={ checkBOOLValue(value) } { ...rest } />
  </div>
</div>)
