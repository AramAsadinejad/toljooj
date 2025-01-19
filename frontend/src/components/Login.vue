<template>
    <v-container fluid class="fill-height d-flex align-center justify-center login-background">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12 pa-6">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-h5">Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login">
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
  
                <v-btn type="submit" color="primary" block large class="mt-4">Login</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn text color="secondary" to="/register">Create an account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  export default defineComponent({
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        usernameRules: [
          (v: string) => !!v || 'Username is required',
          (v: string) => (v && v.length >= 3) || 'Username must be at least 3 characters',
        ],
        passwordRules: [
          (v: string) => !!v || 'Password is required',
          (v: string) => (v && v.length >= 6) || 'Password must be at least 6 characters',
        ],
      };
    },
    methods: {
      login() {
        console.log('Logging in with:', this.username, this.password);
        axios.post('http://localhost:3000/user/login/', { username: this.username, password: this.password })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
      },
    },
  });
  </script>
  
  <style scoped>
  .login-background {
    background-image: url('https://source.unsplash.com/1600x900/?nature,water');
    background-size: cover;
    background-position: center;
  }
  
  .fill-height {
    height: 100vh;
  }
  
  .v-card {
    border-radius: 12px;
  }
  
  .v-toolbar {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  
  .v-btn {
    text-transform: none;
    font-weight: bold;
  }
  </style>