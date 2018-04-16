import axios from 'axios'

async function fetch() {
  return axios.get('/api/snapshot')
}

export default {
  namespace: 'view',

  state: {
    snapshot: {}
  },

  effects: {
    * getSnapshot({payload}, {call, put}) {
      const {data} = yield call(fetch)
      yield put({
        type: 'saveSnapshot',
        payload: data
      })
    }
  },

  reducers: {
    saveSnapshot(state, {payload}) {
      return {
        ...state,
        snapshot: payload
      }
    }
  }
}
