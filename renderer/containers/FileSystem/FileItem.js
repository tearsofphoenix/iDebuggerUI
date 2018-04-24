import React from 'react'

const kMap = {
  txt: 'icon-file-text',
  jpg: 'icon-file-media',
  png: 'icon-file-media',
  gif: 'icon-file-media',
  jpeg: 'icon-file-media',
  pdf: 'icon-file-pdf',
  zip: 'icon-file-zip',
  rar: 'icon-file-zip',
  '*': 'icon-file-binary'
}

export default (props) => {
  const id = props._NSURLPathKey
  const name = props.NSURLNameKey
  const array = name.split('.')
  let ext = 'txt'
  if (array.length > 1) {
    ext = array[array.length - 1]
  }
  const className = kMap[ext] || kMap['*']

  const handleClick = (event) => {
    event.preventDefault()
    const { clickHandler, selectedID, openIDs, ...rest } = props
    clickHandler(rest)
  }
  return (<li className={ props.selectedID === id ? 'list-item selected' : 'list-item' }
              onClick={ handleClick }>
        <span className={ `icon ${className}` }>{ props.NSURLNameKey }</span>
      </li>
  )
}
