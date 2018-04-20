import { fetchSystemInfo } from '../services/system'

export default {
  namespace: 'system',

  state: {
    info: {}
  },

  effects: {
    * getSystemInfo(_, { call, put, select }) {
      const host = yield select(({global}) => global.host)
      const { data } = yield call(fetchSystemInfo, {host})
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
