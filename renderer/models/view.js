import { fetch, update} from '../services/view'

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
    * getSnapshot({ payload }, { call, put, select }) {
      const host = yield select(({global}) => global.host)
      const { data } = yield call(fetch, {host})
      console.log(38)
      yield put({
        type: 'saveSnapshot',
        payload: {data, host}
      })
    },

    * updateProperty({ payload }, { call, put, select }) {
      const host = yield select(({global}) => global.host)
      const { data } = yield call(update, {host, data: payload})
      console.log(47, data)
      yield put({
        type: 'getSnapshot'
      })
    }
  },

  reducers: {
    saveSnapshot(state, { payload }) {
      const {data, host} = payload
      const {selected} = state
      const mainWindow = data.windows[0]
      let newSelected = selected
      if (selected.id) {
        newSelected = searchViewInfo(mainWindow, selected.id)
      }
      return {
        ...state,
        selected: newSelected,
        snapshot: data,
        previewImageURL: `url(${host}/preview?id=${mainWindow.id}&timestamp=${Date.now()})`
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
