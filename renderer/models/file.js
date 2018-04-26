import { fetch, deleteFileRequest, renameFileRequest, downloadFile } from '../services/file'
import {pathExtension} from '../utils/shared'
import download from 'downloadjs'

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
      const {file} = payload
      const { data } = yield call(downloadFile, { host, file})
      download(data, pathExtension(file._NSURLPathKey))
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
