import {fetch} from '../services/view'

export default {
  namespace: 'view',

  state: {
    snapshot: null,
    selected: {},
    openIDs: {}
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
    },
    selectView(state, {payload}) {
      const {id, parents = []} = payload
      let {openIDs} = state
      openIDs = {...openIDs}
      if (openIDs[id]) {
        delete openIDs[id]
      } else {
        openIDs[id] = true
        parents.forEach(looper => openIDs[looper] = true)
      }

      return {
        ...state,
        selected: payload,
        openIDs
      }
    }
  }
}
