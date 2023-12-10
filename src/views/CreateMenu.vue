<template>

  <div class="about">
      <h1>Create Menu</h1>
      <img alt="Vue logo" src="./INSTAMENU.png">
      <form v-on:submit.prevent="submitForm">
        <label for="fname">Email:</label><br>
        <input type="text" id="fname" name="fname" v-model="email" ><br>

        <label for="fname">Name:</label><br>
        <input type="text" id="fname" name="fname" v-model="name" ><br>

        <label for="fname">Address</label><br>
        <input type="text" id="fname" name="fname" v-model="address" ><br>

        <label for="fname">Phone_number:</label><br>
        <input type="text" id="fname" name="fname" v-model="phone_number" ><br>

        <label for="fname">Bio:</label><br>
        <input type="text" id="fname" name="fname" v-model="bio" ><br>

        <label for="lname">City:</label><br>

        <select v-model="city" >
          <option value="Toronto">Toronto</option>
          <option value="Calgary">Calgary</option>
          <option value="Vancouver">Vancouver</option>
        </select><br>


        <label for="lname">Profile-url:</label><br>
        <input type="text" id="lname" name="lname" v-model="profile_url" ><br>

        <label for="lname">Banner-url:</label><br>
        <input type="text" id="lname" name="lname" v-model="banner_url" ><br>

        <label for="lname">Password:</label><br>
        <input type="password" id="lname" name="lname" v-model="password" ><br>

        <button type="submit" >Submit</button>
      </form> 
  </div>
  
  


</template>

<script>
import axios from 'axios';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'create_menu ',
  components: {
    
  },
    data:function(){
      return {
        email:"",
        name:"",
        address:"",
        phone_number:"",
        bio: "",
        city: "",
        profile_url:"",
        banner_url:"",
        password:""

      }
    }  ,
    methods:{
      submitForm:function(){
        const signup = {
          email: this.email,
          name: this.name,
          address: this.address,
          phone_number: this.phone_number,
          bio: this.bio,
          city: this.city,
          profile_url: this.profile_url,
          banner_url: this.banner_url,
          password: this.password
        }
        console.log(signup)
  console.log(this.address)
       const headers = {
        "x-api-key": "pKXqstOwXhnGQYCQ5vVh"
       } 

       function success(response){
        console.log("success",response)

       }

       function failure(response){
        console.log("failure",response)
       }



       axios.post(
        "https://foodie.bymoen.codes/api/menu",
       signup,
      {
        headers: headers
      }
       ).then(success).catch(failure)       


      }
    }
}
</script>