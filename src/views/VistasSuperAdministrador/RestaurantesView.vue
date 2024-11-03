<template>
  <v-container>
   <!--  <v-row>
      <v-col>
        <v-text-field label="Nombre" maxLenght="50" counter color="indigo" clearable placeholder="Nombre del Admin" v-model="restaurante.nombre"></v-text-field>
        <v-text-field label="Direccion" maxLenght="9" counter color="indigo" clearable placeholder="Correo de admin" v-model="restaurante.direccion"></v-text-field>
        <v-text-field label="ciudad" maxLenght="9" counter color="indigo" clearable placeholder="Contraseña" v-model="restaurante.ciudad"></v-text-field>
        <v-text-field label="Cocina" maxLenght="9" counter color="indigo" clearable placeholder="Rol del admin" v-model="restaurante.tipo_cocina"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="precios" maxLenght="50" counter color="indigo" clearable placeholder="Nombre del Admin" v-model="restaurante.rango_precios"></v-text-field>
        <v-text-field label="" maxLenght="9" counter color="indigo" clearable placeholder="Correo de admin" v-model="restaurante.email"></v-text-field>
        <v-text-field label="password" maxLenght="9" counter color="indigo" clearable placeholder="Contraseña" v-model="restaurante.pasword"></v-text-field>
        <v-text-field label="rol" maxLenght="9" counter color="indigo" clearable placeholder="Rol del admin" v-model="restaurante.rol"></v-text-field>
      </v-col>
    </v-row>

    <v-card>
        <v-btn prepend-icon="mdi-check" color="indigo" block @click="agregarAdministrador">Agregar</v-btn>
    </v-card>
     -->
    <v-card>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Direccion</th>
                  <th>Ciudad</th>
                  <th>Cocina</th>
                  <th>Precios</th>
                  <th>Capacidad de Personas</th>
                  <th>Abre</th>
                  <th>Cierra</th>
                  <th>Telefono</th>
                  <th>Imagen</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(restaurante, i) in restaurantes" :key="i">
                  <td>{{ restaurante.restaurante_id }}</td>
                  <td>{{ restaurante.nombre }}</td>
                  <td>{{ restaurante.email }}</td>
                  <td>{{ restaurante.direccion }}</td>
                  <td>{{ restaurante.ciudad }}</td>
                  <td>{{ restaurante.tipo_cocina }}</td>
                  <td>{{ restaurante.rango_precios }}</td>
                  <td>{{ restaurante.capacidad }}</td>
                  <td>{{ restaurante.horario_apertura }}</td>
                  <td>{{ restaurante.horario_cierre }}</td>
                  <td>{{ restaurante.telefono }}</td>
                  <td>{{ restaurante.imagen }}</td>
                  <td> <v-btn-group>
                    <v-btn prepend-icon="mdi-eye" color="indigo" small @click="obtenerRestaurante(restaurante.restaurante_id, 1)"></v-btn>
                    <v-btn prepend-icon="mdi-pencil" color="green" small @click="obtenerRestaurante(restaurante.restaurante_id, 2)"></v-btn>
                    <v-btn prepend-icon="mdi-delete" color="red" small @click="eliminarRestaurantes(restaurante.restaurante_id)"></v-btn>
                  </v-btn-group></td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card> 
        <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">{{ mensaje }}</v-snackbar>

        <!--Cuadro de dialogo para ver registro de admin -->
    <v-dialog v-model="dialogOne" transition="dialog-top-transition" width="500">
      <v-card title="Ver" subtitle="Datos del Administrador">
        <v-card-text>
          <v-list>
            <v-list-item prepend-icon="mdi-account" :title="datos.admin_id"></v-list-item>
            <v-list-item prepend-icon="mdi-account-circle" :title="datos.nombre"></v-list-item>
            <v-list-item prepend-icon="mdi-email" :title="datos.email"></v-list-item>
            <v-list-item prepend-icon="mdi-phone" :title="datos.telefono"></v-list-item>
            <v-list-item prepend-icon="mdi-image" :title="datos.imagen"></v-list-item>
            <v-list-item prepend-icon="mdi-home" :title="datos.direccion"></v-list-item>
            <v-list-item prepend-icon="mdi-city" :title="datos.ciudad"></v-list-item>
            <v-list-item prepend-icon="mdi-food-fork-drink" :title="datos.tipo_cocina"></v-list-item>
            <v-list-item prepend-icon="mdi-cash" :title="datos.rango_precios"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" :title="datos.capacidad"></v-list-item>
            <v-list-item prepend-icon="mdi-clock" :title="datos.horario_apertura"></v-list-item>
            <v-list-item prepend-icon="mdi-clock-out" :title="datos.horario_cierre"></v-list-item>

          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--Modal para editar-->
    <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
      <v-card title="Editar" subtitle="Datos del Administrador">
        <v-card-text>
          <v-card-text>
    <v-text-field 
        label="ID del Administrador" 
        max-length="50" 
        counter 
        color="indigo" 
        clearable 
        placeholder="ID del administrador" 
        v-model="datos.admin_id">
    </v-text-field>

    <v-text-field 
        label="Nombre" 
        max-length="50" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Nombre del cliente" 
        v-model="datos.nombre">
    </v-text-field>

    <v-text-field 
        label="Correo Electrónico" 
        max-length="100" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Correo del cliente" 
        v-model="datos.email">
    </v-text-field>

    <v-text-field 
        label="Teléfono" 
        max-length="15" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Teléfono del cliente" 
        v-model="datos.telefono">
    </v-text-field>

    <v-text-field 
        label="Imagen URL" 
        max-length="255" 
        counter 
        color="indigo" 
        clearable 
        placeholder="URL de la imagen" 
        v-model="datos.imagen">
    </v-text-field>

    <v-text-field 
        label="Dirección" 
        max-length="100" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Dirección del cliente" 
        v-model="datos.direccion">
    </v-text-field>

    <v-text-field 
        label="Ciudad" 
        max-length="50" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Ciudad del cliente" 
        v-model="datos.ciudad">
    </v-text-field>

    <v-text-field 
        label="Tipo de Cocina" 
        max-length="50" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Tipo de cocina" 
        v-model="datos.tipo_cocina">
    </v-text-field>

    <v-text-field 
        label="Rango de Precios" 
        max-length="50" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Rango de precios" 
        v-model="datos.rango_precios">
    </v-text-field>

    <v-text-field 
        label="Capacidad" 
        max-length="3" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Capacidad del restaurante" 
        v-model="datos.capacidad">
    </v-text-field>

    <v-text-field 
        label="Horario de Apertura" 
        max-length="10" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Ej. 08:00 AM" 
        v-model="datos.horario_apertura">
    </v-text-field>

    <v-text-field 
        label="Horario de Cierre" 
        max-length="10" 
        counter 
        color="indigo" 
        clearable 
        placeholder="Ej. 10:00 PM" 
        v-model="datos.horario_cierre">
    </v-text-field>
