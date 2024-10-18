export default {
    state: {
      platos: []
    },
    mutations: {
      agregarPlato(state, plato) {
        state.platos.push(plato);
      }
    },
    actions: {
      agregarPlato({ commit }, plato) {
        commit('agregarPlato', plato);
      }
    },
    getters: {
      obtenerPlatos: (state) => state.platos
    }
};
  