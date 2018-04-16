import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import View from './View'

@connect(({ view }) => ({ view }))
export default class ViewTree extends PureComponent {
  static propTypes = {
    view: PropTypes.any
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      selectedID: -1
    }
  }
  _handleViewClick = (id) => {
    this.setState({selectedID: id})
  }

  render() {
    const { view: { snapshot } } = this.props
    const {selectedID} = this.state
    let content = null
    if (snapshot) {
      content = (<div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>View Hierarchy</h5>
          </header>
          <main className="styleguide-sections">

            <div className="tree-view-resizer tool-panel">
              <div className="tree-view-scroller">
                <ul className="tree-view full-menu list-tree has-collapsable-children">
                  <View clickHandler={this._handleViewClick} selectedID={selectedID} {...snapshot} />
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
