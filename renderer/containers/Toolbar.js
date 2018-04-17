import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Toolbar extends PureComponent {
  static propTypes = {
    handleZoomIn: PropTypes.func,
    handleZoomOut: PropTypes.func,
    handleResetZoomScale: PropTypes.func,
    handleRotateLeft: PropTypes.func,
    handleRotateRight: PropTypes.func,
  }

  render() {
    const {handleZoomIn, handleZoomOut, handleResetZoomScale, handleRotateRight, handleRotateLeft} = this.props
    return (<div className="idg-toolbar">
      <div className="idg-toolbar-left">
        <div className="icon-diff-added idg-toolbar-icon" onClick={handleZoomIn} />
        <div className="icon-diff-removed idg-toolbar-icon" onClick={handleZoomOut} />
        <div className="icon-browser idg-toolbar-icon" onClick={handleResetZoomScale} />
      </div>
      <div className="idg-space" />
      <div className="idg-toolbar-right">
        <div className="idg-toolbar-icon" onClick={handleRotateLeft}>↺</div>
        <div className="idg-toolbar-icon" onClick={handleRotateRight}>↻</div>
      </div>
    </div>)
  }
}
