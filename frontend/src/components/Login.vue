<!-- <template>
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
  </style> -->



  <template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "LoginPage",
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post("http://localhost:3000/user/login/", {
            username: this.username,
            password: this.password,
          });
          console.log("Login successful:", response.data);
          // Handle successful login, e.g., store token, redirect, etc.
        } catch (error) {
          console.error("Login error:", error);
          this.errorMessage = "Invalid username or password.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  input {
    width: calc(100% - 20px);
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 15px;
    color: red;
    font-size: 14px;
  }
  </style>
  