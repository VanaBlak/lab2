<template>
  <div class="about">
    <h1>Restaurant Login</h1>
    <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
    
    <form v-on:submit.prevent="submitForm">
      <label for="email">Email:</label><br>
      <input type="text" id="email" name="email" v-model="email" required><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" v-model="password" required><br>

      <button id="submit_button" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  name: 'RestaurantLogin',
  data() {
    return {
      email: '',
      password: '',
      isLoggedInAsRestaurant: false,
    };
  },
  methods: {
    checkIsLoggedInAsRestaurant() {
      // Retrieve token from cookies
      const token = VueCookies.get('token');
      this.isLoggedInAsRestaurant = !!token;
      console.log('isLoggedInAsRestaurant:', this.isLoggedInAsRestaurant);
    },
    submitForm() {
      const body = {
        email: this.email,
        password: this.password
      };

      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      const headers = {
        'x-api-key': apiKey
      };

      axios.post('https://foodie.bymoen.codes/api/restaurant-login', body, { headers: headers })
        .then(this.success)
        .catch(this.failure);
    },
    success(response) {
      const status = response.status;

      if (status === 200 || status === 201) {
        const token = response.data.token;
        const restaurant_id = response.data.restaurant_id;

        VueCookies.set('token', token);
        VueCookies.set('restaurant_id', restaurant_id);

        // Fetch restaurant details after successful login
        this.fetchRestaurantDetails();

        // Alert for successful login
        alert('Login successful!');
      }
    },
    fetchRestaurantDetails() {
      const headers = {
        'x-api-key': 'pKXqstOwXhnGQYCQ5vVh',
        'Authorization': `Bearer ${VueCookies.get('token')}`
      };

      const restaurant_id = VueCookies.get('restaurant_id');

      axios.get(`https://foodie.bymoen.codes/api/restaurant?restaurant_id=${restaurant_id}`, { headers: headers })
        .then(this.displayRestaurantDetails)
        .catch((error) => {
          console.error('Error fetching restaurant details:', error);
          // Handle the error as needed
        });
    },
    displayRestaurantDetails(response) {
      const restaurantDetails = response.data; // Assuming the response directly contains restaurant details

      if (restaurantDetails) {
        this.$store.commit('updateRestaurantDetails', restaurantDetails);
        console.log('Restaurant details updated:', this.$store.getters.getRestaurantDetails);

        // Redirect to the restaurant profile page
        this.$router.push("/restaurant_profile");
      } else {
        console.error('Restaurant details not found in the response!');
      }
    },
    failure(error) {
      console.log("failure", error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);

        // Display an alert if the user does not exist
        if (error.response.status === 404 || error.response.status === 401) {
          alert('Restaurant does not exist!');
        }
      }
    }
  }
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
