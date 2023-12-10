<template>
  <div class="about">
    <h1>Restaurant Sign Up</h1>
    <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
    <form v-on:submit.prevent="submitForm">
      <label for="email">Email:</label><br>
    <input type="text" id="email" name="email" v-model="email" required>
    <span style="color: red;">{{ emailError }}</span><br>

      <label for="name">Name:</label><br>
      <input type="text" id="name" name="name" v-model="name" required><br>

      <label for="address">Address:</label><br>
      <input type="text" id="address" name="address" v-model="address" required><br>

      <label for="phone_number">Phone Number:</label><br>
      <input type="text" id="phone_number" name="phone_number" v-model="phone_number" required>
      <span style="color: red;">{{ phone_numberError }}</span><br>

      <label for="bio">Bio:</label><br>
      <input type="text" id="bio" name="bio" v-model="bio" required><br>

      <label for="city">City:</label><br>
      <select v-model="city">
        <option value="Toronto">Toronto</option>
        <option value="Calgary">Calgary</option>
        <option value="Vancouver">Vancouver</option>
      </select><br>

      <label for="profile_url">Profile Url:</label><br>
      <input type="text" id="profile_url" name="profile_url" v-model="profile_url" required><br>

      <label for="banner_url">Banner Url:</label><br>
      <input type="text" id="banner_url" name="banner_url" v-model="banner_url" required><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" v-model="password" required><br>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
  name: 'RestaurantSignup',
  data() {
    return {
      email: '',
      name: '',
      address: '',
      phone_number: '',
      bio: '',
      city: '',
      profile_url: '',
      banner_url: '',
      password: '',
      phone_numberError: '', // Added for phone number validation error
      errorMessage: '',
      emailError: '', // Added for email validation error
      menu: [
  {
    name: 'Margherita Pizza',
    price: 12.99,
    description: 'Classic pizza with tomato, mozzarella, and basil',
    image_url: 'https://example.com/margherita-pizza.jpg',
  },
  {
    name: 'Chicken Alfredo Pasta',
    price: 15.99,
    description: 'Creamy Alfredo pasta with grilled chicken',
    image_url: 'https://example.com/chicken-alfredo-pasta.jpg',
  },
  {
    name: 'Caesar Salad',
    price: 8.99,
    description: 'Fresh salad with romaine lettuce, croutons, and Caesar dressing',
    image_url: 'https://example.com/caesar-salad.jpg',
  },
  {
    name: 'Sushi Combo',
    price: 18.99,
    description: 'Assorted sushi rolls with soy sauce and wasabi',
    image_url: 'https://example.com/sushi-combo.jpg',
  },
  {
    name: 'Grilled Salmon',
    price: 20.99,
    description: 'Grilled salmon fillet with lemon and herbs',
    image_url: 'https://example.com/grilled-salmon.jpg',
  },
  {
    name: 'Vegetarian Wrap',
    price: 9.99,
    description: 'Healthy wrap with assorted vegetables and hummus',
    image_url: 'https://example.com/vegetarian-wrap.jpg',
  },
  {
    name: 'Chocolate Brownie Sundae',
    price: 7.99,
    description: 'Warm chocolate brownie topped with vanilla ice cream and chocolate sauce',
    image_url: 'https://example.com/brownie-sundae.jpg',
  },
  {
    name: 'Tandoori Chicken',
    price: 16.99,
    description: 'Spicy tandoori chicken served with naan bread',
    image_url: 'https://example.com/tandoori-chicken.jpg',
  },
  {
    name: 'Caprese Sandwich',
    price: 11.99,
    description: 'Fresh sandwich with mozzarella, tomatoes, and basil',
    image_url: 'https://example.com/caprese-sandwich.jpg',
  },
  {
    name: 'Mango Tango Smoothie',
    price: 5.99,
    description: 'Refreshing smoothie with mango and tropical flavors',
    image_url: 'https://example.com/mango-smoothie.jpg',
  },
  {
    name: 'BBQ Pulled Pork Sandwich',
    price: 13.99,
    description: 'Slow-cooked pulled pork with BBQ sauce on a bun',
    image_url: 'https://example.com/pulled-pork-sandwich.jpg',
  },
  {
    name: 'Shrimp Scampi',
    price: 17.99,
    description: 'Garlic butter shrimp served over linguine pasta',
    image_url: 'https://example.com/shrimp-scampi.jpg',
  },
  {
    name: 'Fruit Salad Bowl',
    price: 9.99,
    description: 'Fresh fruit salad with a variety of seasonal fruits',
    image_url: 'https://example.com/fruit-salad.jpg',
  },
  {
    name: 'Spicy Ramen Noodles',
    price: 14.99,
    description: 'Japanese ramen noodles with spicy broth and toppings',
    image_url: 'https://example.com/spicy-ramen.jpg',
  },
  {
    name: 'Classic Cheesecake',
    price: 8.99,
    description: 'Creamy New York-style cheesecake with graham cracker crust',
    image_url: 'https://example.com/cheesecake.jpg',
  },
],

      
    };
  },
  methods: {
    submitForm() {
      // Validate phone number format
      if (!this.validatePhoneNumber()) {
        return;
      }
      // Validate email format
      if (!this.validateEmail()) {
        return;
      }

      const signup = {
        email: this.email,
        name: this.name,
        address: this.address,
        phone_number: this.phone_number,
        bio: this.bio,
        city: this.city,
        profile_url: this.profile_url,
        banner_url: this.banner_url,
        password: this.password,
        menu: this.menu, // Include the menu details
      };

      // Use the correct API key
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      const headers = {
        'x-api-key': apiKey,
      };

      axios.post('https://foodie.bymoen.codes/api/restaurant', signup, { headers: headers })
        .then(this.success)
        .catch(this.failure);
    },

    success(response) {
      const restaurant_id = response.data.restaurant_id;
      const token = response.data.token;

      // Store restaurant_id and token for later use
      VueCookies.set('restaurant_id', restaurant_id);
      VueCookies.set('token', token);

      // Display success message
      alert('Restaurant signed up successfully! Please log in!');
      
      // Redirect to the restaurant dashboard or wherever you want
      this.$router.push('/restaurant_login');
    },

    failure(error) {
      console.log('failure', error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);

        if (error.response.status === 409) {
          // Conflict: Restaurant already exists
          this.errorMessage = 'A restaurant with this email already exists. Please use a different email.';
        } else if (error.response.status === 422) {
          // Validation error
          this.errorMessage = 'Validation failed. Please check your input and try again.';
        } else {
          // Other error cases
          this.errorMessage = 'Signup failed. Please try again later.';
        }

        alert(this.errorMessage);
      }

    },

    validateEmail() {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailError = 'Invalid email format. Please enter a valid email address.';
        return false;
      }

      // Reset error if validation passed
      this.emailError = '';
      return true;
    },
    
    validatePhoneNumber() {
      // Validate phone number format (###-###-####)
      const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(this.phone_number)) {
        this.phone_numberError = 'Invalid phone format. Please use the format ###-###-####.';
        return false;
      }

      // Reset error if validation passed
      this.phone_numberError = '';
      return true;
    },
  },
};
</script>

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

  label {
    display: block;
    margin-bottom: 5px;
  }

  input, select {
    width: 50%;
    padding: 8px;
    box-sizing: border-box;
  }

  button {
    background-color: #FFDB58;
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

  button:hover {
    background-color: #A88905;
  }
</style>
