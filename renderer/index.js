import 'babel-polyfill'
import dva from 'dva'
import router from './router'
import viewModel from './models/view'
import fileModel from './models/file'
import pluginModel from './models/plugin'
import globalModel from './models/global'

const app = dva({})

app.router(router)

app.model(viewModel)
app.model(fileModel)
app.model(pluginModel)
app.model(globalModel)

app.start('#root')
