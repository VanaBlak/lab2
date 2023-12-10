<template>
    <div class="restaurant-public">
      <h1>Restaurant Public Profile</h1>
      <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
      <br/>
      <div v-if="retrievedRestaurantDetails && retrievedRestaurantDetails.length > 0">
        <!-- Display restaurant details -->
        <p><strong>Email:</strong> {{ retrievedRestaurantDetails[0].email }}</p>
        <p><strong>Name:</strong> {{ retrievedRestaurantDetails[0].name }}</p>
        <p><strong>Address:</strong> {{ retrievedRestaurantDetails[0].address }}</p>
        <p><strong>Phone Number:</strong> {{ retrievedRestaurantDetails[0].phone_number }}</p>
        <p><strong>Bio:</strong> {{ retrievedRestaurantDetails[0].bio }}</p>
        <p><strong>City:</strong> {{ retrievedRestaurantDetails[0].city }}</p>
        <p><strong>Profile URL:</strong> {{ retrievedRestaurantDetails[0].profile_url }}</p>
        <p><strong>Banner URL:</strong> {{ retrievedRestaurantDetails[0].banner_url }}</p>
  
        <!-- Display hardcoded menu -->
        <h2>Menu</h2>
        <div v-for="(item, index) in menu" :key="item.id || index" class="menu-item">
          <img :src="item.image_url" alt="Menu Item Image" class="menu-item-image">
          <p><strong>Name:</strong> {{ item.name }}</p>
          <p><strong>Price:</strong> ${{ item.price }}</p>
          <p><strong>Description:</strong> {{ item.description }}</p>
          <!-- Placeholder "Order" button -->
          <button class="order-button" @click="orderItem(item)">Order</button><br/>
        </div>
      </div>
      <div v-else>
        <p>Please log in to view restaurant details.</p>
        <!-- You can add a login button or link here -->
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  export default {
    name: 'RestaurantPublic',
    computed: {
      retrievedRestaurantDetails() {
        return this.$store.getters.getRestaurantDetails;
      },
    },

    methods: {
      orderItem(item) {
        // Placeholder for order functionality
        alert(`Order placed for ${item.name}`);
        },
    //   orderItem(item) {
    //   const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

    //   // Create an array of menu item IDs
    //   const menuItems = [item.id];

    //   // Prepare the order payload
    //   const orderPayload = {
    //     menu_items: menuItems,
    //     restaurant_id: this.retrievedRestaurantDetails[0].restaurant_id,
    //   };

    //   // Make a POST request to place the order
    //   axios.post('https://foodie.bymoen.codes/api/client-order', orderPayload, {
    //   headers: {
    //     'x-api-key': apiKey,
    //   },
    // })
    // .then((response) => {
    //   // Store the order information in the Vuex store
    //   this.$store.commit('addOrder', {
    //     order_id: response.data.order_id,
    //     name: item.name,
    //     price: item.price,
    //     is_confirmed: false, // You may need to adjust this based on the API response
    //     is_complete: false,  // You may need to adjust this based on the API response
    //   });

    //   // Navigate to the OrdersPage
    //   this.$router.push('/orders');
    // })
    //   .catch((error) => {
    //     console.error('Error placing order:', error);

    //     // Check if the error has a response with details
    //     if (error.response) {
    //       console.error('Response data:', error.response.data);
    //       console.error('Response status:', error.response.status);
    //       console.error('Response headers:', error.response.headers);
    //     }

    //     // Handle the error, show a message, etc.
    //   });
    // },
      fetchMenu() {
        // Ensure retrievedRestaurantDetails is defined
        if (!this.retrievedRestaurantDetails) {
          // You can handle this case, for example, redirect to a login page
          console.error('Restaurant details not available. Redirect to login or handle accordingly.');
          return;
        }

        const restaurantId = this.retrievedRestaurantDetails[0].restaurant_id;
        const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

        axios
          .get(`https://foodie.bymoen.codes/api/menu?restaurant_id=${restaurantId}`, {
            headers: {
              'x-api-key': apiKey,
            },
          })
          .then((response) => {
            // Update the menu data with the response
            this.menu = response.data;
          })
          .catch((error) => {
            console.error('Error fetching menu:', error);
          });
      },
    },
    data() {
      return {
        menu: [],
      };
    },
    mounted() {
    // Fetch the menu when the component is mounted
    this.fetchMenu();
    // Ensure retrievedRestaurantDetails is defined
    if (!this.retrievedRestaurantDetails) {
      // You can handle this case, for example, redirect to a login page
      console.error('Restaurant details not available. Redirect to login or handle accordingly.');
    }
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
    background-color: #A88905; /* Green */
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
    max-width: 300px;
    max-height: 300px;
    margin-right: 20px;
  }

.order-button {
  background-color: #A88905; /* Green */
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 3px;
}

.order-button:hover {
  background-color: #A88905;
}
</style>
  