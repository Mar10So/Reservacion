import { createRouter, createWebHistory } from 'vue-router';
import HomeSuperAdmin from '@/views/VistasSuperAdministrador/HomeSuperAdmin.vue';
import HomeAdminView from '@/views/vistasAdministrador/HomeAdminView.vue';
import HomeUsuario from '@/views/vistasUsuario/HomeUsuario.vue';
import PerfilRestaurante from '@/views/vistasAdministrador/PerfilRestaurante.vue';
import CatalogoRestaurante from '@/views/vistasAdministrador/CatalogoRestaurante.vue';
import MenuRestaurante from '@/views/vistasAdministrador/MenuRestaurante.vue';

const routes = [
  {
    /* Esta ruta nos dirige al home de Super Administrador */
    path: '/superadmin',
    name: 'superadmin',
    component: HomeSuperAdmin,
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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
