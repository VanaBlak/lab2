<!-- ClientEditForm.vue -->

<template>
  <form @submit.prevent="saveChanges">
    <label for="editUsername">Username:</label>
    <input type="text" id="editUsername" v-model="editedProfile.username" required><br>

    <label for="editEmail">Email:</label>
    <input type="text" id="editEmail" v-model="editedProfile.email" required><br>

    <label for="editFirstName">First name:</label>
    <input type="text" id="editFirstName" v-model="editedProfile.first_name" required><br>

    <label for="editLastName">Last name:</label>
    <input type="text" id="editLastName" v-model="editedProfile.last_name" required><br>

    <label for="editImageUrl">Image URL:</label>
    <input type="url" id="editImageUrl" v-model="editedProfile.image_url" required><br>

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
        username: this.initialProfile.username || '',
        email: this.initialProfile.email || '',
        first_name: this.initialProfile.first_name || '',
        last_name: this.initialProfile.last_name || '',
        image_url: this.initialProfile.image_url || '',
      },
    };
  },
  methods: {
    saveChanges() {
      // Emit an event to notify the parent component (ClientProfile) about the changes
      this.$emit('save-changes', this.editedProfile);
    },
    cancelEdit() {
      // Emit an event to notify the parent component (ClientProfile) about the cancellation
      this.$emit('cancel-edit');
    },
  },
};
</script>

<style scoped>
/* Add your styling if needed */
</style>
