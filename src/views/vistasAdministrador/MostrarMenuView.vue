<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <h1 class="text-h4 text-center mb-6">Menú Actual</h1>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col v-for="plato in platos" :key="plato.id" cols="12" sm="6" md="4">
          <v-card class="mb-4">
            <v-card-title>{{ plato.nombre }}</v-card-title>
            <v-card-text>
              <p>{{ plato.descripcion }}</p>
              <p class="text-h6 mt-2">
                ${{ typeof plato.precio === 'number' ? plato.precio.toFixed(2) : 'N/A' }}
              </p>
              <v-chip :color="getTipoColor(plato.tipo)" text-color="white" class="mt-2">
                {{ capitalizarPrimeraLetra(plato.tipo) }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const platos = computed(() => store.getters['obtenerPlatos']);

const capitalizarPrimeraLetra = (cadena) => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};

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
  