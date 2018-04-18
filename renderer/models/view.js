import { fetch, update} from '../services/view'
import kHost from '../services/constants'

function searchViewInfo(obj, id) {
  if (obj.id === id) {
    return obj
  }
  let result = null
  const {views = [], windows = []} = obj
  for (let i = 0; i < views.length; ++i) {
    result = searchViewInfo(views[i], id)
    if (result) {
      return result
    }
  }
  for (let i = 0; i < windows.length; ++i) {
    result = searchViewInfo(windows[i], id)
    if (result) {
      return result
    }
  }
  return null
}

export default {
  namespace: 'view',

  state: {
    snapshot: null,
    selected: {},
    openIDs: {},
    previewImageURL: ''
  },

  effects: {
    * getSnapshot({ payload }, { call, put }) {
      const { data } = yield call(fetch)
      yield put({
        type: 'saveSnapshot',
        payload: data
      })
    },

    * updateProperty({ payload }, { call, put }) {
      const { data } = yield call(update, payload)
      yield put({
        type: 'getSnapshot'
      })
    }
  },

  reducers: {
    saveSnapshot(state, { payload }) {
      const {selected} = state
      const mainWindow = payload.windows[0]
      let newSelected = selected
      if (selected.id) {
        newSelected = searchViewInfo(mainWindow, selected.id)
      }
      return {
        ...state,
        selected: newSelected,
        snapshot: payload,
        previewImageURL: `url(${kHost}/preview?id=${mainWindow.id}&timestamp=${Date.now()})`
      }
    },

    selectView(state, { payload }) {
      const { id, parents = [] } = payload
      let { openIDs } = state
      openIDs = { ...openIDs }
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
