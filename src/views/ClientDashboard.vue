<template>
  <div class="home">
    <img alt="Vue logo" src="./INSTAMENU.png">
    <button v-if="token">Logout</button>
   <h1>Client DashBoard</h1>
  </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';
// @ is an alias to /src


export default {
  name: 'ClientDashBoard',
  components: {
    
  },
  data:function(){
      return {
        client: [],
        token: false
      }
  },
  methods:{
    getClient:function(){
    // My logic for getting the restaurants
      console.log("GETTING RESTAURANTS")

const headers = {
        "x-api-key": "pKXqstOwXhnGQYCQ5vVh"
       } 


       const options = {
        headers: headers
      }

      const url = "https://foodie.bymoen.codes/api/client?client_id=321"


      function success(response){
        console.log("success",response)

       }

       function failure(response){
        console.log("failure",response)
       }


      axios.get(url, options).then(success).catch(failure)





    }
  },
  created: function() {
    console.log('Created')
    this.getClient()
    const token = VueCookies.get("token")
    this.token = token
  },
  beforeCreate: function() {
    console.log('Before Created')
  },
  mounted: function() {
    console.log('mounted')
  },

// javascript details here


}





</script>


<style scoped>



</style>