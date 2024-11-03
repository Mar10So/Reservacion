<template>
  <v-app>
    <v-navigation-drawer color="brown" theme="dark" permanent>
      <!-- Renderizamos el menú según el rol dinámico -->
      <component :is="menuComponent"></component>
    </v-navigation-drawer>
    
    <v-app-bar app>
      <v-toolbar-title>Bienvenido {{ userRole }}</v-toolbar-title>
    </v-app-bar>
    
    <v-main>
      <router-view></router-view> <!-- Renderiza la vista del Home -->
    </v-main>
  </v-app>
</template>

<script>
import AdministradorMenu from '@/views/vistasAdministrador/AdministradorMenu.vue';
import SuperAdminMenu from '@/views/VistasSuperAdministrador/SuperAdminMenu.vue';
import UsuarioMenu from '@/views/vistasUsuario/UsuarioMenu.vue';

export default {
  props: {
    userRole: {
      type: String,
      default: 'user' // Definimos un rol por defecto//
    }
  },
  computed: {
    menuComponent() {
      switch (this.userRole) {
        case 'superadmin':
          return SuperAdminMenu;
        case 'admin':
          return AdministradorMenu;
        case 'user':
          return UsuarioMenu;
        default:
          return null;
      }
    }
  }
}
</script>
