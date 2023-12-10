<template>
    <div class="orders">
      <h1>Your Orders</h1>
      <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
      <div v-if="orders && orders.length > 0">
        <div v-for="order in orders" :key="order.order_id" class="order-item">
          <p><strong>Order ID:</strong> {{ order.order_id }}</p>
          <p><strong>Item:</strong> {{ order.name }}</p>
          <p><strong>Price:</strong> ${{ order.price }}</p>
          <p><strong>Confirmed:</strong> {{ order.is_confirmed ? 'Yes' : 'No' }}</p>
          <p><strong>Completed:</strong> {{ order.is_complete ? 'Yes' : 'No' }}</p>
        </div>
      </div>
      <div v-else>
        <p>No orders available.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrdersPage',
    computed: {
      orders() {
        return this.$store.state.orders;
      },
    },
  };
  </script>
 <style scoped>
 .restaurant-profile {
   text-align: center;
 }

 .logo {
   max-width: 100%;
   height: auto;
   max-height: 200px;
   margin-bottom: 20px;
 }

 /* Styled buttons */
 .edit-button,
 .delete-button,
 .logout-button {
   background-color: #FFDB58; /* Green */
   border: none;
   color: white;
   padding: 10px 20px;
   text-align: center;
   text-decoration: none;
   display: inline-block;
   font-size: 16px;
   margin: 4px 2px;
   cursor: pointer;
   border-radius: 5px;
 }

 .edit-button:hover,
 .delete-button:hover,
 .logout-button:hover {
   background-color: #A88905; /* Darker green on hover */
 }
 .menu-item-image {
   max-width: 100px;
   max-height: 100px;
   margin-right: 20px;
 }
</style>