import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { SketchPicker } from 'react-color'
import InspectorSection from './InspectorSection'
import { checkBOOLValue } from '../utils/convert'

@connect(({ view, app }) => ({ view, app }))
export default class Inspector extends PureComponent {
  static propTypes = {}
  static childContextTypes = {
    showColorPicker: PropTypes.func
  }

  getChildContext() {
    return {
      showColorPicker: this.showColorPicker
    }
  }

  constructor() {
    super()
    this.state = {
      showColorPicker: false,
      initColor: '#000000',
      choosedColor: '#000000',
      didCloseColorPicker: () => false
    }
  }

  showColorPicker = ({ color, callback }) => {
    this.setState({
      showColorPicker: true,
      initColor: color,
      didCloseColorPicker: callback
    })
  }
  changeValue = (event, obj) => {
    const { view: { selected } } = this.props
    let value = null
    if (event.preventDefault) {
      event.preventDefault()

      value = event.target.value
      console.log(13, value)
      if (obj.type === 'BOOL') {
        // convert to real value
        value = !checkBOOLValue(obj.value)
      }
      const {ext = {}} = obj
      const {scale} = ext
      if (scale) {
        console.log(53, scale)
        value = Math.ceil(parseFloat(value) / scale)
      }
    } else {
      // for color
      value = event
    }
    this.props.dispatch({
      type: 'view/updateProperty',
      payload: {
        target: selected.id,
        property: obj,
        value
      }
    })
  }
  closeColorPicker = () => {
    const { didCloseColorPicker, choosedColor } = this.state
    if (didCloseColorPicker) {
      didCloseColorPicker(choosedColor)
    }
    this.setState({
      showColorPicker: false,
      didCloseColorPicker: () => false,
      choosedColor: '#000000'
    })
  }

  handleColorChange = (color, event) => {
    this.setState({ choosedColor: color.hex })
  }

  render() {
    const { view: { selected } } = this.props
    const { showColorPicker, choosedColor } = this.state
    const { props = [] } = selected
    let content = null
    if (props.length > 0) {
      content = props.map((looper, idx) => <InspectorSection data={ looper } key={ idx }
                                                             changeValue={ this.changeValue } />)
    } else {
      content = (<div className="empty">No Selection</div>)
    }
    return (<div className="item-views">
      {
        showColorPicker && <div style={ { zIndex: 1 } }>
          <div style={ { position: 'absolute', width: '100%', height: '100%' } } onClick={ this.closeColorPicker } />
          <SketchPicker color={ choosedColor } onChange={ this.handleColorChange } />
        </div>
      }
      <div className="styleguide pane-item">
        <header className="styleguide-header">
          <h5>View Inspector</h5>
        </header>
        <main className="styleguide-sections">
          { content }
        </main>
      </div>
    </div>)
  }
}
