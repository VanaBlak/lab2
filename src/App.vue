<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/about">About</router-link> | -->
      <router-link to="/client_signup">Client Signup</router-link> |
      <router-link to="/client_login">Client Login</router-link> |
      <router-link to="/client_profile">Client Profile</router-link> |
      <router-link to="/restaurant_signup">Restaurant Signup</router-link> |
      <router-link to="/restaurant_login">Restaurant Login</router-link> |
      <router-link to="/restaurant_profile">Restaurant Profile</router-link> |
      <router-link to="/restaurant_public">Restaurant Public</router-link> |
      <router-link to="/discover_page">Discover</router-link> |
      <router-link to="/orders">Orders</router-link> |
      <router-link to="/shopping_cart">Shopping Cart</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #FFDB58;
}
</style>
