import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Toolbar from './Toolbar'
import ViewNode from './ViewNode'

@connect(({ view }) => ({ view }))
export default class ViewPreview extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      zoomScale: 1.0,
      rotate: 0
    }
  }
  _handleViewClick = (args) => {
    this.props.dispatch({
      type: 'view/selectView',
      payload: args
    })
  }

  handleZoomIn = (event) => {
    event.preventDefault()
    const {zoomScale} = this.state
    this.setState({zoomScale: zoomScale + 0.1})
  }

  handleZoomOut = (event) => {
    event.preventDefault()
    const {zoomScale} = this.state
    this.setState({zoomScale: zoomScale - 0.1})
  }

  handleResetZoomScale = (event) => {
    event.preventDefault()
    this.setState({zoomScale: 1})
  }

  handleRotateLeft = (event) => {
    event.preventDefault()
    const {rotate} = this.state
    this.setState({rotate: rotate - 90})
  }

  handleRotateRight = (event) => {
    event.preventDefault()
    const {rotate} = this.state
    this.setState({rotate: rotate + 90})
  }

  render() {
    const { view: { snapshot, selected, previewImageURL } } = this.props
    if (snapshot) {
      const {zoomScale, rotate} = this.state

      const mainWindow = snapshot.windows[0]
      const wrapperStyle = {
        width: mainWindow.layer_bounds_w - 2,
        height: mainWindow.layer_bounds_h - 2
      }
      const mainWindowStyle = {
        width: mainWindow.layer_bounds_w - 2,
        height: mainWindow.layer_bounds_h - 2,
        left: -1,
        top: -1,
        position: 'relative',
        backgroundImage: previewImageURL,
        transform: `translate(0px, 0px) rotate(${rotate}deg) scale(${zoomScale})`
      }
      const mainView = mainWindow.views[0]
      return (<ride-pane>
        <Toolbar handleZoomIn={this.handleZoomIn} handleZoomOut={this.handleZoomOut}
                 handleResetZoomScale={this.handleResetZoomScale}
                 handleRotateLeft={this.handleRotateLeft}
                 handleRotateRight={this.handleRotateRight}
                 scale={`${Math.ceil(zoomScale * 100)}%`}
        />
        <div className="idg-preview">
          <div style={ wrapperStyle }>
            <div style={ mainWindowStyle }>
              <ViewNode { ...mainView } parents={ [mainWindow.id] } selectedID={ selected.id }
                        clickHandler={ this._handleViewClick } />
            </div>
          </div>
        </div>
      </ride-pane>)
    }
    return (<div>

    </div>)
  }
}
