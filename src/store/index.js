import { createStore } from 'vuex'

export default createStore({
  state: {
    SOEID: null
  },
  mutations: {
    changeSOEID (state, data) {
      state.SOEID = data
    }
  }
})
