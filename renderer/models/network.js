import { list } from '../services/network'

export default {
  namespace: 'network',

  state: {
    requests: [],
    selected: {}
  },

  effects: {
    * listRequests(_, { call, put, select }) {
      const host = yield select(({ global }) => global.host)
      const { data } = yield call(list, { host })
      yield put({
        type: 'setNetworkRequests',
        payload: data
      })
    }
  },

  reducers: {
    setNetworkRequests(state, { payload }) {
      return {
        ...state,
        requests: payload
      }
    },
    selectRequest(state, { payload }) {
      const { requests } = state
      return {
        ...state,
        selected: { ...requests[payload] }
      }
    }
  }
}
