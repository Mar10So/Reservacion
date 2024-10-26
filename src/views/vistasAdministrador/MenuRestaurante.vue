<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(producto, i) in producto" 
          :key="i"
          cols="12" md="4" 
        >
          <v-card class="menu-item">
            <v-img :src="producto.imagen" height="200px"></v-img>
            <v-card-title>{{ producto.nombre }}</v-card-title>  <!-- Cambié "name" a "nombre" -->
            <v-card-subtitle>Precio: {{ producto.precio }}</v-card-subtitle>
            <v-card-text>{{ producto.descripcion }}</v-card-text>
          </v-card>
            <v-btn prepend-icon="mdi-pencil" color="green" small @click="modificarProducto(producto.producto_id, 1)"></v-btn>
            <v-btn prepend-icon="mdi-delete" color="red" small @click="eliminarProducto(producto.producto_id)"></v-btn>
        </v-col>
      </v-row>

      <!--Modal para editar-->
    <v-dialog v-model="dialoTwo" transition="dialog-top-transition" width="500">
      <v-card title="Editar" subtitle="Datos del Producto">
        <v-card-text>
          <v-text-field label="Nombre" max-length="50" counter color="indigo" clearable placeholder="Nombre del Producto" v-model="producto.nombre"></v-text-field>
          <v-text-field label="Descripcion" max-length="9" counter color="indigo" clearable placeholder="Descripcion" v-model="producto.descripcion"></v-text-field>
          <v-select color="indigo" label="Pais" :items="paises" item-value="producto_id" item-title="precio" v-model="producto.precio"></v-select>
          <v-text-field label="Imagen" max-length="100" counter color="indigo" clearable placeholder="Imagen del Producto" v-model="producto.nombre"></v-text-field>
          <v-btn prepend-icon="mdi-check" color="indigo" block @click="modificarProducto(datos.producto_id)">
            Guardar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-container>
</template>


<script>
import axios from 'axios';
export default{
    name: 'MenuRestaurante',
    data(){
        return{
            producto: {},
            datos: {},
        }
    },
    methods: {
        //Metodo para obtener los productos
    obtenerProducto() {
      axios
        .get('http://127.0.0.1:8000/api/producto/select')
        .then((response) => {
          console.log('Respuesta de la API:', response.data); // Verifica la respuesta
          if (response.data.code === 200) {
            this.producto = response.data.data;
            console.log('Productos cargadas:', this.producto); // Verifica las categorías
          }
        })
        .catch((error) => console.log('Ha ocurrido un error: ' + error));
        },
    },
    //Metodo Para Modificar Un producto
    modificarProducto(producto_id){
      console.log(this.datos);
      //Realizar la peticion
      axios.put(`http://127.0.0.1:8000/api/producto/update/${producto_id}`,this.datos)
      .then(
        response=>{
          if(response.data.code==200){
            //recargar la tabla Producto
            this.obtenerProducto()
            //ocultar cuadro de dialogo
            this.dialogOne = false
            //Cambiar mensaje y visibilidad de la alerta
            this.alertaEstado=true
            this.mensaje = response.data.data
            
          }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+error))
    },

    created() {
    this.obtenerProducto(); // Obtiene las categorías al crear el componente
  },
}
</script>