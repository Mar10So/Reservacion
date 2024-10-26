<template>
    <v-app>
    <v-navigation-drawer color="brown" theme="dark" permanent>
      <v-list color="transparent">
        <router-link to="/homeadmin">
          <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
        </router-link>
        <router-link to="/perfil">
          <v-list-item prepend-icon="mdi-cog" title="Registro"></v-list-item>
        </router-link>
        <router-link to="/menu">
          <v-list-item prepend-icon="mdi-food" title="Crear Productos"></v-list-item>
        </router-link>
        <router-link to="/producto">
          <v-list-item prepend-icon="mdi-eye" title="Productos"></v-list-item>
        </router-link>
        <router-link to="/roles">
          <v-list-item prepend-icon="mdi-shield" title="Roles"></v-list-item>
        </router-link>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="yellow" block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title>Bienvenido Administrador</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view> <!--  Aquí se renderizará el contenido del home  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdministradorMenu'
}
</script>