import { connectApp } from '../services/global'
import FileSystem from '../containers/FileSystem'
import ViewTree from '../containers/ViewTree'

const categories = {}
categories[FileSystem.category] = FileSystem
categories[ViewTree.category] = ViewTree

const categoryNames = [ViewTree.category, FileSystem.category]

export default {
  namespace: 'global',

  state: {
    currentCategory: ViewTree,
    categories,
    categoryNames,
    host: 'http://127.0.0.1:9449',
    connectError: null
  },

  effects: {
    * connectToApp({ payload }, { call, put }) {
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
      const currentCategory = categories[payload]
      return {
        ...state,
        currentCategory
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
