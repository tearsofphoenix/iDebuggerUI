import { fetch } from '../services/file'

export default {
  namespace: 'file',

  state: {
    tree: [],
    selected: {},
    openIDs: {}
  },

  effects: {
    * getFileHierarchy(_, { call, put, select }) {
      const host = yield select(({global}) => global.host)
      const { data } = yield call(fetch, {host})
      yield put({
        type: 'setFileHierarchy',
        payload: data
      })
    }
  },

  reducers: {
    setFileHierarchy(state, { payload }) {
      return {
        ...state,
        tree: payload
      }
    },
    selectFile(state, {payload}) {
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
