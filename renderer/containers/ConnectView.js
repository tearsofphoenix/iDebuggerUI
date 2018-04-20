import React, { PureComponent } from 'react'
import { connect } from 'dva'
import IP from 'ip'
import IPut from '../components/iput/src/index.jsx'
console.log(5, IP)

const wrapperStyle = {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}

const formStyle = {
  padding: 20,
  border: '1px solid #bababa',
  borderRadius: 3
}

const labelStyle = {
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  marginRight: 10,
  width: '64px'
}

const errorStyle = {
  color: 'red'
}

@connect(({ global }) => ({ global }))
export default class ConnectView extends PureComponent {
  constructor() {
    super()
    this.state = { ip: '', port: '9449' }
  }

  handleIP = (value) => {
    this.setState({ ip: value })
  }

  handlePort = (event) => {
    const { value } = event.target
    this.setState({ port: value })
  }

  tryConnectToApp = () => {
    console.log(46)
    let { ip, port } = this.state
    let error = ''
    if (/^\d+$/.test(port)) {
      port = parseInt(port, 10)
      if (port >= 1000 && port <= 65535) {
        // valid port
      } else {
        error = 'Invalid Port!'
      }
    }

    if (error) {
      this.setState({errorPrompt: error})
    } else {
      this.props.dispatch({
        type: 'global/connectToApp',
        payload: { ip, port }
      })
    }
  }

  render() {
    const { global: { errorPrompt } } = this.props
    return (
        <div style={ wrapperStyle }>
          <main className="styleguide-sections" style={ { display: 'flex', justifyContent: 'center' } }>

            <section className="bordered" style={ formStyle }>
              <h3 style={ { fontSize: '2em', textAlign: 'center', marginBottom: '1.2em' } }>Connect to App</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block">
                    <div className="control-wrap" style={ { display: 'flex' } }>
                      <div className="label" style={ labelStyle }>IP:</div>
                      <IPut defaultValue={ '0.0.0.0' } onChange={ this.handleIP } />
                    </div>
                  </div>
                  <div className="block">
                    <div className="control-wrap" style={ { display: 'flex' } }>
                      <div className="label" style={ labelStyle }>Port:</div>
                      <div className="react-ip-input__item"><input type="text" style={ { width: '100px' } }
                                                                   onChange={ this.handlePort } /></div>
                    </div>
                  </div>
                  <div className="block" style={ { textAlign: 'center', marginTop: 40 } }>
                    <button className="btn btn-large" style={ {
                      color: '#bababa',
                      lineHeight: '2.6em',
                      fontSize: '1.2em'
                    } } onClick={ this.tryConnectToApp }>Connect
                    </button>
                  </div>
                  { errorPrompt && <div style={ errorStyle }>{ errorPrompt }</div> }
                </div>
              </div>
            </section>

          </main>
        </div>)
  }
}
