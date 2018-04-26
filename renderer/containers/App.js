import React from 'react'
import { connect } from 'dva'
import TreeContainer from './Core/TreeContainer'
import ToolWindow from './Core/ToolWindow'

import MockComponentTree from '../components/MockComponentTree';
import ConnectView from './ConnectView'

@connect(({ global }) => ({ global }))
export default class App extends React.Component {
  render() {
    const { global: { host, currentCategory} } = this.props
    if (host) {
      const Inspector = currentCategory.inspector
      const Preview = currentCategory.preview

      return (
          <ride-workspace className="scrollbars-visible-always">

            <ride-panel-container className="header" />

            <ride-pane-container>
              <ride-pane-axis className="horizontal">

                <ride-pane style={ { flexGrow: 0, flexBasis: '300px' } }>
                  <TreeContainer />
                  <MockComponentTree />

                </ride-pane>
                <ride-pane-resize-handle class="horizontal" />

                <Preview />

                <ride-pane-resize-handle className="horizontal" />

                <ride-pane style={ { flexGrow: 0, flexBasis: '300px', height: 'calc(100% - 24px)' } }>
                  {Inspector && <Inspector />}
                </ride-pane>

              </ride-pane-axis>
            </ride-pane-container>
            <ride-panel-container>
              <ToolWindow />
            </ride-panel-container>
          </ride-workspace>
      )
    } else {
      return (<ConnectView />)
    }
  }
}
