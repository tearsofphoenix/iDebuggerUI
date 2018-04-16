import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class View extends PureComponent {
  static propTypes = {
    opened: PropTypes.bool,
    selectedID: PropTypes.number,
    id: PropTypes.number,
    views: PropTypes.array,
    windows: PropTypes.array,
    clickHandler: PropTypes.func
  }

  _handleClick = (event) => {
    event.preventDefault()
    this.props.clickHandler(this.props.id)
  }

  render() {
    const { opened = true, selectedID, vid, views = [], windows = [], clickHandler } = this.props
    const subviews = []
    for (let i = 0; i < views.length; ++i) {
      const obj = views[i]
      subviews.push(<View selectedID={ selectedID } { ...obj } clickHandler={clickHandler} />)
    }
    for (let i = 0; i < windows.length; ++i) {
      const obj = windows[i]
      subviews.push(<View selectedID={ selectedID } { ...obj } clickHandler={clickHandler} />)
    }

    let item = (
        <div
            className="list-item"
            onClick={ this._handleClick }
        >
          <span className="icon icon-file-directory">{ this.props.class }</span>
        </div>)
    if (opened) {
      return (
          <li className={ selectedID === vid ? 'list-nested-item selected' : 'list-nested-item' }>
            { item }
            <ul className="list-tree">
              { subviews }
            </ul>
          </li>
      )
    } else {
      return (
          <li
              className={ selectedID === vid ? 'list-nested-item collapsed selected' : 'list-nested-item collapsed' }
          >
            { item }
          </li>
      )
    }
  }
}
