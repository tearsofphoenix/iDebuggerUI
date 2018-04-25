import React, { PureComponent } from 'react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import PropTypes from 'prop-types'

const kMap = {
  txt: 'icon-file-text',
  jpg: 'icon-file-media',
  png: 'icon-file-media',
  gif: 'icon-file-media',
  jpeg: 'icon-file-media',
  pdf: 'icon-file-pdf',
  zip: 'icon-file-zip',
  rar: 'icon-file-zip',
  '*': 'icon-file-binary'
}

export default class FileItem extends PureComponent {
  static contextTypes = {
    downloadFile: PropTypes.func,
    renameFile: PropTypes.func,
    deleteFile: PropTypes.func,
    showContextMenu: PropTypes.func,
    hideContextMenu: PropTypes.func
  }

  handleClick = (event) => {
    event.preventDefault()
    this.context.hideContextMenu()
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    clickHandler(rest)
  }

  showContextMenu = (event) => {
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.context.showContextMenu(event, rest)
  }
  render() {
    const id = this.props._NSURLPathKey
    const name = this.props.NSURLNameKey
    const array = name.split('.')
    let ext = 'txt'
    if (array.length > 1) {
      ext = array[array.length - 1]
    }
    const className = kMap[ext] || kMap['*']

    return (<li className={ this.props.selectedID === id ? 'list-item selected' : 'list-item' }
                onClick={ this.handleClick } onContextMenu={this.showContextMenu}>
            <span className={ `icon ${className}` }>{ name }</span>
        </li>
    )
  }
}
