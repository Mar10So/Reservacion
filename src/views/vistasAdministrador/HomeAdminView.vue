<template>
  <v-container>

    <!-- Informacion del restaurantes -->
      <v-img
        src="../../assets/login.jpg"
        height="200"
        cover
        class="align-end"
      >
        <v-card-title class="text-white text-h4">
          La Bella Italia
        </v-card-title>
      </v-img>

      <v-card-text>
        <v-row align="center" class="mx-0 mb-4">
          <v-rating
            :model-value="4.7"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>

          <div class="text-grey ms-4">
            4.7 (203 reseñas)
          </div>
        </v-row>

        <v-row align="center" class="mx-0">
          <v-icon icon="mdi-silverware-fork-knife" color="grey-darken-1"></v-icon>
          <div class="text-grey-darken-1 ms-2">
            Cocina Italiana
          </div>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <div class="text-h6 mb-2">
          Estado de las mesas
        </div>

        <v-row align="center" class="mx-0 mb-2">
          <div>Mesas reservadas</div>
          <v-spacer></v-spacer>
          <div class="font-weight-bold">15 / 20</div>
        </v-row>

        <v-progress-linear
          model-value="75"
          color="blue-darken-1"
          height="10"
          rounded
        ></v-progress-linear>

        <v-row align="center" class="mx-0 mt-2">
          <div class="text-grey-darken-1">75% ocupación</div>
          <v-spacer></v-spacer>
          <div class="text-grey-darken-1">5 mesas disponibles</div>
        </v-row>
      </v-card-text>
    <!-- Tabla de Comentarios -->
    <br>

    <!-- ParaComentarios  -->
    <v-card>
      <v-table height="300px">
        <thead>
          <tr>
            <th class="text-left">
              Nombre
            </th>
            <th class="text-left">
              Comentarios
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gustavo</td>
            <td>La comida estaba fea</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>



<script>
export default{
  name: 'HomeAdminView',
  
}
</script>