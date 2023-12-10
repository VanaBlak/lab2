<!-- RestaurantEditForm.vue -->

<template>
    <form @submit.prevent="saveChanges">
      <label for="editEmail">Email:</label>
      <input type="text" id="editEmail" v-model="editedProfile.email" required><br>
  
      <label for="editName">Name:</label>
      <input type="text" id="editName" v-model="editedProfile.name" required><br>
  
      <label for="editAddress">Address:</label>
      <input type="text" id="editAddress" v-model="editedProfile.address" required><br>
  
      <label for="editPhoneNumber">Phone Number:</label>
      <input type="text" id="editPhoneNumber" v-model="editedProfile.phone_number" required><br>
  
      <label for="editBio">Bio:</label>
      <input type="text" id="editBio" v-model="editedProfile.bio" required><br>
  
      <label for="editCity">City:</label>
      <select v-model="editedProfile.city">
        <option value="Toronto">Toronto</option>
        <option value="Calgary">Calgary</option>
        <option value="Vancouver">Vancouver</option>
      </select><br>
  
      <label for="editProfileUrl">Profile Url:</label>
      <input type="text" id="editProfileUrl" v-model="editedProfile.profile_url" required><br>
  
      <label for="editBannerUrl">Banner Url:</label>
      <input type="text" id="editBannerUrl" v-model="editedProfile.banner_url" required><br>
  
      <label for="editPassword">Password:</label>
      <input type="password" id="editPassword" v-model="editedProfile.password" required><br>
  
      <button type="submit">Save Changes</button>
      <button @click="cancelEdit">Cancel</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      initialProfile: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editedProfile: {
          email: this.initialProfile.email || '',
          name: this.initialProfile.name || '',
          address: this.initialProfile.address || '',
          phone_number: this.initialProfile.phone_number || '',
          bio: this.initialProfile.bio || '',
          city: this.initialProfile.city || '',
          profile_url: this.initialProfile.profile_url || '',
          banner_url: this.initialProfile.banner_url || '',
          password: this.initialProfile.password || '',
        },
      };
    },
    methods: {
      saveChanges() {
        // Emit an event to notify the parent component (RestaurantProfile) about the changes
        this.$emit('save-changes', this.editedProfile);
      },
      cancelEdit() {
        // Emit an event to notify the parent component (RestaurantProfile) about the cancellation
        this.$emit('cancel-edit');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling if needed */
  </style>
  