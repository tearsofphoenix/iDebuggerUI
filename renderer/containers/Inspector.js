import React, { PureComponent } from 'react'
import { connect } from 'dva'
import InspectorSection from './InspectorSection'

@connect(({ view }) => ({ view }))
export default class Inspector extends PureComponent {
  static propTypes = {}

  changeValue = (event, obj) => {
    const { view: { selected } } = this.props
    const {name, value} = event.target
    console.log(10, name, value, obj)
    this.props.dispatch({
      type: 'view/updateProperty',
      payload: {
        target: selected.id,
        property: obj,
        value
      }
    })
  }

  render() {
    const { view: { selected } } = this.props
    const {props = []} = selected
    let content = null
    if (props.length > 0) {
      content = props.map((looper, idx) => <InspectorSection data={looper} key={idx} changeValue={this.changeValue} />)
    } else {
      content = (<div className="empty">No Selection</div>)
    }
    return (<div className="item-views">
      <div className="styleguide pane-item">
        <header className="styleguide-header">
          <h5>View Inspector</h5>
        </header>
        <main className="styleguide-sections">
          {content}
        </main>
      </div>
    </div>)
  }
}