</v-card-text>

          <v-btn prepend-icon="mdi-check" color="indigo" block @click="modificarRestaurantes(datos.restaurante_id)">
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
  name: 'RestaurantesView',
  data() {
    return {
      restaurantes: [],//Para almacenar el array de restaurnates que se encuentran en la base de datos
      restaurante: {},
      datos: {},
      alertaEstado: false,
      mensaje:'',
      dialogOne: false,
      dialogTwo: false
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

    
    //Metodo para obtener restaurantes en los dialogs
    obtenerRestaurante(restaurante_id, action){
      //Cambiar la visibilidad del modal
      if(action == 1){
        this.dialogTwo = false
        this.dialogOne=true
        axios.get(`http://127.0.0.1:8000/api/restaurantes/find/${restaurante_id}`)
      .then(
        response=>{
          if(response.data.code==200){
            let res = response.data
            this.datos = res.data
          }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+ error))

      }else{
        console.log('hola');
        
        this.dialogOne = false
        this.dialogTwo = true
        axios.get(`http://127.0.0.1:8000/api/restaurantes/find2/${restaurante_id}`)
      .then(
        response=>{
          if(response.data.code==200){
            let res= response.data
            this.datos= res.data
          }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+error))
      }
      //Realizar la peticion
    },

    //Metodo para modificar restaurantes
    modificarRestaurantes(restaurante_id) {
    console.log("Modificando restaurante con ID:", restaurante_id);
    console.log("Datos a modificar:", this.datos);

    // Realizar la petición
    axios.put(`http://127.0.0.1:8000/api/restaurantes/update/${restaurante_id}`, this.datos)
        .then(response => {
            // Verificar si el código de respuesta es 200
            if (response.data.code === 200) {
                // Recargar la tabla de restaurantes
                this.obtenerRestaurantes();
                // Ocultar cuadro de diálogo
                this.dialogTwo = false;
                // Cambiar mensaje y visibilidad de la alerta
                this.alertaEstado = true;
                this.mensaje = response.data.data; // Suponiendo que el mensaje viene en 'data'
            } else {
                // Manejar caso en que la respuesta no es 200
                this.alertaEstado = true;
                this.mensaje = response.data.data; // Suponiendo que el mensaje viene en 'data'
            }
        })
        .catch(error => {
            console.error("Error en la modificación:", error.response ? error.response.data : error);
            this.alertaEstado = true;
            this.mensaje = "Ha ocurrido un error al modificar el restaurante.";
        });
},

    

    //Metodo para eliminar restaurantes
    eliminarRestaurantes(restaurante_id){
      axios.delete(`http://127.0.0.1:8000/api/restaurantes/delete/${restaurante_id}`)
      .then(
        response=>{
          if(response.data == 200){
            //Cambiar el mensaje y visibilidad
          this.alertaEstado=true
          this.mensaje = response.data.data

          //recargar la tabla
          this.obtenerRestaurantes()
            }
        }
      )
      .catch(error=>console.log('Ha ocurrido un error'+error))
    }


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