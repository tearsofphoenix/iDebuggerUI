import React, { PureComponent } from 'react'
import { connect } from 'dva'
import ViewPreview from './ViewPreview'
import FilePreview from './FilePreview'

@connect(({ global }) => ({ global }))
export default class Preview extends PureComponent {
  render() {
    const { global: { currentCategory } } = this.props
    if (currentCategory === 'Views') {
      return (<ViewPreview />)
    } else if (currentCategory === 'Files') {
      return (<FilePreview />)
    }
    return (<div>

    </div>)
  }
}
