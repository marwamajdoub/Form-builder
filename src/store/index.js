import { createStore } from 'vuex';

export default createStore({
  state: {
    userRole: null // État initial du rôle de l'utilisateur
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role; // Mutation pour mettre à jour le rôle de l'utilisateur
    }
  },
  getters: {
    isAdmin(state) {
      return state.userRole === 'admin'; // Getter pour vérifier si l'utilisateur est un admin
    },
    isUser(state) {
      return state.userRole === 'user'; // Getter pour vérifier si l'utilisateur est un utilisateur normal
    }
  }
});
