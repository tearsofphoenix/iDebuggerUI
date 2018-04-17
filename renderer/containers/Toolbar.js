import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Toolbar extends PureComponent {
  static propTypes = {
    handleZoomIn: PropTypes.func,
    handleZoomOut: PropTypes.func,
    handleResetZoomScale: PropTypes.func,
    handleRotateLeft: PropTypes.func,
    handleRotateRight: PropTypes.func,
    scale: PropTypes.string
  }

  render() {
    const {
      handleZoomIn, handleZoomOut, handleResetZoomScale,
      handleRotateRight, handleRotateLeft, scale
    } = this.props
    return (<div className="idg-toolbar">
      <div className="idg-toolbar-left">
        <div className="icon-plus idg-toolbar-icon" onClick={handleZoomIn} />
        <div className="icon-dash idg-toolbar-icon" onClick={handleZoomOut} />
        <div className="icon-browser idg-toolbar-icon" onClick={handleResetZoomScale} />
        <div style={{marginLeft: 10}}>{scale}</div>
      </div>
      <div className="idg-space" />
      <div className="idg-toolbar-right">
        <div className="idg-toolbar-icon" onClick={handleRotateLeft}>↺</div>
        <div className="idg-toolbar-icon" onClick={handleRotateRight}>↻</div>
      </div>
    </div>)
  }
}
