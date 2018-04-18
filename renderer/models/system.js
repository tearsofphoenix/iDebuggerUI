import { fetchSystemInfo } from '../services/system'

export default {
  namespace: 'system',

  state: {
    info: {}
  },

  effects: {
    * getSystemInfo(_, { call, put }) {
      const { data } = yield call(fetchSystemInfo)
      yield put({
        type: 'setSystemInfo',
        payload: data
      })
    }
  },

  reducers: {
    setSystemInfo(state, { payload }) {
      return {
        ...state,
        info: payload
      }
    }
  }
}
