import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import swal from 'sweetalert2'
import DirectoryItem from './DirectoryItem'
import Empty from '../../components/Empty'

@connect(({ file }) => ({ file }))
export default class FileTree extends PureComponent {
  static propTypes = {
    view: PropTypes.any
  }

  static childContextTypes = {
    synchronizeFolder: PropTypes.func,
    downloadFile: PropTypes.func,
    renameFile: PropTypes.func,
    deleteFile: PropTypes.func,
    showContextMenu: PropTypes.func,
    hideContextMenu: PropTypes.func
  }

  getChildContext() {
    return {
      synchronizeFolder: this.synchronizeFolder,
      downloadFile: this.downloadFile,
      renameFile: this.renameFile,
      deleteFile: this.deleteFile,
      showContextMenu: this.showContextMenu,
      hideContextMenu: this.hideContextMenu
    }
  }

  constructor() {
    super()
    this.state = { showContextMenu: false }
  }

  synchronizeFolder = (arg) => {
    // TODO
    const {contextTarget} = this.state
    this.props.dispatch({
      type: 'file/getFileHierarchy',
      payload: contextTarget
    })
  }

  downloadFile = (arg) => {
    // TODO
  }

  renameFile = (arg) => {
    console.log(43, arg, swal)
    swal({
      title: 'New name of file',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        const {contextTarget} = this.state
        this.props.dispatch({
          type: 'file/renameFile',
          payload: {
            file: contextTarget,
            name: result.value
          }
        })
      }
    })
  }

  deleteFile = (arg) => {
    swal({
      title: 'Are you sure to Delete the file?',
      text: 'The file will be permanently removed.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.value) {
        const {contextTarget} = this.state
        this.props.dispatch({
          type: 'file/deleteFile',
          payload: contextTarget
        })
      }
    })
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'file/getFileHierarchy'
    })
  }

  _handleFileClick = (args) => {
    this.props.dispatch({
      type: 'file/selectFile',
      payload: args
    })
  }
  showContextMenu = (event, target) => {
    event.preventDefault()
    this.setState({
      showContextMenu: true,
      contextTarget: target,
      contextRect:
          {
        left: event.pageX,
        top: event.pageY
      }
    })
  }

  hideContextMenu = (event) => {
    event && event.preventDefault()
    this.setState({ showContextMenu: false })
  }

  renderContextMenu = () => {
    const { contextRect } = this.state
    const style = {
      position: 'fixed',
      opacity: 1, pointerEvents: 'auto',
      top: contextRect.top,
      left: contextRect.left
    }
    const items = [
      {
        name: 'Synchronize',
        action: this.synchronizeFolder
      },
      {
        name: 'Download',
        action: this.downloadFile
      },
      {
        name: 'Rename',
        action: this.renameFile
      },
      {
        divider: true
      },
      {
        name: 'Delete',
        action: this.deleteFile
      }
    ]
    return (<nav role="menu" tabIndex="-1"
                 className="react-contextmenu react-contextmenu--visible"
                 style={ style }
                 onBlur={ this.hideContextMenu }>
      {
        items.map((looper, idx) => {
          if (looper.divider) {
            return (<div key={idx} className="react-contextmenu-item react-contextmenu-item--divider" role="menuitem"
                         tabIndex="-1" aria-disabled="false" aria-orientation="horizontal" />)
          } else {
            return (<div key={idx} className="react-contextmenu-item" role="menuitem" tabIndex="-1" aria-disabled="false"
                         onClick={looper.action}>{looper.name}</div>)
          }
        })
      }
    </nav>)
  }

  render() {
    const { file: { tree, selected, openIDs } } = this.props
    const { showContextMenu} = this.state
    let content = null
    if (tree) {
      content = (<div className="tree-view-resizer tool-panel">
        <div className="tree-view-scroller">
          <ul className="tree-view full-menu list-tree has-collapsable-children">
            {
              tree.map((looper, idx) =>
                  <DirectoryItem key={ idx } { ...looper } selectedID={ selected._NSURLPathKey } openIDs={ openIDs }
                                 clickHandler={ this._handleFileClick } />)
            }

          </ul>
          { showContextMenu && this.renderContextMenu() }
        </div>
        <div className="tree-view-resize-handle" />
      </div>)
    } else {
      content = (<Empty />)
    }
    return content
  }
}
