import { createStore } from 'vuex';

export default createStore({
  state: {
    //
    usuarios: [] // Array para almacenar los usuarios
    //
  },
  getters: {
    //
    getUsuarios(state) {
      return state.usuarios; // Getter para acceder a los usuarios
    }
    //
  },
  mutations: {

    //
    AGREGAR_USUARIO(state, usuario) {
      state.usuarios.push(usuario); // Agrega el nuevo usuario al array
    }
  //
  },
  actions: {


    //
    agregarUsuario({ commit }, usuario) {
      return new Promise((resolve,) => {
        // Simular una llamada a una API
        setTimeout(() => {
          // Aquí podrías hacer una lda a una API real
          // Si todo va bien, se hace el comlamamit
          commit('AGREGAR_USUARIO', usuario);
          resolve();
        }, 1000); // Simulación de un retraso de 1 segundo
      });
    }
  }
  //


});
