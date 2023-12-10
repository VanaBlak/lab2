<template>
  <div class="about">
    <h1>Client Sign Up</h1>
    <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
    <form v-on:submit.prevent="submitForm">
      <label for="email">Email:</label><br>
      <input type="text" id="email" name="email" v-model="email" required><br>

      <label for="first_name">First name:</label><br>
      <input type="text" id="first_name" name="first_name" v-model="first_name" required><br>

      <label for="last_name">Last name:</label><br>
      <input type="text" id="last_name" name="last_name" v-model="last_name" required><br>

      <label for="image_url">Image Url:</label><br>
      <input type="url" id="image_url" name="image_url" v-model="image_url" required><br>

      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" v-model="username" required><br>

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
  name: 'ClientSignup',
  data() {
    return {
      email: '',
      first_name: '',
      last_name: '',
      image_url: '',
      username: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      const signup = {
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        image_url: this.image_url,
        username: this.username,
        password: this.password,
      };

      // Use the correct API key
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      const headers = {
        'x-api-key': apiKey,
      };

      axios.post('https://foodie.bymoen.codes/api/client', signup, { headers: headers })
        .then(this.success)
        .catch(this.failure);
    },
    success(response) {
      const client_id = response.data.client_id;
      const token = response.data.token;

      // Store client_id and token for later use
      VueCookies.set('client_id', client_id);
      VueCookies.set('token', token);

      // Display success message
      alert('Client signed up successfully!');
      
      // Redirect to the client dashboard or wherever you want
      this.$router.push('/client_login');
    },
    failure(error) {
      console.log('failure', error);

      // Check the error response for more details
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);

        // Display an alert if the client already exists
        if (error.response.status === 409) {
          alert('Client already exists. Please log in.');
        }
      }
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
  width: 20%;
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


