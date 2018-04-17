export default {
  namespace: 'global',

  state: {
    currentCategory: 'Views'
  },

  effects: {},

  reducers: {
    setCurrentCategory(state, { payload }) {
      return {
        ...state,
        currentCategory: payload
      }
    }
  }
}
