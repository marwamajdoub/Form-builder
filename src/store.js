import { createStore } from 'vuex';

const store = createStore({
  state: {
    forms: [],
    templates: [],
  },
  mutations: {
    setForms(state, forms) {
      state.forms = forms;
    },
    setTemplates(state, templates) {
      state.templates = templates;
    },
  },
  actions: {
    fetchForms({ commit }) {
      // Example: Fetch forms from Firestore or another API
      const fetchedForms = []; // Replace with actual fetched data
      commit('setForms', fetchedForms);
    },
    fetchTemplates({ commit }) {
      // Example: Fetch templates from Firestore or another API
      const fetchedTemplates = []; // Replace with actual fetched data
      commit('setTemplates', fetchedTemplates);
    },
  },
});

export default store;
