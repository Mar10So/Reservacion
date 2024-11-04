import { createStore } from 'vuex'

export default createStore({
  state: {   
    usuarios: null,
    rol: null,
    token: null,
  },
  getters: {
    getUsuario(state) {
      return state.usuarios;
    },
    getRol(state) {
      return state.rol;
    },
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuarios = usuario;
    },
    setRol(state, rol) {
      state.rol = rol;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    login(context, data) {
        context.commit('setToken', data.token);
        context.commit('setUsuario', data.usuario);
        context.commit('setRol', data.rol);

        // Guarda todo el objeto `data` en local storage
        localStorage.setItem('userData', JSON.stringify(data));
    },
    logout(context) {
        context.commit('setToken', null);
        context.commit('setUsuario', null);
        context.commit('setRol', null);

        localStorage.removeItem('userData');
    }
},

  modules: {

  }

});
