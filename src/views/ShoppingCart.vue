<template>
    <div class="shopping-cart">
      <h1>Shopping Cart</h1>
      <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
      <p>Your shopping cart is empty.</p>
  
      <!-- Display items in the shopping cart -->
      <!-- <div v-if="cart.length > 0">
        <ul>
          <li v-for="item in cart" :key="item.id">
            {{ item.name }} - ${{ item.price }} - Quantity: {{ item.quantity }}
            <button @click="removeFromCart(item.id)">Remove</button>
          </li>
        </ul>
  
        <p>Total: ${{ calculateTotal() }}</p> -->
  
        <!-- Button to submit the order -->
        <!-- <button @click="submitOrder">Submit Order</button>
      </div> -->
  
      <!-- Display a message if the cart is empty -->
      <!-- <div v-else>
        <p>Your shopping cart is empty.</p>
      </div> -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShoppingCart',
    computed: {
      // Retrieve the shopping cart from the Vuex store
      cart() {
        return this.$store.getters.getShoppingCart;
      },
    },
    methods: {
      removeFromCart(itemId) {
        // Dispatch a Vuex action to remove an item from the shopping cart
        this.$store.dispatch('removeFromCart', itemId);
      },
      calculateTotal() {
        // Calculate the total price of items in the shopping cart
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      },
      submitOrder() {
        // You can implement the logic to submit the order here
        // For example, you can send a request to the server to process the order
  
        // After submitting, clear the shopping cart
        this.$store.dispatch('clearShoppingCart');
  
        // Display a success message or navigate to a confirmation page
        alert('Order submitted successfully!');
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