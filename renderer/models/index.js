import viewModel from './view'
import fileModel from './file'
import pluginModel from './plugin'
import globalModel from './global'
import systemModel from './system'
import appModel from './app'
import networkModel from './network'

export default (app) => {
  app.model(viewModel)
  app.model(fileModel)
  app.model(pluginModel)
  app.model(globalModel)
  app.model(systemModel)
  app.model(appModel)
  app.model(networkModel)
}
