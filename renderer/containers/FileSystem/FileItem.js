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
    deleteFile: PropTypes.func
  }

  handleClick = (event) => {
    event.preventDefault()
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    clickHandler(rest)
  }

  _handleDownload = () => {
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.context.downloadFile(rest)
  }

  _handleRename = () => {
    console.log(36, this.context)
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.context.renameFile(rest)
  }

  _handleDelete = () => {
    const { clickHandler, selectedID, openIDs, ...rest } = this.props
    this.context.deleteFile(rest)
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
                onClick={ this.handleClick }>
          <ContextMenuTrigger id="idg-directory-contextmenu">
            <span className={ `icon ${className}` }>{ name }</span>
          </ContextMenuTrigger>

          <ContextMenu id="idg-directory-contextmenu">
            <MenuItem onClick={ this._handleDownload }>
              Download
            </MenuItem>
            <MenuItem onClick={ this._handleRename }>
              Rename
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={ this._handleDelete }>
              Delete
            </MenuItem>
          </ContextMenu>
        </li>
    )
  }
}
