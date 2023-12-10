// store.js
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    clientDetails: null,
    restaurantDetails: null,
    orders: [], // New state to store orders

   
  },
  mutations: {
    updateClientDetails(state, clientDetails) {
      state.clientDetails = clientDetails;
    },
    updateRestaurantDetails(state, details) {
      state.restaurantDetails = details;
    },
    addOrder(state, order) {
      state.orders.push(order);
    },
    
  },
  
  getters: {
    getClientDetails: (state) => state.clientDetails,
    getRestaurantDetails: (state) => state.restaurantDetails,
    getOrders: (state) => state.orders,

  },
});
