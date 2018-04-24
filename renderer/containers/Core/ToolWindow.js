import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Terminal from '../Terminal'
import System from '../System'
import TabContainer from '../../components/TabContainer'

export default class ToolWindow extends PureComponent {
  static propTypes = {
    plugins: PropTypes.any
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      selected: null,
      hideContent: true
    }
  }

  handleSelect = (obj) => {
    const {selected, hideContent} = this.state
    if (selected === obj) {
      this.setState({ hideContent: !hideContent })
    } else {
      this.setState({ selected: obj, hideContent: false })
    }
  }

  hideContent = (event) => {
    event.preventDefault()
    this.setState({hideContent: true, selected: null})
  }

  _renderContent = () => {
    const {selected} = this.state
    if (selected === 'Terminal') {
      return (<Terminal />)
    } else {
      return (<System />)
    }
  }

  render() {
    const { plugins = ['Terminal', 'System']} = this.props
    const { selected, hideContent } = this.state
    const tabs = plugins.map(looper => ({name: looper, id: looper}))
    return (<div className="idg-tool-window">
      {!hideContent && <div className="idg-tool-bar">
        <div>{selected}</div>
        <div className="icon-desktop-download idg-toolbar-icon" onClick={this.hideContent} />
      </div>}
      {!hideContent && <div className="idg-tool-window-content">
        {this._renderContent()}
      </div>}
      <div className="idg-tool-bar">
        <TabContainer tabs={tabs} setActiveTab={this.handleSelect} activeTab={selected} />
      </div>
    </div>)
  }
}
