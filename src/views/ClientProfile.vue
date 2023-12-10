<!-- src/views/ClientProfile.vue -->

<template>
    <div class="client-profile">
      <h1>Client Profile</h1>
      <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
      <br/>
      <div v-if="retrievedClientDetails && retrievedClientDetails.length > 0">
        <p><strong>Username:</strong> {{ retrievedClientDetails[0].username }}</p>
        <p><strong>Email:</strong> {{ retrievedClientDetails[0].email }}</p>
        <p><strong>Name:</strong> {{ retrievedClientDetails[0].first_name }} {{ retrievedClientDetails[0].last_name }}</p>
        <p><strong>Image URL:</strong>{{ retrievedClientDetails[0].image_url }}</p>
        <p><strong>Client Image:</strong><img :src="retrievedClientDetails[0].image_url" alt="Client Item Image" class="image"></p>
  
        <!-- Edit form -->
        <client-edit-form
          v-if="isEditing"
          :initialProfile="retrievedClientDetails[0]"
          @save-changes="saveChanges"
          @cancel-edit="cancelEdit"
        />
        
  
        <!-- Buttons to toggle edit mode -->
        <button class="edit-button" @click="toggleEdit" v-if="!isEditing">Edit Profile</button>
        <button class="delete-button" @click="deleteProfile">Delete Profile</button>
      </div>
      <div v-else>
          <p>Please log in to view client details.</p>
          <!-- You can add a login button or link here -->
        </div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ClientEditForm from './ClientEditForm.vue';
  import VueCookies from 'vue-cookies';
  
  export default {
    name: 'ClientProfile',
    components: {
      ClientEditForm,
    },
    data() {
      return {
        clientData: [],
        isEditing: false,
      };
    },
    computed: {
      retrievedClientDetails() {
        return this.$store.getters.getClientDetails;
      },
      etag() {
        return this.$store.getters.getETag;
      },
    },
    methods: {
      deleteProfile() {
        // Send DELETE request to delete the client profile
        const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
        const headers = {
          'x-api-key': apiKey,
          'token': VueCookies.get('token'), // Use the token from cookies
        };
  
        const password = prompt('Enter your password for confirmation:');
        if (!password) {
          alert('Password is required for deletion.');
          return;
        }
  
        // Include required headers and data for deletion
        headers['Content-Type'] = 'application/json';
        const data = {
          password: password,
        };
  
        axios.delete('https://foodie.bymoen.codes/api/client', { headers: headers, data: data })
          .then(() => {
            // Clear cookies and navigate to the login page upon successful deletion
            this.$cookies.remove('token');
            this.$cookies.remove('client_id');
            this.$store.commit('updateClientDetails', null);
            this.$router.push('/client_login');
            // Alert that the client profile has been deleted
            alert('Client profile has been deleted.');
          })
          .catch((error) => {
            console.error('Error deleting profile:', error);
            // Handle error as needed
          });
      },
      logout() {
        this.$cookies.remove('token');
        this.$cookies.remove('client_id');
        this.$store.commit('updateClientDetails', null);
        this.$router.push('/client_login');
      },
      toggleEdit() {
        this.isEditing = !this.isEditing;
      },
      saveChanges(editedProfile) {
        const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
        const token = VueCookies.get('token');
  
        if (!token) {
          console.error('Token is missing. Please log in again.');
          return;
        }
  
        const headers = {
          'x-api-key': apiKey,
          'token': token,
          'If-Match': this.etag,
        };
  
        // Fetch the latest client details
        this.fetchClientDetails();
  
        // Include only non-empty fields in the PATCH request
    const updatedProfile = {};
    const changes = []; // Array to store the changed information

    for (const key in editedProfile) {
      if (editedProfile[key] !== '' && editedProfile[key] !== this.$store.getters.getClientDetails[key]) {
        updatedProfile[key] = editedProfile[key];
        changes.push(`${key}: ${editedProfile[key]}`);
      }
    }

    axios.patch('https://foodie.bymoen.codes/api/client', updatedProfile, { headers: headers })
      .then(() => {
        // Update the client details in the Vuex store
        this.$store.commit('updateClientDetails', updatedProfile);
        this.isEditing = false;

        // Show alert with changes and redirect to client_login
        if (changes.length > 0) {
          alert(`Changes have been made:\n${changes.join('\n')}\nPlease log in again.`);
        } else {
          alert('No changes made.');
        }

        this.$cookies.remove('token');
        this.$cookies.remove('client_id');
        this.$store.commit('updateClientDetails', null);
        this.$router.push('/client_login');
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          // Handle validation errors, if any
          console.error('Validation errors:', error.response.data);
        } else {
          console.error('Error updating profile:', error);
          // Handle other errors as needed
        }
      });
      },
      cancelEdit() {
        this.isEditing = false;
      },
      fetchClientDetails() {
        const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
        const headers = {
          'x-api-key': apiKey,
          'Authorization': `Bearer ${VueCookies.get('token')}`,
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
        const clientDetails = response.data;
  
        if (clientDetails) {
          this.$store.commit('updateClientDetails', clientDetails);
          console.log('Client details updated:', this.$store.getters.getClientDetails);
        } else {
          console.error('Client details not found in the response!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .client-profile {
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

  .image {
    max-width: 100%;
    height: auto;
    max-height: 200px;
    margin-bottom: 20px;
  }
  </style>
  