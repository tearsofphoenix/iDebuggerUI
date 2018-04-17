import React, { PureComponent } from 'react'

export const TextInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-text" type="text" { ...rest } />
  </div>
</div>)

export const RangeInput = ({ label, value, onChange }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls"><input className="input-range" type="range" value={ value } onChange={ onChange } /></div>
</div>)

export const NumberInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls"><input className="input-number" type="number" { ...rest } /></div>
</div>)

export const ColorInput = ({ label, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls"><input className="input-color" type="color" { ...rest } /></div>
</div>)

export const Select = ({ label, options, onChange, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <select className="input-select" onChange={ onChange }>
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


function checkBOOLValue(value) {
  if (value === 'YES') {
    return true
  }
  if (value === 'NO') {
    return false
  }
  return value
}

export const Toggle = ({ label, value, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-toggle" type="checkbox" checked={checkBOOLValue(value)} { ...rest } />
  </div>
</div>)

export const Checkbox = ({ label, value, ...rest }) => (<div className="control-wrap">
  <div className="label">{ label }</div>
  <div className="controls">
    <input className="input-checkbox" type="checkbox" checked={checkBOOLValue(value)} { ...rest } />
  </div>
</div>)
