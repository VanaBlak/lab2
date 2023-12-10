<template>
  <div class="home">
   <h1>DashBoard</h1>
   <img alt="Vue logo" src="./INSTAMENU.png">
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src

// import VueCookies from 'vue-cookies'


export default {
  name: 'DashBoard',
  components: {
    
  },
  data:function(){
      return {
        restaurants: []
      }
  },
  methods:{
    getRestaurants:function(){
    // My logic for getting the restaurants
      console.log("GETTING RESTAURANTS")

const headers = {
        "x-api-key": "pKXqstOwXhnGQYCQ5vVh"
       } 


       const options = {
        headers: headers
      }

      const url = "https://foodie.bymoen.codes/api/restaurants"


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
    this.getRestaurants()

    // VueCookies.set("taco","beef")
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

