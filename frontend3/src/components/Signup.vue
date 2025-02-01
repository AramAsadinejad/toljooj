<template>
    <div class="signup-page">
      <!-- Background Section -->
      <div class="background-image"></div>
  
      <!-- Form Section -->
      <div class="form-container">
        <h1>Sign Up</h1>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="formData.username" placeholder="Enter your username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="formData.password" placeholder="Enter your password" required />
          </div>
          <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" id="repeatPassword" v-model="formData.repeatPassword" placeholder="Repeat your password" required />
          </div>
          <div class="form-group">
          <label for="type">Type</label>
          <select id="type" v-model="formData.type" required>
            <option disabled value="">Select a type</option>
            <option v-for="option in types" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
          <button type="submit" class="submit-button">Create Account</button>
        </form>
        <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>
      </div>
    </div>
  </template>
  
  

  <script>
  import axios from 'axios';
  export default {
    name: "SignUp",
    data() {
      return {
        formData: {
          username: '',
          password: '',
          repeatPassword: '',
          type: '', // This will hold the selected type
        },
        types: ['Admin', 'User', 'RestaurantManager'], // Dropdown options
        successMessage: '', // Success message
      };
    },
    methods: {
      onSubmit() {
        if (this.formData.password.length < 6) {
          alert('Password must be at least 6 characters');
          return;
        }
        if (this.formData.repeatPassword !== this.formData.password) {
          alert('Repeated password is not the same as the entered password');
          return;
        }
        if (!this.formData.type) {
          alert('Please select a type');
          return;
        }
        
          axios.post('http://localhost:3000/user/register', {
            username: this.formData.username,
            password: this.formData.password,
            type: this.formData.type,
          })
          .then((response)=>{
            console.log('Sign-up successful:', response.data);
            axios.post('http://localhost:3000/user/login/', {
              username: this.formData.username,
              password: this.formData.password,
            }).then(res=>{
              console.log(res.data);
              this.$router.push('/restaurants');
            })
            .catch(err=>{
              console.log(err);
              
            })
            // this.successMessage = 'Signup successful! Welcome, ' + this.formData.username + '.';
            // console.log('Login successful:', loginResponse.data);


          })
          .catch(err=>{
            if (err.status === 403) {
              // alert("username already exists");
              console.log(err);
              alert("username already exists");
              
            }
          })
          
  
          // Set success message
  
          // setTimeout(() => {
          //   this.successMessage = '';
          // }, 5000);
  



          // console.error('Error during sign-up or login:', error);
          // this.successMessage = ''; // Clear success message if there's an error
        
      }
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
  