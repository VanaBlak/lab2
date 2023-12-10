<template>
  <div class="about">
    <h1>Client Login</h1>
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
  name: 'ClientLogin',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      const body = {
        email: this.email,
        password: this.password
      };

      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';

      const headers = {
        'x-api-key': apiKey
      };

      axios.post('https://foodie.bymoen.codes/api/client-login', body, { headers: headers })
        .then(this.success)
        .catch(this.failure);
    },
    success(response) {
  const status = response.status;

  if (status === 200 || status === 201) {
    const token = response.data.token;
    const client_id = response.data.client_id;

    VueCookies.set('token', token);
    VueCookies.set('client_id', client_id);

    // Fetch client details after successful login
    this.fetchClientDetails();

    // Alert for successful login
    alert('Login successful!');
  }
},
fetchClientDetails() {
  const headers = {
    'x-api-key': 'pKXqstOwXhnGQYCQ5vVh',
    'Authorization': `Bearer ${VueCookies.get('token')}`
  };

  const client_id = VueCookies.get('client_id');

  axios.get(`https://foodie.bymoen.codes/api/client?client_id=${client_id}`, { headers: headers })
    .then(this.displayClientDetails)
    .catch((error) => {
      console.error('Error fetching client details:', error);
      // Handle the error as needed
    });
},
displayClientDetails(response) {
    const clientDetails = response.data; // Assuming the response directly contains client details

    if (clientDetails) {
      this.$store.commit('updateClientDetails', clientDetails);
      console.log('Client details updated:', this.$store.getters.getClientDetails);


      // Redirect to the client profile page
      this.$router.push("/client_profile");

    } else {
      console.error('Client details not found in the response!');
    }
  },
    failure(error) {
      console.log("failure", error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);

        // Display an alert if the user does not exist
        if (error.response.status === 404 || error.response.status === 401) {
          alert('User does not exist!');
      }
    }
  }
}
}
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
