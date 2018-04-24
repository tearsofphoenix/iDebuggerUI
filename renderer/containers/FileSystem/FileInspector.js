import React, {PureComponent} from 'react'
import { connect } from 'dva'
import moment from 'moment'

@connect(({ file}) => ({ file }))
export default class Inspector extends PureComponent {
  render() {
    const {file: {selected}} = this.props
    if (selected.NSURLNameKey) {
      return (<div className="item-views">
        <div className="styleguide pane-item">
          <header className="styleguide-header">
            <h5>File Inspector</h5>
          </header>
          <main className="styleguide-sections">
            <section className="bordered">
              <h3>File Info</h3>
              <div className="control">
                <div className="control-rendered">
                  <div className="block" style={{display: 'flex'}}>
                    <div className="control-wrap">
                      <div className="label">Name</div>
                      <div>{selected.NSURLNameKey}</div>
                    </div>
                  </div>
                  <div className="block" style={{display: 'flex'}}>
                    <div className="control-wrap">
                      <div className="label">Path</div>
                      <div>{selected._NSURLPathKey}</div>
                    </div>
                  </div>
                  <div className="block" style={{display: 'flex'}}>
                    <div className="control-wrap">
                      <div className="label">Size</div>
                      <div>{selected.NSURLFileSizeKey}</div>
                    </div>
                  </div>
                  <div className="block" style={{display: 'flex'}}>
                    <div className="control-wrap">
                      <div className="label">Create Date</div>
                      <div>{moment(selected.NSURLCreationDateKey).format('YYYY-MM-DD HH:mm:ss')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>)
    } else {
      return (<div className="empty">No Selection</div>)
    }
  }
}
