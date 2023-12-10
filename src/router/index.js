import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import ClientSignup from '../views/ClientSignup.vue'
import RestaurantSignup from '../views/RestaurantSignup.vue' 
import ClientLogin from '../views/ClientLogin.vue' 
import RestaurantLogin from '../views/RestaurantLogin.vue'
import DashBoard from '../views/DashBoard.vue'
import ClientDashBoard from '../views/ClientDashboard.vue'
import CreateMenu from '../views/CreateMenu.vue'
import ClientProfile from '../views/ClientProfile.vue';
import RestaurantProfile from '../views/RestaurantProfile.vue';
import RestaurantPublic from '../views/RestaurantPublic.vue';
import DiscoverPage from '../views/DiscoverPage.vue';
import OrdersPage from '../views/OrdersPage.vue';
import ShoppingCart from '../views/ShoppingCart.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: AboutView
  // },
  {
    path: '/client_signup',
    name: 'client_signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ClientSignup
  },
  {
    path: '/restaurant_signup',
    name: 'restaurant_signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RestaurantSignup
  },
  {
    path: '/client_login',
    name: 'client_login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ClientLogin
  },
  {
    path: '/restaurant_login',
    name: 'restaurant_login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RestaurantLogin
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DashBoard
  },
  {
    path: '/client_dashboard',
    name: 'client_dashBoard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ClientDashBoard
  },
  {
    path: '/create_menu',
    name: 'create_menu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CreateMenu
  },
  {
    path: '/client_profile',
    name: 'client_profile',
    component: ClientProfile,
  },
  {
    path: '/restaurant_profile',
    name: 'restaurant_profile',
    component: RestaurantProfile,
  },
  {
    path: '/restaurant_public',
    name: 'restaurant_public',
    component: RestaurantPublic,
  },
  {
    path: '/discover_page',
    name: 'discover_page',
    component: DiscoverPage,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
  },
  {
    path: '/shopping_cart',
    name: 'shopping_cart',
    component: ShoppingCart,
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
