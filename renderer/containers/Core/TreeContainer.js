import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Select } from '../../components/Controls'
import Empty from '../../components/Empty'

const selectStyle = {
  border: 'unset',
  borderRadius: 'unset',
  background: 'transparent'
}

@connect(({ global }) => ({ global }))
export default class TreeContainer extends PureComponent {
  handleSelect = (event) => {
    const { value } = event.target
    this.props.dispatch({
      type: 'global/setCurrentCategory',
      payload: value
    })
  }

  foldTree = (event) => {
    event.preventDefault()
  }

  expandTree = (event) => {
    event.preventDefault()
  }

  render() {
    const { global: { currentCategory, categoryNames } } = this.props
    const Cls = currentCategory.tree || Empty
    return (<div className="item-views">
      <div className="styleguide pane-item">
        <header className="styleguide-header" style={ { display: 'flex', justifyContent: 'space-between', height: '32px' } }>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Select options={ categoryNames } selectStyle={ selectStyle } onChange={ this.handleSelect } />
          </div>
          <div style={ { display: 'flex', alignItems: 'center' } }>
            <div className="icon-primitive-dot idg-toolbar-icon" onClick={ this.expandTree } />
            <div className="icon-fold idg-toolbar-icon" onClick={ this.foldTree } />
          </div>
        </header>
        <main className="styleguide-sections">
          <Cls />
        </main>
      </div>
    </div>)
  }
}
