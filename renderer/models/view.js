import {fetch} from '../services/view'

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
