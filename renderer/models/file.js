import { fetch } from '../services/file'

export default {
  namespace: 'file',

  state: {
    tree: {},
    selected: {},
    openIDs: {}
  },

  effects: {
    * getFileHierarchy(_, { call, put }) {
      const { data } = yield call(fetch)
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
    }
  }
}
