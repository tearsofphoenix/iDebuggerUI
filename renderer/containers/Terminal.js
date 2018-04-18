import React, { PureComponent } from 'react'
import Terminal from 'terminal-in-react'

export default class TerminalView extends PureComponent {
  render() {
    return (<Terminal
        hideTopBar
        allowTabs={ false }
        color='#BABABA'
        backgroundColor='#2F2F2F'
        style={ { fontWeight: "bold", width: '100%', fontSize: "1em" } }
        commands={ {
          popup: () => alert('Terminal in React')
        } }
        descriptions={ {
          popup: 'alert'
        } }
        msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
    />)
  }
}
