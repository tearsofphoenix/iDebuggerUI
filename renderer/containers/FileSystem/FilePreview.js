import React, { PureComponent } from 'react'
import { connect } from 'dva'
import FileViewer from 'react-file-viewer'

@connect(({ file, global }) => ({ file, global }))
export default class ViewPreview extends PureComponent {
  render() {
    const { file: { selected }, global: {host} } = this.props
    if (selected && !selected.NSURLIsDirectoryKey) {
      const name = selected.NSURLNameKey || ''
      const array = name.split('.')
      let ext = 'txt'
      if (array.length > 1) {
        ext = array[array.length - 1]
      }
      const type = ext
      const filepath = `${host}/file/one?path=${selected._NSURLPathKey}&time=${Date.now()}`
      return (<ride-pane>
        <div className="idg-preview">
          <FileViewer
              fileType={type}
              filePath={filepath}
              onError={console.log}
          />
        </div>
      </ride-pane>)
    }
    return (<ride-pane>
      <div className="idg-preview">
        No Preview
      </div>
    </ride-pane>)
  }
}
