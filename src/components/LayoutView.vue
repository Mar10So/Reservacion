<template>
  <v-app>
      <v-navigation-drawer color="brown" theme="dark" permanent>
          <component :is="menuComponent"></component>
      </v-navigation-drawer>
      
      <v-app-bar app>
          <v-toolbar-title>Bienvenido {{ userRole }}</v-toolbar-title>
      </v-app-bar>
      
      <v-main>
          <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import AdministradorMenu from '@/views/vistasAdministrador/AdministradorMenu.vue';
import SuperAdminMenu from '@/views/VistasSuperAdministrador/SuperAdminMenu.vue';
import UsuarioMenu from '@/views/vistasUsuario/UsuarioMenu.vue';

export default {
  computed: {
      ...mapGetters(['getRol']),
      userRole() {
          return this.getRol;
      },
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
