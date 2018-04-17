import React, { PureComponent } from 'react'
import { connect } from 'dva'
import ViewNode from './ViewNode'
import kHost from '../services/constants'

@connect(({ view }) => ({ view }))
export default class Preview extends PureComponent {
  _handleViewClick = (args) => {
    this.props.dispatch({
      type: 'view/selectView',
      payload: args
    })
  }

  render() {
    const { view: { snapshot, selected } } = this.props
    if (snapshot) {
      const mainWindow = snapshot.windows[0]
      const wrapperStyle = {
        width: mainWindow.layer_bounds_w - 2,
        height: mainWindow.layer_bounds_h - 2
      }
      const mainWindowStyle = {
        width: mainWindow.layer_bounds_w - 2,
        height: mainWindow.layer_bounds_h - 2,
        left: -1,
        top: -1,
        position: 'relative',
        backgroundImage: `url(${kHost}/preview?id=${mainWindow.id})`
      }
      const mainView = mainWindow.views[0]
      return (<ride-pane>
        <div className="idg-preview">
          <div style={ wrapperStyle }>
            <div style={ mainWindowStyle }>
              <ViewNode { ...mainView } parents={ [mainWindow.id] } selectedID={ selected.id }
                        clickHandler={ this._handleViewClick } />
            </div>
          </div>
        </div>
      </ride-pane>)
    }
    return (<div>

    </div>)
  }
}
