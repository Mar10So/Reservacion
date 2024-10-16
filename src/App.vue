<template>
  <LayoutView :userRole="userRole">
    <p>Contenido principal de la aplicación aquí.</p>
  </LayoutView>
</template>

<script>
import LayoutView from './components/LayoutView.vue';

export default {
  components: { LayoutView },
  data() {
    return {
      userRole: 'admin'  // Aquí puedes cambiar el rol dinámicamente según el login o los permisos del usuario//
    };
  }
}
</script>


