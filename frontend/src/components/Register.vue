<template>
    <v-container fluid class="fill-height d-flex align-center justify-center signup-background">
      <div class="overlay"></div>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 pa-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-h5">Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="signUp">
                <v-text-field
                  v-model="username"
                  label="Username"
                  type="text"
                  :rules="usernameRules"
                  required
                  outlined
                  prepend-inner-icon="mdi-account"
                  class="mb-4"
                ></v-text-field>
  
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  required
                  outlined
                  prepend-inner-icon="mdi-lock"
                  class="mb-4"
                ></v-text-field>
  
                <v-select
                  v-model="type"
                  :items="types"
                  label="Type"
                  :rules="typeRules"
                  required
                  outlined
                  prepend-inner-icon="mdi-account-group"
                  class="mb-4"
                ></v-select>
  
                <v-btn type="submit" color="primary" block large class="mt-4">Sign Up</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn color="secondary" to="/login">Already have an account? Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios'; // Import Axios directly
  
  export default defineComponent({
    name: 'SignUp',
    data() {
      return {
        username: '',
        password: '',
        type: '',
        types: ['Admin', 'User', 'RestaurantManager'], // Dropdown options
        usernameRules: [
          (v: string) => !!v || 'Username is required',
          (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters',
        ],
        passwordRules: [
          (v: string) => !!v || 'Password is required',
          (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters',
        ],
        typeRules: [
          (v: string) => !!v || 'Type is required',
        ],
      };
    },
    methods: {
      async signUp() {
        if (this.password.length < 6) {
          alert('Password must be at least 6 characters');
          return;
        }
  
        if (!this.type) {
          alert('Please select a type');
          return;
        }
  
        console.log(this.username, this.password, this.type);
        
          axios.post('http://localhost:3000/user/register', {
            username: this.username,
            password: this.password,
            type: this.type,
          })
          .then(res=>{
            //   console.log(res.data);
              console.log('Sign-up successful:', res.data);
              axios.post('http://localhost:3000/user/login/', { username: this.username, password: this.password })
              .then(res=>{
                  console.log(res.data);
              }).catch(err=>{console.log(err)});
          });
  
          // Save the token and user data (e.g., in Vuex or localStorage)
        //   localStorage.setItem('token', response.data.token);
        //   alert('Sign-up successful!');

    
      },
    },
  });
  </script>
  
  <style scoped>
  .signup-background {
    background-image: url('https://source.unsplash.com/1600x900/?nature,forest');
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  }
  
  .fill-height {
    height: 100vh;
  }
  
  .v-card {
    border-radius: 12px;
    position: relative;
    z-index: 1; /* Ensure the card is above the overlay */
  }
  
  .v-toolbar {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .v-btn {
    text-transform: none;
    font-weight: bold;
  }

  html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
  </style>