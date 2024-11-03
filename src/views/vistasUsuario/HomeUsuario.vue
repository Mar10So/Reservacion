<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(restaurante, i) in restaurantes"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card class="menu-item">
          <v-img :src="restaurante.imagen" height="200px"></v-img>
          <v-card-title>{{ restaurante.nombre }}</v-card-title>
          <v-card-subtitle>direccion: {{ restaurante.direccion }}</v-card-subtitle>
          <v-card-text>Ciudad: {{ restaurante.ciudad }}</v-card-text>
          <v-card-text>{{ restaurante.telefono }}</v-card-text>
          <v-card-text>{{ restaurante.horario_apertura }} .am</v-card-text>
          <v-card-text>{{ restaurante.horario_cierre }} .pm</v-card-text>
          <v-btn color="indigo" small to="/reservar">reservar</v-btn>
          <v-btn color="green" small to="/catalogo">ver menu</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import axios from 'axios';
export default {
  name: 'HomeUsuario',
  data() {
    return {
      restaurantes: [],//Para almacenar el array de restaurnates que se encuentran en la base de datos
    };
  },
  methods: {
    // Metodo para todos los obtenerProducto  
    obtenerRestaurantes() {
      axios.get('http://127.0.0.1:8000/api/restaurantes/select')
        .then(response => {
          if (response.data.code === 200) {
            this.restaurantes = response.data.data;
          } else {
            this.mensaje = response.data.data;
            this.alertaEstado = true;
          }
        })
        .catch(error => console.log('Ha ocurrido un error: ' + error));
    },

  },
  created() {
    this.obtenerRestaurantes();
  }
};
</script>

<style scoped>
.menu-item {
  margin-bottom: 20px;
}
</style>