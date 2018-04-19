import { connectApp } from '../services/global'

export default {
  namespace: 'global',

  state: {
    currentCategory: 'Views',
    host: null,
    connectError: null
  },

  effects: {
    * connectToApp({ payload }, { call, put }) {
      console.log(14)
      const { data } = yield call(connectApp, payload)
      if (data.code === 1000) {
        yield put({
          type: 'didConnectApp',
          payload
        })
      } else {
        yield put({
          type: 'didConnectApp'
        })
      }
    }
  },

  reducers: {
    setCurrentCategory(state, { payload }) {
      return {
        ...state,
        currentCategory: payload
      }
    },

    didConnectApp(state, { payload }) {
      if (payload) {
        const { ip, port } = payload
        const host = `http://${ip}:${port}`
        return {
          ...state,
          host
        }
      } else {
        return {
          ...state,
          connectError: 'Failed to connect to app'
        }
      }
    }
  }
}
