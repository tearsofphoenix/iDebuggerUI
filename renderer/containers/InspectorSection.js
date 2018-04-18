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
  double: TextInput,

}

export default
class InspectorSection extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    changeValue: PropTypes.func
  }

  _getInput = (obj) => {
    const {type, name, value, ext} = obj
    const Cls = kMap[type] || TextInput
    if (ext) {
      const {min, max} = ext
      return (<RangeInput label={name} value={value} min={min} max={max} onChange={(event) => this.props.changeValue(event, obj)} />)
    }
    return (<Cls label={name} value={value} onChange={(event) => this.props.changeValue(event, obj)} />)
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
