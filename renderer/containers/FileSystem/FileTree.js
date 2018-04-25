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
    deleteFile: PropTypes.func
  }

  getChildContext() {
    return {
      synchronizeFolder: this.synchronizeFolder,
      downloadFile: this.downloadFile,
      renameFile: this.renameFile,
      deleteFile: this.deleteFile
    }
  }

  synchronizeFolder = (arg) => {
    // TODO
    this.props.dispatch({
      type: 'file/getFileHierarchy',
      payload: arg
    })
  }

  downloadFile = (arg) => {

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
        this.props.dispatch({
          type: 'file/renameFile',
          payload: arg
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
        this.props.dispath({
          type: 'file/deleteFile',
          payload: arg
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

  render() {
    const { file: { tree, selected, openIDs } } = this.props
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
        </div>
        <div className="tree-view-resize-handle" />
      </div>)
    } else {
      content = (<Empty />)
    }
    return content
  }
}
