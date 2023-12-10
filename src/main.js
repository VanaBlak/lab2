// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store'; // Adjust the path based on your project structure


import VueCookies from 'vue-cookies';

Vue.use(VueCookies, { expires: '7d' });

Vue.config.productionTip = false;

new Vue({
  router,
  store, // Correct the import path here
  render: h => h(App),
}).$mount('#app');
