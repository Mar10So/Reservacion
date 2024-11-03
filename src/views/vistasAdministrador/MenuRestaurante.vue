<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(productos, i) in producto"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card class="menu-item">
          <v-img :src="productos.imagen" height="200px"></v-img>
          <v-card-title>{{ productos.nombre }}</v-card-title>
          <v-card-subtitle>Precio: {{ productos.precio }}</v-card-subtitle>
          <v-card-text>{{ productos.descripcion }}</v-card-text>
          <v-btn prepend-icon="mdi-eye" color="indigo" small @click="obtenerProducto(productos.producto_id, 1)"></v-btn>
          <v-btn prepend-icon="mdi-pencil" color="green" small @click="obtenerProducto(productos.producto_id, 2)"></v-btn>
          <v-btn prepend-icon="mdi-delete" color="red" small @click="eliminarProducto(productos.producto_id)"></v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">{{ mensaje }}</v-snackbar>

    <!-- Cuadro de diálogo para ver registro -->
    <v-dialog v-model="dialogOne" transition="dialog-top-transition" width="500">
      <v-card title="Ver" subtitle="Datos del Producto">
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="mdi-food" :title="datos.nombre"></v-list-item>
            <v-list-item prepend-icon="mdi-currency-usd" :title="datos.precio"></v-list-item>
            <v-list-item prepend-icon="mdi-note-text" :title="datos.descripcion"></v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="dialogOne = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal para editar -->
    <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
      <v-card title="Editar" subtitle="Datos del Producto">
        <v-card-text>
          <v-text-field label="Nombre" v-model="datos.nombre" max-length="50" counter prepend-icon="mdi-food"></v-text-field>
          <v-text-field label="Precio" type="number" v-model="datos.precio" max-length="9" counter prepend-icon="mdi-currency-usd"></v-text-field>
          <v-text-field label="Descripción" v-model="datos.descripcion" max-length="200" counter prepend-icon="mdi-note-text"></v-text-field>
          <v-text-field label="Imagen" v-model="datos.imagen" max-length="200" counter prepend-icon="mdi-image"></v-text-field>
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
export default {
  name: 'MenuRestaurante',
  data() {
    return {
      producto: [],
      alertaEstado: false,
      mensaje: '',
      datos:{},
      dialogOne: false,
      dialogTwo: false,
    };
  },
  methods: {
    // Metodo para todos los obtenerProducto  
    obtenerProductos() {
      axios.get('http://127.0.0.1:8000/api/producto/select')
        .then(response => {
          if (response.data.code === 200) {
            this.producto = response.data.data;
          } else {
            this.mensaje = response.data.data;
            this.alertaEstado = true;
          }
        })
        .catch(error => console.log('Ha ocurrido un error: ' + error));
    },

    //Metodo para obtener el producto en los dialog 
    obtenerProducto(producto_id, action){
      if(action == 1){
        this.dialogTwo = false
        this.dialogOne = true
        axios.get(`http://127.0.0.1:8000/api/producto/find/${producto_id}`)
        .then(
          response=>{
            if(response.data.code==200){
              let res = response.data
              this.datos = res.data
            }
          }
        )
        .catch(error=>console.log('Ha ocurrido un error '+ error))
      }else{
        console.log('hola');
        this.dialogOne = false
        this.dialogTwo =true
        axios.get(`http://127.0.0.1:8000/api/producto/find2/${producto_id}`)
        .then(
          response=>{
            if(response.data.code==200){
              let res = response.data
              this.datos = res.data
            }
          }
        )
        .catch(error=>console.log('Ha ocurrido un error '+ error))
      }
    },
    

    //Modificar Producto
    modificarProducto(producto_id){
      console.log(this.datos);
      //Realizar la peticion
      axios.put(`http://127.0.0.1:8000/api/producto/update/${producto_id}`, this.datos)
      .then(
        response=>{
          if(response.data.codePro==200){
            //recargar la tabla tes
            this.obtenerProductos()
            //ocultar cuadro de dialogo
            this.dialogTwo = false
            //Cambiar mensaje y visibilidad de la alerta
            this.alertaEstado=true
            this.mensaje = response.data.data
            
          }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+ error))
    },



    //Metodo para eliminar producto
    eliminarProducto(producto_id){
      axios.delete(`http://127.0.0.1:8000/api/producto/delete/${producto_id}`)
      .then(
        response=>{
          if(response.data == 200){
            //Cambiar el mensaje y visibilidad
          this.alertaEstado=true
          this.mensaje = response.data.data

          //recargar la tabla
          this.obtenerProductos()
            }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+error))
    }
  },
  created() {
    this.obtenerProductos();
  }
};
</script>

<style scoped>
.menu-item {
  margin-bottom: 20px;
}
</style>
