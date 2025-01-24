<template>
    <div class="signup-page">
      <!-- Background Section -->
      <div class="background-image"></div>
  
      <!-- Form Section -->
      <div class="form-container">
        <h1>Sign In</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="formData.username" placeholder="Enter your username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="formData.password" placeholder="Enter your password" required />
          </div>
          <button type="submit" class="submit-button">Sign in Account</button>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "Login",
    data() {
      return {
        formData: {
          username: "",
          password: "",
          errorMessage: "",
        },
      };
    },
    methods: {
        async handleLogin() {
          // console.log(this.formData.username);
          
        try {
          const response = await axios.post("http://localhost:3000/user/login/", {
            username: this.formData.username,
            password: this.formData.password,
          });
          console.log("Login successful:", response.data);
          localStorage.setItem("token",response.data.token);
          this.$router.push('/')
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
  .signup-page {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
    background: white;
    position: relative;
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/d913f51c6effa27b5bcbfc6aab84f95b.jpg') no-repeat center center;
    background-size: cover;
  }
  
  .form-container {
    z-index: 2;
    width: 40%;
    margin-right: 5%;
    padding: 40px;
    background: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-family: 'Arial', sans-serif;
    color: #4a3c2c; /* Dark brown */
  }
  
  .form-container h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #6b4423; /* Muted brown */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #c49a6c; /* Golden mustard */
    border-radius: 5px;
    outline: none;
  }
  
  .form-group input:focus {
    border-color: #6b4423;
    box-shadow: 0 0 5px rgba(107, 68, 35, 0.3);
  }
  
  .submit-button {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: linear-gradient(45deg, #c49a6c, #6b4423);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .submit-button:hover {
    background: linear-gradient(45deg, #6b4423, #c49a6c);
  }
  </style>
  