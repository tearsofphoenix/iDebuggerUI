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

  render() {
    const { file: { tree, selected, openIDs } } = this.props
    let content = null
    if (tree) {
      content = (<div className="tree-view-resizer tool-panel">
        <div className="tree-view-scroller">
          <ul className="tree-view full-menu list-tree has-collapsable-children">
            <DirectoryItem />
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
