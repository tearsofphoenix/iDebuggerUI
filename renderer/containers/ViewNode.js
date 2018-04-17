import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ViewNode extends PureComponent {
  static propTypes = {
    parentBoundsX: PropTypes.number,
    parentBoundsY: PropTypes.number,
    selectedID: PropTypes.number,
    id: PropTypes.number,
    views: PropTypes.array,
    windows: PropTypes.array,
    clickHandler: PropTypes.func,
    parents: PropTypes.array
  }

  _handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const {parentBoundsX, parentBoundsY, selectedID, clickHandler, ...rest} = this.props
    clickHandler(rest)
  }

  render() {
    const {
      parentBoundsX = 0, parentBoundsY = 0, layer_position_x = 0, layer_position_y = 0,
      layer_bounds_x = 0, layer_bounds_y = 0, layer_bounds_w = 0, layer_bounds_h = 0,
      layer_anchor_x = 0, layer_anchor_y = 0,
      layer_transform,
      views = [],
      selectedID,
      id, clickHandler, parents = []
    } = this.props

    const leftOffset = parentBoundsX
    const topOffset = parentBoundsY
    const style = {
      position: 'absolute',
      cursor: 'crosshair',
      border: '1px solid transparent',
      left: layer_position_x - layer_bounds_w * layer_anchor_x - leftOffset - 1,
      top: layer_position_y - layer_bounds_h * layer_anchor_y - topOffset - 1,
      width: layer_bounds_w - 2,
      height: layer_bounds_h - 2,
      transform: `matrix3d(${layer_transform})`
    }

    if (selectedID == id) {
      style.background = 'yellow'
      style.opacity = 0.8
    }

    const subviews = []
    for (let i = 0; i < views.length; ++i) {
      const obj = views[i]
      subviews.push(<ViewNode key={ obj.id } parentBoundsX={ layer_bounds_x }
                              parentBoundsY={ layer_bounds_y }
                              selectedID={selectedID} clickHandler={clickHandler}
                              parents={[id, ...parents]}
                              { ...obj }
      />)
    }
    return (<div style={ style } className="idg-view-node" onClick={this._handleClick}>{ subviews }</div>)
  }
}
