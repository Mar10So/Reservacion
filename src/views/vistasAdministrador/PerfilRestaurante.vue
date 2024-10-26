<template>
    <v-container>
      <v-card class="mx-auto pa-6" max-width="800">
        <v-card-title class="text-h4 mb-4">
          Digita los Datos de tu Restaurante
        </v-card-title>
        <v-form>
          <v-row>
            <!-- Columna Izquierda -->
            <v-col cols="12" md="6">
              <v-text-field v-model="restaurantes.nombre" label="Nombre del Restaurante" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.direccion" label="Dirección" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.ciudad" label="Ciudad" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.tipo_cocina" label="Tipo de Cocina" outlined></v-text-field>
              <v-text-field v-model="restaurantes.calificacion_promedio" label="Calificación Promedio" type="number" outlined></v-text-field>
            </v-col>
  
            <!-- Columna Derecha -->
            <v-col cols="12" md="6">
              <v-text-field v-model="restaurantes.rango_precios" label="Rango de Precios" outlined></v-text-field>
              <v-text-field v-model="restaurantes.capacidad" label="Capacidad" type="number" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.horario_apertura" label="Horario de Apertura" type="time" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.horario_cierre" label="Horario de Cierre" type="time" outlined required></v-text-field>
              <v-text-field v-model="restaurantes.email" label="Email" type="email" outlined></v-text-field>
              <v-text-field v-model="restaurantes.telefono" label="Teléfono" outlined></v-text-field>
              <v-text-field v-model="restaurantes.imagen" label="URL imagen" type="text" outlined></v-text-field>
            </v-col>
          </v-row>
  
          <!-- Select para Administrador -->
          <v-select
            v-model="restaurantes.admin_id"
            :items="administracion_restaurante"
            item-title="nombre_usuario"
            item-value="admin_id"
            label="Selecciona Administrador"
            outlined
            required
          ></v-select>
  
          <v-btn color="primary" @click="agregarRestaurante" class="mt-4">Agregar Restaurante</v-btn>
        </v-form>
        <v-snackbar v-model="alertaEstado" color="blue-accent-1" timeout="2000">{{ mensaje }}</v-snackbar>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'PerfilRestaurante',
    data() {
      return {
        administracion_restaurante: [],
        restaurantes: {},
        alertaEstado: false,
        mensaje: '',
      };
    },
    methods: {
      obtenerAdministrador() {
        axios
          .get('http://127.0.0.1:8000/api/administrador/select')
          .then((response) => {
            console.log('Respuesta de la API:', response.data);
            if (response.data.code === 200) {
              this.administracion_restaurante = response.data.data;
              console.log('Administradores cargados:', this.administracion_restaurante);
            }
          })
          .catch((error) => console.log('Ha ocurrido un error: ' + error));
      },
      agregarRestaurante() {
        axios.post('http://127.0.0.1:8000/api/restaurantes/insertar', this.restaurantes)
          .then(response => {
            if (response.data.code === 200) {
              this.alertaEstado = true;
              this.mensaje = response.data.data;
              this.restaurantes = {};
            }
          })
          .catch(error => {
            console.log('Ha ocurrido un error: ' + error);
            this.alertaEstado = true;
            this.mensaje = 'Error al agregar el restaurante';
          });
      },
    },
    created() {
      this.obtenerAdministrador();
    },
  }
  </script>
  