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

              <v-btn type="submit" color="primary" block class="mt-4">
                Agregar Plato
              </v-btn>

              <v-alert v-if="mensajeExito" type="success" class="mt-3">
                {{ mensajeExito }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'; // Importar el router

const store = useStore();
const router = useRouter(); // Usar router

const platoNuevo = ref({
  nombre: '',
  tipo: '',
  descripcion: '',
  precio: 0
});

const tiposPlato = ['Plato', 'Bebida', 'Postre'];

const mensajeExito = ref(null);

const agregarPlato = () => {
  if (platoNuevo.value.nombre && platoNuevo.value.descripcion && platoNuevo.value.precio > 0) {
    store.dispatch('agregarPlato', {
      id: Date.now(),
      ...platoNuevo.value
    });

    // Mostrar mensaje de éxito
    mensajeExito.value = "¡Plato agregado exitosamente!";
    setTimeout(() => {
      mensajeExito.value = null;
      // Redirigir a la vista MostrarMenuView
      router.push('/muestra');
    }, 1000);

    // Reiniciar el formulario
    platoNuevo.value = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: 0
    };
  }
};
</script>