import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import App from './components/App'

export default function RouterConfig({ history }) {
  return (
      <Router history={history}>
        <Switch>
          <Route path="/" render={props => <App {...props} />} />
        </Switch>
      </Router>
  );
}
