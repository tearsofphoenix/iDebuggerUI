import 'babel-polyfill'
import dva from 'dva'
import router from './router'
import viewModel from './models/view'
import fileModel from './models/file'
import pluginModel from './models/plugin'
import globalModel from './models/global'
import systemModel from './models/system'
import appModel from './models/app'

const app = dva({})

app.router(router)

app.model(viewModel)
app.model(fileModel)
app.model(pluginModel)
app.model(globalModel)
app.model(systemModel)
app.model(appModel)

app.start('#root')
