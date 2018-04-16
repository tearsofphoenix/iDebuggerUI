import React from 'react';

export default class TextEditor extends React.PureComponent {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="item-views" style={{ display: this.props.id == this.props.activeTab ? 'block' : 'none' }}>
        <div className="styleguide pane-item">
          <div className="editor-container" id={this.props.id} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    );
  }
}