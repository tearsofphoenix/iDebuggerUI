import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import View from './View'

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
      content = (<div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>View Hierarchy</h5>
          </header>
          <main className="styleguide-sections">

            <div className="tree-view-resizer tool-panel">
              <div className="tree-view-scroller">
                <ul className="tree-view full-menu list-tree has-collapsable-children">
                  <View clickHandler={this._handleViewClick} selectedID={selected.id} openIDs={openIDs} {...mainWindow} />
                </ul>
              </div>
              <div className="tree-view-resize-handle" />
            </div>
          </main>
        </div>
      </div>)
    } else {
      content = (<div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>View Hierarchy</h5>
          </header>
          <main className="styleguide-sections">

            <div className="empty">
              No Content
            </div>

          </main>
        </div>
      </div>)
    }
    return content
  }
}
