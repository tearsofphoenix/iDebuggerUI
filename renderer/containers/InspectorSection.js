import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {TextInput, RangeInput, NumberInput, ColorInput, Segment, Select, Checkbox, Toggle} from '../components/Controls'

const kMap = {
  CGRect: TextInput,
  CGPoint: TextInput,
  CGAffineTransform: TextInput,
  CATransform3D: TextInput,
  UIColor: ColorInput,
  BOOL: Toggle,
  CGFloat: NumberInput,
}

export default
class InspectorSection extends PureComponent {
  static propTypes = {
    data: PropTypes.object
  }

  _getInput = (obj) => {
    const {type, name, value} = obj
    const Cls = kMap[type] || TextInput
    return (<Cls label={name} value={value} />)
  }

  render() {
    const {data: {name, props}} = this.props
    return (<section className="bordered">
      <h3>{name}</h3>
      <div className="control">
        <div className="control-rendered">
          {props.map((looper, idx) => (<div className="block" key={idx}>{this._getInput(looper)}</div>))}
        </div>
      </div>
    </section>)
  }
}
