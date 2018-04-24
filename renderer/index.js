import 'babel-polyfill'
import dva from 'dva'
import router from './router'
import modelLoader from './models'

const app = dva({})

app.router(router)

modelLoader(app)

app.start('#root')
