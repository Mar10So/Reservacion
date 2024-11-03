<template>
  <v-app>
    <v-navigation-drawer color="brown" theme="dark" permanent>
      <v-list color="transparent">
        <router-link to="/homeuser">
          <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
        </router-link>
        <router-link to="/reservar">
          <v-list-item prepend-icon="mdi-food" title="Reservas"></v-list-item>
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
      <v-toolbar-title>Bienvenido Usuario</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdministradorMenu'
}
</script>