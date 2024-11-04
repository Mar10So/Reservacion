<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col xs="12" sm="4" md="4" lg="4" xl="4" xxl="4">
                <v-card>
                    <v-img height="150" cover src="https://www.salesforce.com/content/dam/web/es_mx/blog/seguimiento-de-ventas-como-hacer.jpg"></v-img>
                    <v-card-text>
                        <h2 class="text-blue-grey-darken-2">Sistema de ventas</h2>
                        <p class="text-blue-grey-darken-2">Login</p>
                        <br>
                        <v-form>
                            <v-text-field label="Correo" placeholder="correo@ventasxperto.com" counter maxLenght="70" color="indigo" clearable prepend-icon="mdi-email" v-model="usuario.email"></v-text-field>
                            <v-text-field label="Contraseña" placeholder="********" counter maxLenght="15" color="indigo" clearable prepend-icon="mdi-key" v-model="usuario.password" type="password"></v-text-field>
                        </v-form>
                        <v-btn @click="login" color="indigo" block="">Iniciar Sesión</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar :timeout="1500" color="red-darken-4" v-model="alertaEstado">{{ alertaMensaje }}</v-snackbar>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'LoginComponent',
    data() {
        return {
            usuario: {
                email: '',
                password: ''
            },
            alertaEstado: false,
            alertaMensaje: ''
        }
    },
    methods:{
        login(){
    axios.post('http://127.0.0.1:8000/api/usuario/login', this.usuario)
    .then(response => {
        if (response.status === 200) {
            let datos = {
                usuario: response.data.data.name,
                rol: response.data.data.rol,  // Asegúrate de que el rol esté dentro de data.data
                token: response.data.token
            };
            // Guardar datos en storage y Vuex
            this.$store.dispatch('login', datos);
            // Redirigir
            this.$router.push('/layout');
        }
    })
    .catch(error => {
        console.log('Ha ocurrido un error: ' + error);
        this.alertaEstado = true;

        if (error.response && error.response.status === 401) {
            this.alertaMensaje = error.response.data.data;
        } else {
            this.alertaMensaje = 'Algo salió mal';
        }
    });
}

    }
}
</script>
