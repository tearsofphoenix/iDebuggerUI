import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import FileItem from './FileItem'

export default class DirectoryItem extends PureComponent {
  static propTypes = {
    selectedID: PropTypes.string,
    openIDs: PropTypes.object,
    contents: PropTypes.array,
    clickHandler: PropTypes.func
  }

  static contextTypes = {
    synchronizeFolder: PropTypes.func,
    downloadFile: PropTypes.func,
    renameFile: PropTypes.func,
    deleteFile: PropTypes.func,
    showContextMenu: PropTypes.func,
    hideContextMenu: PropTypes.func
  }

  _handleClick = (event) => {
    event.preventDefault()
    this.context.hideContextMenu()
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.props.clickHandler(rest)
  }

  showContextMenu = (event) => {
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.context.showContextMenu(event, rest)
  }

  render() {
    const { contents = [], clickHandler } = this.props
    const { openIDs, selectedID } = this.props
    const subviews = []
    for (let i = 0; i < contents.length; ++i) {
      const obj = contents[i]
      if (obj.NSURLIsDirectoryKey) {
        subviews.push(<DirectoryItem key={obj._NSURLPathKey} selectedID={ selectedID } openIDs={ openIDs } { ...obj } clickHandler={ clickHandler } />)
      } else {
        subviews.push(<FileItem key={ obj._NSURLPathKey } selectedID={ selectedID } openIDs={ openIDs } { ...obj } clickHandler={ clickHandler } />)
      }
    }

    const id = this.props._NSURLPathKey
    let item = (
        <div className="list-item" onClick={ this._handleClick } onContextMenu={this.showContextMenu}>
            <span className="icon icon-file-directory">{ this.props.NSURLNameKey }</span>
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
          <li className={ selectedID === id ? 'list-nested-item collapsed selected' : 'list-nested-item collapsed' }>
            { item }
          </li>
      )
    }
  }
}
