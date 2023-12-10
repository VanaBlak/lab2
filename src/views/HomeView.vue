<template>
  <div class="home">
    <img alt="App Logo" src="@/assets/INSTAMENU1.png" class="logo">
    <HelloWorld :msg="welcomeMessage" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      welcomeMessage: 'Welcome', // Set a default value for welcomeMessage
    };
  },
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.logo {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  margin-bottom: 20px;
}
</style>
