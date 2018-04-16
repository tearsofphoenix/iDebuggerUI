import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class View extends PureComponent {
  static propTypes = {
    selectedID: PropTypes.number,
    openIDs: PropTypes.object,
    id: PropTypes.number,
    views: PropTypes.array,
    windows: PropTypes.array,
    clickHandler: PropTypes.func
  }

  _handleClick = (event) => {
    event.preventDefault()
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.props.clickHandler(rest)
  }

  render() {
    const { id, views = [], windows = [], clickHandler } = this.props
    const { openIDs, selectedID } = this.props
    const subviews = []
    for (let i = 0; i < views.length; ++i) {
      const obj = views[i]
      subviews.push(<View key={ obj.id } selectedID={selectedID} openIDs={openIDs} { ...obj } clickHandler={ clickHandler } />)
    }
    for (let i = 0; i < windows.length; ++i) {
      const obj = windows[i]
      subviews.push(<View key={ obj.id } selectedID={selectedID} openIDs={openIDs} { ...obj } clickHandler={ clickHandler } />)
    }

    let item = (
        <div
            className="list-item"
            onClick={ this._handleClick }
        >
          <span className="icon icon-file-directory">{ this.props.class }</span>
        </div>)
    const opened = openIDs[id]
    if (opened) {
      return (
          <li className={ selectedID === id ? 'list-nested-item selected' : 'list-nested-item' }>
            { item }
            <ul className="list-tree">
              { subviews }
            </ul>
          </li>
      )
    } else {
      return (
          <li
              className={ selectedID === id ? 'list-nested-item collapsed selected' : 'list-nested-item collapsed' }
          >
            { item }
          </li>
      )
    }
  }
}
