<template>
    <div class="background-image">
      <v-card
        class="mx-auto my-8 transparent-card"
        elevation="16"
        max-width="800"
      >
        <v-card-item>
          <v-card-title>
            Registro de Restaurante
          </v-card-title>
        </v-card-item>

        <v-card-text>
            <v-row>
                <v-col>
                     <!-- Nombre del restaurante -->
                        <v-text-field
                        label="Nombre"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="100"
                        prepend-inner-icon="mdi-account"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Dirección -->
                    <v-text-field
                        label="Dirección"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="255"
                        prepend-inner-icon="mdi-map"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- Ciudad -->
                    <v-text-field
                        label="Ciudad"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="100"
                        prepend-inner-icon="mdi-city"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Tipo de cocina -->
                    <v-text-field
                        label="Tipo de cocina"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="50"
                        prepend-inner-icon="mdi-silverware"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- Rango de precios -->
                    <v-text-field
                        label="Rango de precios"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="20"
                        prepend-inner-icon="mdi-cash"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Calificación promedio -->
                    <v-text-field
                        label="Calificación promedio"
                        color="brown"
                        type="number"
                        clearable
                        max="10.00"
                        step="0.01"
                        prepend-inner-icon="mdi-star"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- Capacidad -->
                    <v-text-field
                        label="Capacidad"
                        color="brown"
                        type="number"
                        clearable
                        prepend-inner-icon="mdi-chair-school"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Horario apertura -->
                    <v-text-field
                        label="Horario apertura"
                        color="brown"
                        type="time"
                        clearable
                        prepend-inner-icon="mdi-clock"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- Horario cierre -->
                    <v-text-field
                        label="Horario cierre"
                        color="brown"
                        type="time"
                        clearable
                        prepend-inner-icon="mdi-clock"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Email -->
                    <v-text-field
                        label="Email"
                        color="brown"
                        type="email"
                        counter
                        clearable
                        maxLength="100"
                        prepend-inner-icon="mdi-email"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <!-- Teléfono -->
                    <v-text-field
                        label="Teléfono"
                        color="brown"
                        type="text"
                        counter
                        clearable
                        maxLength="20"
                        prepend-inner-icon="mdi-phone"
                    ></v-text-field>
                </v-col>
                <v-col>
                    <!-- Imagen -->
                    <v-text-field
                        label="Imagen"
                        color="brown"
                        type="file"
                        counter
                        clearable
                        maxLength="255"
                        prepend-inner-icon="mdi-image"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>

        <v-row justify="center">
          <v-col class="text-center">
            <v-btn color="brown" class="mx-8">Guardar</v-btn>
            <v-btn color="orange" class="mx-8">Cancelar</v-btn>
            <br>
            <br>
          </v-col>
        </v-row>
      </v-card>
    </div>
</template>

<script>
    export default {
        name: 'PerfilRestaurante'
    }
</script>
