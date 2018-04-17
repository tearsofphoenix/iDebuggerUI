import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import View from './View'
import Empty from '../components/Empty'

@connect(({ view }) => ({ view }))
export default class ViewTree extends PureComponent {
  static propTypes = {
    view: PropTypes.any
  }

  _handleViewClick = (args) => {
    this.props.dispatch({
      type: 'view/selectView',
      payload: args
    })
  }

  render() {
    const { view: { snapshot, selected, openIDs } } = this.props
    let content = null
    if (snapshot) {
      const mainWindow = snapshot.windows[0]
      content = (<div className="tree-view-resizer tool-panel">
        <div className="tree-view-scroller">
          <ul className="tree-view full-menu list-tree has-collapsable-children">
            <View clickHandler={ this._handleViewClick } selectedID={ selected.id }
                  openIDs={ openIDs } { ...mainWindow } />
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
