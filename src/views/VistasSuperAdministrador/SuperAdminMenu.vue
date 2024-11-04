<template>
  <v-app>
    <v-navigation-drawer color="brown" theme="dark" permanent>
      <v-list color="transparent">
        <router-link to="/superadmin">
          <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
        </router-link>
        <router-link to="/administradores">
          <v-list-item prepend-icon="mdi-account-box" title="Administradores"></v-list-item>
        </router-link>
        <router-link to="/restaurantes">
          <v-list-item prepend-icon="mdi-food" title="Restaurantes"></v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="yellow" @click="logout" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>Bienvenido SuperAdministrador</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view> <!-- Aquí se renderizará el contenido del home -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdministradorMenu',
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  }
}
</script>