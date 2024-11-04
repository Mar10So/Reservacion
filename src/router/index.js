import { createRouter, createWebHistory } from 'vue-router';
import HomeSuperAdmin from '@/views/VistasSuperAdministrador/HomeSuperAdmin.vue';
import HomeAdminView from '@/views/vistasAdministrador/HomeAdminView.vue';
import HomeUsuario from '@/views/vistasUsuario/HomeUsuario.vue';
import PerfilRestaurante from '@/views/vistasAdministrador/PerfilRestaurante.vue';
import CatalogoRestaurante from '@/views/vistasAdministrador/CatalogoRestaurante.vue';
import MenuRestaurante from '@/views/vistasAdministrador/MenuRestaurante.vue';
import CatalogosView from '@/views/vistasUsuario/CatalogosView.vue';
import AdministradoresView from '@/views/VistasSuperAdministrador/AdministradoresView.vue';
import RestaurantesView from '@/views/VistasSuperAdministrador/RestaurantesView.vue';
import ReservasUserView from '@/views/vistasUsuario/ReservasUserView.vue';
import LoginComponent from '@/components/LoginComponent.vue';

const routes = [

  {
    path: '/login',  // Corrección aquí
    name: 'login',
    component: LoginComponent
  },
  
  {
    /* Esta ruta nos dirige al home de Super Administrador */
    path: '/superadmin',
    name: 'superadmin',
    component: HomeSuperAdmin,
    meta: { role: 'superadmin' }
  },
  {
    /* Esta ruta nos dirige a los restaurantes de Super Administrador */
    path: '/restaurantes',
    name: 'restaurantes',
    component: RestaurantesView,
    meta: { role: 'superadmin' }
  },
  {
    /* Esta ruta nos dirige a los administradores Super Administrador */
    path: '/administradores',
    name: 'administradores',
    component: AdministradoresView,
    meta: { role: 'superadmin' }
  },




  
  {
    /* Esta ruta nos dirige al home de administrador */
    path: '/homeadmin',
    name: 'homeadmin',
    component: HomeAdminView,
    meta: { role: 'admin' }
  },
  {
    /* Esta ruta nos dirige al perfil del resturante */
    path: '/perfil',
    name: 'perfil',
    component: PerfilRestaurante,
    meta: {role: 'admin'}
  },
  {
    path: '/menu',
    name: 'menu',
    component: CatalogoRestaurante,
    meta: {role: 'admin'}
  },
  {
    path: '/producto',
    name: 'producto',
    component: MenuRestaurante,
    meta: {role: 'admin'}
  },







  {
    /* Esta ruta nos dirige al home de usuario */
    path: '/homeuser',
    name: 'homeuser',
    component: HomeUsuario,
    meta: { role: 'user' }
  },
  {
    /* Esta ruta nos dirige a crear Reservas */
    path: '/reservar',
    name: 'reservar',
    component: ReservasUserView,
    meta: { role: 'user' }
  },
  {
    /* Esta ruta nos dirige al Menu del restaurante */
    path: '/catalogo',
    name: 'catalogo',
    component: CatalogosView,
    meta: { role: 'user' }
  },





];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
