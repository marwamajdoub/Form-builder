// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    currentFormId: null
  },
  mutations: {
    setFormId(state, id) {
      state.currentFormId = id;
    }
  },
  actions: {
    setFormId({ commit }, id) {
      commit('setFormId', id);
    }
  },
  getters: {
    currentFormId: (state) => state.currentFormId
  }
});

export default store;
