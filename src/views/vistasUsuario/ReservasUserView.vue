<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-h5 mb-4">
            Nueva Reservación
          </v-card-title>
          <v-form>

            <v-select
              v-model="reservas.restaurante_id"
              :items="restaurantes"
              item-title="restaurante_id"
              item-value="restaurante_id"
              label="Restaurante"
              required
            ></v-select>

            <v-select
              v-model="reservas.usuario_id"
              :items="usuarios"
              item-title="usuario_id"
              item-value="usuario_id"
              label="Nombre Usuario"
              required
            ></v-select>

            <v-text-field
              v-model="reservas.fecha_reserva"
              type="date"
              label="Fecha de Reserva"
              required
            ></v-text-field>

            <v-text-field
              v-model="reservas.hora_reserva"
              label="Hora de Reserva"
              type="time"
              required
            ></v-text-field>

            <v-text-field
              v-model="reservas.numero_personas"
              label="Número de Personas"
              type="number"
              required
            ></v-text-field>

            <v-btn
              type="button"
              color="primary"
              block
              class="mt-4"
              @click="crearReserva"
            >
              Crear Reservación
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">{{ mensaje }}</v-snackbar>
  </v-container>
</template>


<script>
import axios from 'axios';
export default{
    name: 'ReservasUserView',
    data(){
        return{
            usuarios: [],
            restaurantes: [],
            reservas: {},
            alertaEstado: false,
            mensaje: '',
        }
    },
    methods: {
        obtenerUsuarios() {
      axios
        .get('http://127.0.0.1:8000/api/usuarios/select')
        .then((response) => {
          console.log('Respuesta de la API:', response.data); // Verifica la respuesta
          if (response.data.code === 200) {
            this.usuarios = response.data.data;
            console.log('Usuarios cargados:', this.usuarios); // Verifica las categorías
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


    //Metodo para crear una reserva
    crearReserva() {
      axios.post('http://127.0.0.1:8000/api/reservas/insertar', this.reservas)
        .then(response => {
          console.log('Respuesta de la API:', response); // Agrega este log
          if (response.data.code === 200) {
            this.alertaEstado = true;
            this.mensaje = response.data.data;
            this.reservas = {};
          }
        })
        .catch(error => {
          console.log('Ha ocurrido un error: ' + error);
          this.alertaEstado = true;
          this.mensaje = 'Error al agregar la reserva';
        });
    }


  },


  created() {
    this.obtenerUsuarios(); // Obtiene las categorías al crear el componente
    this.obtenerRestaurantes();
  },

}
</script>