<template>
  <v-container>
    <!-- Título centralizado -->
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-6">Menú del Restaurante</h1>
      </v-col>
    </v-row>

    <!-- Formulario para agregar items -->
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="mb-6">
          <v-card-title>Agregar Nuevo Plato</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="agregarPlato" ref="form">
              <v-text-field
                v-model="platoNuevo.nombre"
                label="Nombre del Plato"
                required
                :rules="[v => !!v || 'El nombre es requerido']"
              ></v-text-field>

              <!-- El select con los tipos de plato -->
              <v-select
                v-model="platoNuevo.tipo"
                :items="tiposPlato"
                label="Tipo"
                required
              ></v-select>

              <v-textarea
                v-model="platoNuevo.descripcion"
                label="Descripción"
                required
                :rules="[v => !!v || 'La descripción es requerida']"
              ></v-textarea>

              <v-text-field
                  v-model.number="platoNuevo.precio" 
                  label="Precio"
                  type="number"
                  step="0.01"
                  prefix="$"
                  required
                  :rules="[v => v > 0 || 'El precio debe ser positivo']"
                />


              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
              >
                Agregar Plato
              </v-btn>

              <!-- Mensaje de éxito al agregar -->
              <v-alert v-if="mensajeExito" type="success" class="mt-3">
                {{ mensajeExito }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sección de tarjetas de items -->
    <v-row>
      <v-col
        v-for="plato in platos"
        :key="plato.id"
        cols="12"
        sm="6"
        md="4"
      >
      <v-card-text>
          <p>{{ plato.descripcion }}</p>
          <p class="text-h6 mt-2">
            <!-- Validación para asegurarse que precio sea numérico -->
            ${{ typeof plato.precio === 'number' ? plato.precio.toFixed(2) : 'N/A' }}
          </p>
          <v-chip
            :color="getTipoColor(plato.tipo)"
            text-color="white"
            class="mt-2"
          >
            {{ capitalizarPrimeraLetra(plato.tipo) }}
          </v-chip>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

// Lista de platos en el menú
const platos = ref([]);

// Nuevo plato que se agrega al menú
const platoNuevo = ref({
  nombre: '',
  tipo: '',
  descripcion: '',
  precio: 0
});

// Tipos de plato disponibles
const tiposPlato = ['Plato', 'Bebida', 'Postre'];

// Mensaje de confirmación
const mensajeExito = ref(null);

// Función para agregar un nuevo plato
const agregarPlato = () => {
  if (platoNuevo.value.nombre && platoNuevo.value.descripcion && platoNuevo.value.precio > 0) {
    platos.value.push({
      id: Date.now(),
      ...platoNuevo.value
    });
    // Mostrar mensaje de éxito
    mensajeExito.value = "¡Plato agregado exitosamente!";
    setTimeout(() => mensajeExito.value = null, 2000);

    // Reiniciar el formulario
    platoNuevo.value = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: 0
    };
  }
};

// Capitalizar la primera letra de un string
const capitalizarPrimeraLetra = (cadena) => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

// Obtener el color basado en el tipo de plato
const getTipoColor = (tipo) => {
  switch (tipo.toLowerCase()) {
    case 'plato':
      return 'indigo';
    case 'bebida':
      return 'cyan';
    case 'postre':
      return 'pink';
    default:
      return 'grey';
  }
};
</script>

<style scoped>
/* Mejorar el espaciado de las tarjetas */
.v-card {
  transition: transform 0.3s ease;
}

.v-card:hover {
  transform: scale(1.05);
}
</style>
