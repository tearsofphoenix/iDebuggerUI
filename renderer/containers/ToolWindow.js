import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Terminal from 'terminal-in-react'

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

  render() {
    const { plugins = ['Terminal', 'Log']} = this.props
    const { selected, hideContent } = this.state
    return (<div className="idg-tool-window">
      {!hideContent && <div className="idg-tool-bar">
        <div>{selected}</div>
        <div className="icon-desktop-download idg-toolbar-icon" onClick={this.hideContent} />
      </div>}
      {!hideContent && <div className="idg-tool-window-content">
        <Terminal
            hideTopBar
            allowTabs={false}
            color='#BABABA'
            backgroundColor='#2F2F2F'
            style={{ fontWeight: "bold", width: '100%', fontSize: "1em" }}
            commands={{
              popup: () => alert('Terminal in React')
            }}
            descriptions={{
              popup: 'alert'
            }}
            msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
        />
      </div>}
      <div className="idg-tool-bar">
        <div className="btn-group">
          { plugins.map((looper, idx) => (<button className={ selected === looper ? 'btn selected' : 'btn' }
                                                  onClick={ () => this.handleSelect(looper) }
                                                  key={ idx }>{ looper }</button>)) }
        </div>
      </div>
    </div>)
  }
}
