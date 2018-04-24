import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import DirectoryItem from './DirectoryItem'
import Empty from '../../components/Empty'

@connect(({ file }) => ({ file }))
export default class FileTree extends PureComponent {
  static propTypes = {
    view: PropTypes.any
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
