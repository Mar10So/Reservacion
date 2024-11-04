<template>
  <LayoutView :userRole="userRole">
      <p>Contenido principal de la aplicación aquí.</p>
  </LayoutView>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutView from './components/LayoutView.vue';

export default {
  name: 'App',
  components: { LayoutView },
  computed: {
      ...mapGetters(['getRol']),
      userRole() {
          return this.getRol || 'user'; // Define 'user' como predeterminado si el rol no está disponible
      }
  },
  methods: {
      validarAcceso() {
          const datos = localStorage.getItem('userData');
          if (datos) {
              const userData = JSON.parse(datos);
              this.$store.dispatch('login', userData);
          } else {
              this.$router.push('/login');
          }
      }
  },
  created() {
      this.validarAcceso();
  }
}
</script>
