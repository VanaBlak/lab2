<template>
    <div>
      <h1>Discover Restaurants</h1>
      <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
      <div v-for="restaurant in restaurants" :key="restaurant.restaurant_id">
        <h2>{{ restaurant.name }}</h2>
        <p><strong>Email:</strong> {{ restaurant.email }}</p>
        <p><strong>Address:</strong> {{ restaurant.address }}</p>
        <p><strong>Phone Number:</strong> {{ restaurant.phone_number }}</p>
        <p><strong>Bio:</strong> {{ restaurant.bio }}</p>
        <p><strong>City:</strong> {{ restaurant.city }}</p>
        <p><strong>Profile URL:</strong> {{ restaurant.profile_url }}</p>
        <p><strong>Banner URL:</strong> {{ restaurant.banner_url }}</p>
        <p><strong>Banner Image:</strong> <img :src="restaurant.banner_url" alt="Restaurant Image" class="logo"></p>
        <!-- You can add more details or styling as needed -->

        <!-- Display Menu for the current restaurant -->
        <div v-if="restaurantMenu[restaurant.restaurant_id]">
          <h3>Menu</h3>
          <ul>
            <li v-for="menuItem in restaurantMenu[restaurant.restaurant_id]" :key="menuItem.id">
              {{ menuItem.name }} - ${{ menuItem.price }}
            </li>
          </ul>
        </div>
        <hr />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  // import VueCookies from 'vue-cookies';
  export default {
    data() {
      return {
        restaurants: [],
        restaurantMenu: {}, // New data property to store menus for each restaurant

      };
    },
    mounted() {
      // Make a GET request to fetch all restaurants
      this.fetchRestaurants();
    },
    methods: {
      fetchRestaurants() {
      // Replace 'your_api_key_here' with your actual API key
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      // Make a GET request to the /api/restaurants endpoint
      axios
        .get('https://foodie.bymoen.codes/api/restaurants', {
          headers: {
            'x-api-key': apiKey,
          },
        })
        .then((response) => {
          // Update the restaurants data with the response
          this.restaurants = response.data;

          // Fetch menu for each restaurant
          this.restaurants.forEach((restaurant) => {
            this.fetchMenu(restaurant.restaurant_id);
          });
        })
        .catch((error) => {
          console.error('Error fetching restaurants:', error);
        });
    },
    fetchMenu(restaurantId) {
      // Fetch menu for a specific restaurant
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      axios
        .get(`https://foodie.bymoen.codes/api/menu?restaurant_id=${restaurantId}`, {
          headers: {
            'x-api-key': apiKey,
          },
        })
        .then((response) => {
          // Update the restaurantMenu data with the menu for the specific restaurant
          this.$set(this.restaurantMenu, restaurantId, response.data);
        })
        .catch((error) => {
          console.error(`Error fetching menu for restaurant ${restaurantId}:`, error);
        });
    },
  },
};
  </script>
  
  <!-- Updated style section with #submit_button -->
<style scoped>
.about {
  text-align: center;
}

.logo {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 50%;
  padding: 8px;
  box-sizing: border-box;
}

/* Styled submit button with #submit_button */
#submit_button {
  background-color: #FFDB58; /* Yellow */
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

#submit_button:hover {
  background-color: #A88905; /* Darker yellow on hover */
}
</style>