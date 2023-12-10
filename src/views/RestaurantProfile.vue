<template>
  <div class="restaurant-profile">
    <h1>Restaurant Profile</h1>
    <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
    <br/>
    <div v-if="retrievedRestaurantDetails && retrievedRestaurantDetails.length > 0">
      <p><strong>Email:</strong> {{ retrievedRestaurantDetails[0].email }}</p>
      <p><strong>Name:</strong> {{ retrievedRestaurantDetails[0].name }}</p>
      <p><strong>Address:</strong> {{ retrievedRestaurantDetails[0].address }}</p>
      <p><strong>Phone Number:</strong> {{ retrievedRestaurantDetails[0].phone_number }}</p>
      <p><strong>Bio:</strong> {{ retrievedRestaurantDetails[0].bio }}</p>
      <p><strong>City:</strong> {{ retrievedRestaurantDetails[0].city }}</p>
      <p><strong>Profile URL:</strong> {{ retrievedRestaurantDetails[0].profile_url }}</p>
      <p><strong>Banner URL:</strong> {{ retrievedRestaurantDetails[0].banner_url }}</p>
      <p><strong>Banner Image:</strong> <img :src="retrievedRestaurantDetails[0].banner_url" alt="Restaurant Image" class="logo"></p>

      <!-- Edit form -->
      <restaurant-edit-form
        v-if="isEditing"
        :initialProfile="retrievedRestaurantDetails[0]"
        @save-changes="saveChanges"
        @cancel-edit="cancelEdit"
      />

      <!-- Buttons to toggle edit mode -->
      <button class="edit-button" @click="toggleEdit" v-if="!isEditing">Edit Profile</button>
      <button class="delete-button" @click="deleteProfile">Delete Profile</button>

      <!-- ... existing code ... -->
      <h2>Menu Items</h2>
      <div>
        <div v-if="menu.length > 0">
          <ul>
            <li v-for="menuItem in menu" :key="menuItem.id">
              {{ menuItem.name }} - ${{ menuItem.price }}
              <!-- Add edit and delete buttons for each menu item -->
              <button class="edit-button" @click="editMenuItem(menuItem)">Edit Item</button>
              <button class="delete-button" @click="deleteMenuItem(menuItem.id)">Delete Item</button>
            </li>
          </ul>

          <h3>Add New Menu Item</h3>
          <form @submit.prevent="addMenuItem(newMenuItem)">
            <label for="itemName">Name:</label>
            <input type="text" id="itemName" v-model="newMenuItem.name" required>

            <label for="itemPrice">Price:</label>
            <input type="number" id="itemPrice" v-model="newMenuItem.price" required>

            <label for="itemDescription">Description:</label>
            <textarea id="itemDescription" v-model="newMenuItem.description" required></textarea>

            <label for="itemImageUrl">Image URL:</label>
            <input type="text" id="itemImageUrl" v-model="newMenuItem.image_url" required>

            <br/>
            <button class="logout-button" type="submit">Add Menu Item</button>
          </form>
        </div>
        <div>
          <!-- Show message whether there are menu items or not -->
          <div v-if="menu.length === 0">No menu items available. <span style="color: red">(In order to see previous items added, you must add another item*)</span>
            <h3>Add New Menu Item</h3>
            <form @submit.prevent="addMenuItem(newMenuItem)">
              <label for="itemName">Name:</label>
              <input type="text" id="itemName" v-model="newMenuItem.name" required>

              <label for="itemPrice">Price:</label>
              <input type="number" id="itemPrice" v-model="newMenuItem.price" required>

              <label for="itemDescription">Description:</label>
              <textarea id="itemDescription" v-model="newMenuItem.description" required></textarea>

              <label for="itemImageUrl">Image URL:</label>
              <input type="text" id="itemImageUrl" v-model="newMenuItem.image_url" required>

              <br/>
              <button class="logout-button" type="submit">Add Menu Item</button>
            </form>
          </div>
      </div>
    </div>
    </div>

    <div v-else>
      <p>Please log in to view restaurant details.</p>
      <!-- You can add a login button or link here -->
    </div>

    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';
import RestaurantEditForm from './RestaurantEditForm.vue';
import VueCookies from 'vue-cookies';

