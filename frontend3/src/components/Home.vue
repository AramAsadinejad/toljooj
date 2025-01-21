<template>
    <div class="home">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="logo">
          <span>T</span>
          <span>O</span>
          <span>L</span>
          <span class="gold">J</span>
          <span class="gold">O</span>
          <span class="gold">O</span>
          <span class="gold">J</span>
        
      </div>
      </div>
  
      <!-- Main Content -->
      <div class="content">
        <div class="image-section">
          <img src="@/assets/Double Cheeseburgers and French Fries.jpg" alt="Cheeseburger with french fries" />
          <span class="image-caption">CHEESEBURGER WITH FRENCH FRIES</span>
        </div>
        <div class="text-section">
            <h1>
          <span class="signup-and">SignUp and</span><br>
          <span class="order">Order!</span>
        </h1>
          <div class="buttons">
            <router-link to="/signup" class="button">signup</router-link>
            <span>|</span>
            <router-link to="/login" class="button">signin</router-link>
          </div>
        </div>
      </div>
      <br><hr>
    </div>
    
  </template>
  
  <script>
  export default {
    name: "Home",
  };
  </script>
  
  <style scoped>
  /* General Layout */
  .home {
    display: flex;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  /* Sidebar Styling */
  .sidebar {
    width: 8%; /* Thinner sidebar */
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
  
  .sidebar .logo {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: scale(-1); /* Mirroring effect */
    font-family: 'Arial', sans-serif;
    font-size: 30px;
    letter-spacing: 5px;
  }
  
  .sidebar .logo .gold {
    color: #c49a6c; /* Gold color */
  }
  
 

  .content {
    width: 92%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  
  /* Image Section */
  .image-section {
  flex: 1;
  position: relative;
}

.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Makes the image fill the space while maintaining aspect ratio */
  border-radius: 0; /* No border radius for full coverage */
}
  
  .image-caption {
    position: absolute;
  top: 30%;
  right: -200px; 
  transform: rotate(270deg) translateY(-50%);
  transform-origin: center;
  background-color: #c49a6c;
  color: white;
  padding: 15px 8px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 0 5px 5px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  }
  
  /* Text Section */
  .text-section {
  flex: 1;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-section h1 {
  font-family: 'Georgia', serif;
  line-height: 1.2; /* Adjust spacing between lines */
  margin: 0; /* Remove default margins */
}

.text-section .signup-and {
  font-size: 70px; /* Smaller size for "SignUp and" */
  font-weight: bold;
  color: #6b4423;
  padding: 5px 15px;
  border-radius: 5px;
}
.text-section .order {
  font-size: 90px; /* Larger size for "Order" */
  font-weight: bold;
  color: #c49a6c;
  padding: 5px 10px; /* Smaller padding */
  border-radius: 10px; /* Rounded border */
  display: inline-block;
}
  
  .buttons {
    margin-top: 40px;
    font-family: "Georgia";
    font-weight: bold;
  text-decoration: none;
  padding: 15px 30px; /* Increase padding for larger buttons */
  
  border-radius: 30px; /* Adjust radius for a rounder look */
  color: white;
  
  transition: background 0.3s;
  }
  
  .buttons .button {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    padding: 10px 20px;
    border: 1px solid #c49a6c;
    border-radius: 20px;
    color: white;
    background: linear-gradient(45deg, #c49a6c, #6b4423);
    transition: background 0.3s;
  }
  
  .buttons .button:hover {
    background: linear-gradient(45deg, #6b4423, #c49a6c);
  }
  
  .buttons span {
    margin: 0 10px;
    font-size: 18px;
    color: #6b4423;
  }
  </style>
  