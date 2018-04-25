import { fetch, deleteFileRequest, renameFileRequest, downloadFile } from '../services/file'
import {ipcRenderer} from 'electron'

export default {
  namespace: 'file',

  state: {
    tree: [],
    selected: {},
    openIDs: {}
  },

  effects: {
    * getFileHierarchy(_, { call, put, select }) {
      const host = yield select(({ global }) => global.host)
      const { data } = yield call(fetch, { host })
      yield put({
        type: 'setFileHierarchy',
        payload: data
      })
    },

    * downloadFile({ payload }, { call, put, select }) {
      const host = yield select(({ global }) => global.host)
      const { data } = yield call(downloadFile, { host, file: payload.file })
      ipcRenderer.send('save-file', {data, path: payload.path})
    },

    * deleteFile({ payload }, { call, put, select }) {
      const host = yield select(({ global }) => global.host)
      yield call(deleteFileRequest, { host, payload })
    },

    * renameFile({ payload }, { call, put, select }) {
      const host = yield select(({ global }) => global.host)
      yield call(renameFileRequest, { host, payload })
    }
  },

  reducers: {
    setFileHierarchy(state, { payload }) {
      return {
        ...state,
        tree: payload
      }
    },
    selectFile(state, { payload }) {
      const id = payload._NSURLPathKey
      let { openIDs } = state
      openIDs = { ...openIDs }
      if (openIDs[id]) {
        delete openIDs[id]
      } else {
        openIDs[id] = true
      }

      return {
        ...state,
        selected: payload,
        openIDs
      }
    }
  }
}
