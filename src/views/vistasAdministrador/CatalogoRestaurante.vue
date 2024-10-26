<template>
  <v-container>
    <v-card class="mx-auto pa-6" max-width="800">
      <v-card-title class="text-h4 mb-4">
        Agregar Nuevo Plato
      </v-card-title>
      <v-form>
        <!-- Para las categorias -->
        <v-select
          v-model="producto.categoria_id"
          :items="categorias"
          item-title="nombre"
          item-value="categoria_id"
          label="Categorías"
          outlined
          required
        ></v-select>

        <!-- Para las restaurates -->
        <v-select
          v-model="producto.restaurante_id"
          :items="restaurantes"
          item-title="nombre"
          item-value="restaurante_id"
          label="Restaurantes"
          outlined
          required
        ></v-select>
        <!-- Para Menus -->
        <v-select
          v-model="producto.menu_id"
          :items="menus"
          item-title="nombre"
          item-value="menu_id"
          label="Menu"
          outlined
          required
        ></v-select>

        
        <v-text-field
          v-model="producto.nombre"
          label="Nombre del plato"
          outlined
          required
        ></v-text-field>

        <v-text-field
          v-model="producto.precio"
          label="Precio"
          prefix="$"
          type="number"
          outlined
          required
        ></v-text-field>

        <v-textarea
          v-model="producto.descripcion"
          label="Descripción"
          outlined
          required
        ></v-textarea>

        <v-text-field
          v-model="producto.imagen"
          label="Imgen del plato"
          placeholder="colocar URL"
          type="text"
          outlined
          required
        ></v-text-field>

        <v-btn
          color="primary"
          x-large
          block
          class="mt-4"
          @click="agregraProducto"
        >
          Agregar Producto
        </v-btn>
      </v-form>
      <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">{{ mensaje }}</v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'CatalogoRestaurante',
  data() {
    return {
      categorias: [],
      restaurantes: [],
      menus: [],
      producto: {},
      alertaEstado: false,
      mensaje: '',
    };
  },
  methods: {
    // Método para obtener las categorías
    obtenerCategorias() {
      axios
        .get('http://127.0.0.1:8000/api/categorias/select')
        .then((response) => {
          console.log('Respuesta de la API:', response.data); // Verifica la respuesta
          if (response.data.code === 200) {
            this.categorias = response.data.data;
            console.log('Categorías cargadas:', this.categorias); // Verifica las categorías
          }
        })
        .catch((error) => console.log('Ha ocurrido un error: ' + error));
    },
    //Metodo para obtener Restaurantes
    obtenerRestaurantes() {
      axios
        .get('http://127.0.0.1:8000/api/restaurantes/select')
        .then((response) => {
          console.log('Respuesta de la API:', response.data); // Verifica la respuesta
          if (response.data.code === 200) {
            this.restaurantes = response.data.data;
            console.log('Restaurantes cargados:', this.restaurantes); // Verifica las categorías
          }
        })
        .catch((error) => console.log('Ha ocurrido un error: ' + error));
    },

    //Metodo para otener Menus
    obtenerMenu() {
      axios
        .get('http://127.0.0.1:8000/api/menus/select')
        .then((response) => {
          console.log('Respuesta de la API:', response.data); // Verifica la respuesta
          if (response.data.code === 200) {
            this.menus = response.data.data;
            console.log('Menus cargados:', this.menus); // Verifica los Menus
          }
        })
        .catch((error) => console.log('Ha ocurrido un error: ' + error));
    },

    //agregar producto
    agregraProducto(){
      axios.post('http://127.0.0.1:8000/api/producto/insertar',this.producto)
      .then(
        response=>{
          if(response.data.code == 200){
            this.alertaEstado=true
            this.mensaje = response.data.data
            this.producto={}
          }
        }
      )
    }
  },
  created() {
    this.obtenerCategorias(); // Obtiene las categorías al crear el componente
    this.obtenerRestaurantes();
    this.obtenerMenu();
  },
}
</script>
