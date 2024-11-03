<template>
  <v-container>
    <v-card>
        <v-text-field label="Nombre" maxLenght="50" counter color="indigo" clearable placeholder="Nombre del Admin" v-model="administracion_restaurantes.nombre_usuario"></v-text-field>
        <v-text-field label="correo" maxLenght="9" counter color="indigo" clearable placeholder="Correo de admin" v-model="administracion_restaurantes.email"></v-text-field>
        <v-text-field label="password" maxLenght="9" counter color="indigo" clearable placeholder="Contraseña" v-model="administracion_restaurantes.pasword"></v-text-field>
        <v-text-field label="rol" maxLenght="9" counter color="indigo" clearable placeholder="Rol del admin" v-model="administracion_restaurantes.rol"></v-text-field>
        <v-btn prepend-icon="mdi-check" color="indigo" block @click="agregarAdministrador">Agregar</v-btn>
    </v-card>
    
    <v-card>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(administracion_restaurante, i) in administracion_restaurante" :key="i">
                  <td>{{ administracion_restaurante.admin_id }}</td>
                  <td>{{ administracion_restaurante.nombre_usuario }}</td>
                  <td>{{ administracion_restaurante.email }}</td>
                  <td>{{ administracion_restaurante.rol }}</td>
                  <td> <v-btn-group>
                    <v-btn prepend-icon="mdi-eye" color="indigo" small @click="obtenerAdministrador(administracion_restaurante.admin_id, 1)"></v-btn>
                    <v-btn prepend-icon="mdi-pencil" color="green" small @click="obtenerAdministrador(administracion_restaurante.admin_id, 2)"></v-btn>
                    <v-btn prepend-icon="mdi-delete" color="red" small @click="eliminarAdministrador(administracion_restaurante.admin_id)"></v-btn>
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
            <v-list-item prepend-icon="mdi-account" :title="datos.nombre_usuario"></v-list-item>
            <v-list-item prepend-icon="mdi-email" :title="datos.email"></v-list-item>
            <v-list-item prepend-icon="mdi-earth" :title="datos.rol"></v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!--Modal para editar-->
    <v-dialog v-model="dialogTwo" transition="dialog-top-transition" width="500">
      <v-card title="Editar" subtitle="Datos del Administrador">
        <v-card-text>
          <v-text-field label="Nombre" max-length="50" counter color="indigo" clearable placeholder="Nombre del cliente" v-model="datos.nombre_usuario"></v-text-field>
          <v-text-field label="Telefono" max-length="9" counter color="indigo" clearable placeholder="Telefono del cliente" v-model="datos.email"></v-text-field>
          <v-text-field label="Telefono" max-length="9" counter color="indigo" clearable placeholder="Telefono del cliente" v-model="datos.rol"></v-text-field>
          <v-btn prepend-icon="mdi-check" color="indigo" block @click="modificarAdministrador(datos.admin_id)">
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
  name: 'AdministradoresView',
  data(){
    return{
      administracion_restaurante: [],// Para resivir los administradores
      administracion_restaurantes: {}, // Para mandar el array de administradores
      datos: {},
      alertaEstado: false,
      mensaje:'',
      dialogOne: false,
      dialogTwo: false
    }
  },
  methods: {
  // Método para obtener administradores
  obtenerAdministradores() {
    axios.get('http://127.0.0.1:8000/api/administrador/select')
      .then(response => {
        if (response.data.code == 200) {
          this.administracion_restaurante = response.data.data;
        }
      })
      .catch(error => console.log('Ha ocurrido un error: ' + error));
  },

  // Método para agregar administradores
  agregarAdministrador() {
    axios.post('http://127.0.0.1:8000/api/administrador/insertar', this.administracion_restaurantes)
      .then(response => {
        if (response.data.code == 200) {
          this.alertaEstado = true;
          this.mensaje = response.data.data;
          this.obtenerAdministradores(); // Aquí llamas a la función correcta
          this.administracion_restaurantes = {}; // Resetea el objeto
        }
      })
      .catch(error => console.log('Ha ocurrido un error: ' + error));
  },

  // Método para obtener administrador en los diálogos
  obtenerAdministrador(admin_id, action) {
    if (action == 1) {
      this.dialogTwo = false;
      this.dialogOne = true;
      axios.get(`http://127.0.0.1:8000/api/administrador/find/${admin_id}`)
        .then(response => {
          if (response.data.code == 200) {
            this.datos = response.data.data; // Asegúrate de que este es el camino correcto
          }
        })
        .catch(error => console.log('Ha ocurrido un error: ' + error));
    } else {
      this.dialogOne = false;
      this.dialogTwo = true;
      axios.get(`http://127.0.0.1:8000/api/administrador/find2/${admin_id}`)
        .then(response => {
          if (response.data.code == 200) {
            this.datos = response.data.data; // Asegúrate de que este es el camino correcto
          }
        })
        .catch(error => console.log('Ha ocurrido un error: ' + error));
    }
  },

  // Método para modificar administrador
  modificarAdministrador(admin_id) {
    axios.put(`http://127.0.0.1:8000/api/administrador/update/${admin_id}`, this.datos)
      .then(response => {
        if (response.data.code == 200) { // Verifica el código correcto
          this.obtenerAdministradores(); // Recarga los administradores
          this.dialogTwo = false; // Oculta el diálogo
          this.alertaEstado = true;
          this.mensaje = response.data.data;
        }
      })
      .catch(error => console.log('Ha ocurrido un error: ' + error));
  },

  // Método para eliminar administrador
  eliminarAdministrador(admin_id) {
    axios.delete(`http://127.0.0.1:8000/api/administrador/delete/${admin_id}`)
      .then(response => {
        if (response.data.code == 200) { // Verifica el código correcto
          this.alertaEstado = true;
          this.mensaje = response.data.data;
          this.obtenerAdministradores(); // Recarga los administradores
        }
      })
      .catch(error => console.log('Ha ocurrido un error: ' + error));
  }
},

  created(){
    this.obtenerAdministradores()
  }
}
</script>