export default {
  name: 'RestaurantProfile',
  components: {
    RestaurantEditForm,
  },
  data() {
    return {
      restaurantData: [],
      isEditing: false,
      menu: [],
      newMenuItem: {
        name: '',
        price: 0,
        description: '',
        image_url: '', // Add this field
        // Add more fields as needed
      },
      isLoggedInAsRestaurant: false, // Move this line outside of newMenuItem

    };
  },
  computed: {
    retrievedRestaurantDetails() {
      return this.$store.getters.getRestaurantDetails;
    },
    etag() {
      return this.$store.getters.getETag;
    },
  },
  methods: {

    checkIsLoggedInAsRestaurant() {
      const token = VueCookies.get('token');
      this.isLoggedInAsRestaurant = !!token;
      console.log('isLoggedInAsRestaurant:', this.isLoggedInAsRestaurant);
    },
    editMenuItem(menuItem) {
      // Set the editing state and populate the form fields with menu item details
      this.isEditing = true;
      this.newMenuItem = { ...menuItem };
    },
    // Updated addMenuItem method
    addMenuItem(newMenuItem) {
      const restaurant_id = VueCookies.get('restaurant_id');
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
      const token = VueCookies.get('token');

      if (!token) {
        console.error('Token is missing. Please log in again.');
        return;
      }

      const headers = {
        'x-api-key': apiKey,
        'token': token,
      };

      if (this.isEditing) {
        // Editing an existing menu item
        axios.patch(`https://foodie.bymoen.codes/api/menu/${newMenuItem.id}`, newMenuItem, { headers })
          .then(() => {
            // Fetch the updated menu after editing an item
            this.fetchMenu();
            this.isEditing = false; // Reset editing state
            alert('Menu item edited successfully!');
          })
          .catch((error) => {
            console.error('Error editing menu item:', error);
            // Handle the error as needed
          });
      } else {
        // Adding a new menu item
        axios.post('https://foodie.bymoen.codes/api/menu', { ...newMenuItem, restaurant_id }, { headers })
          .then(() => {
            // Fetch the updated menu after adding a new item
            this.fetchMenu();
            alert('New menu item added successfully!');
          })
          .catch((error) => {
            console.error('Error adding menu item:', error);
            // Handle the error as needed
          });
      }

      // Reset the form fields after submission
      this.newMenuItem = {
        name: '',
        price: 0,
        description: '',
      };
    },
    fetchMenu() {
      const restaurant_id = VueCookies.get('restaurant_id');
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
      const headers = {
        'x-api-key': apiKey,
      };

      axios.get(`https://foodie.bymoen.codes/api/menu?restaurant_id=${restaurant_id}`, { headers })
        .then(this.displayMenu)
        .catch((error) => {
          console.error('Error fetching menu:', error);
          // Handle the error as needed
        });
    },
    displayMenu(response) {
      this.menu = response.data;
      console.log('Menu items:', this.menu);
    },
    deleteProfile() {
      // Send DELETE request to delete the restaurant profile
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

      axios.delete('https://foodie.bymoen.codes/api/restaurant', { headers: headers, data: data })
        .then(() => {
          // Clear cookies and navigate to the login page upon successful deletion
          this.$cookies.remove('token');
          this.$store.commit('updateRestaurantDetails', null);
          this.$router.push('/restaurant_login');
          // Alert that the restaurant profile has been deleted
          alert('Restaurant profile has been deleted.');
        })
        .catch((error) => {
          console.error('Error deleting profile:', error);
          // Handle error as needed
        });
    },
    logout() {
      VueCookies.remove('token');
      this.$store.commit('updateRestaurantDetails', null);
      this.$router.push('/restaurant_login');
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      console.log('isEditing:', this.isEditing);
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

      // Fetch the latest restaurant details
      this.fetchRestaurantDetails();

      // Include only non-empty fields in the PATCH request
      const updatedProfile = {};
      const changes = []; // Array to store the changed information

      for (const key in editedProfile) {
        if (editedProfile[key] !== '' && editedProfile[key] !== this.$store.getters.getRestaurantDetails[key]) {
          updatedProfile[key] = editedProfile[key];
          changes.push(`${key}: ${editedProfile[key]}`);
        }
      }

      axios.patch('https://foodie.bymoen.codes/api/restaurant', updatedProfile, { headers: headers })
        .then(() => {
          // Update the restaurant details in the Vuex store
          this.$store.commit('updateRestaurantDetails', updatedProfile);
          this.isEditing = false;

          // Show alert with changes
          if (changes.length > 0) {
            alert(`Changes have been made:\n${changes.join('\n')}`);

            // Alert to log in again and redirect to the restaurant login page
            alert('Please log in again.');
            this.$cookies.remove('token');
            this.$store.commit('updateRestaurantDetails', null);
            this.$router.push('/restaurant_login');
          } else {
            alert('No changes made.');
          }
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
    fetchRestaurantDetails() {
      const apiKey = 'pKXqstOwXhnGQYCQ5vVh';
      const headers = {
        'x-api-key': apiKey,
        'Authorization': `Bearer ${VueCookies.get('token')}`,
      };

      axios.get('https://foodie.bymoen.codes/api/restaurant', { headers: headers })
        .then(this.displayRestaurantDetails)
        .catch((error) => {
          console.error('Error fetching restaurant details:', error);
          // Handle the error as needed
        });
    },
    displayRestaurantDetails(response) {
      const restaurantDetails = response.data;

      if (restaurantDetails) {
        this.$store.commit('updateRestaurantDetails', restaurantDetails);
        console.log('Restaurant details updated:', this.$store.getters.getRestaurantDetails);
      } else {
        console.error('Restaurant details not found in the response!');
      }
    },
    mounted() {
      // Check if the user is logged in as a restaurant
      this.checkIsLoggedInAsRestaurant();

      // Fetch restaurant details and menu items when the component is mounted
      this.fetchRestaurantDetails();
      this.fetchMenu();
    },
   
    deleteMenuItem(menuItemId) {
      const apiKey = 'pKXqstOwXhnGQYCQ5vH'; // Replace with your actual API key
      const token = VueCookies.get('token');

      if (!token) {
        console.error('Token is missing. Please log in again.');
        return;
      }

      const headers = {
        'x-api-key': apiKey,
        'token': token,
      };

      axios.delete(`https://foodie.bymoen.codes/api/menu/${menuItemId}`, { headers })
        .then(() => {
          // Fetch the updated menu after deleting an item
          this.fetchMenu();
          alert('Menu item deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting menu item:', error);
          // Handle the error as needed
        });
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
