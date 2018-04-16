import 'babel-polyfill'
import dva from 'dva'
import router from './router'
import viewModel from './models/view'

const app = dva({})

app.router(router)

app.model(viewModel)

app.start('#root')
