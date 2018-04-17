import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Select } from '../components/Controls'
import Empty from '../components/Empty'
import ViewTree from './ViewTree'

const selectStyle = {
  border: 'unset',
  borderRadius: 'unset',
  background: 'transparent'
}

const kViewMap = {
  Views: ViewTree
}

export default class TreeContainer extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = { current: 'Views' }
  }

  handleSelect = (event) => {
    const { value } = event.target
    this.setState({ current: value })
  }

  render() {
    const options = ['Views', 'Files', 'Network', 'Memory']
    const { current } = this.state
    const Cls = kViewMap[current] || Empty
    return (<div className="item-views">
      <div className="styleguide pane-item">
        <header className="styleguide-header">
          <Select options={ options } selectStyle={ selectStyle } onChange={ this.handleSelect } />
        </header>
        <main className="styleguide-sections">
          <Cls />
        </main>
      </div>
    </div>)
  }
}
