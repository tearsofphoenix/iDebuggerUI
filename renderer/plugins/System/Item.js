import React from 'react'

const style = {
  display: 'flex',
  height: '24px',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const nameSpanStyle = {
  flex: 1,
  textAlign: 'end',
  paddingRight: 20
}

const spanStyle = {
  flex: 1,
  color: '#c2ccdc'
}

export default ({ name, value }) => (<div style={ style }>
  <span style={ nameSpanStyle }>{ name }:</span>
  <span style={ spanStyle }>{ value }</span>
</div>)
