<template>
    <header class="user-header">
      <div class="logo">
        <h1>TOLJOOJ</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <router-link to="/restaurants" class="nav-link">Restaurants</router-link>
        <router-link to="/shoppingcart" class="nav-link">Shopping Cart</router-link>
        <router-link to="/orders" class="nav-link">Orders</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "UserHeaders",
  };
  </script>
  
  <style scoped>
  .user-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    padding: 10px;
    background-color: #593803; /* Dark brown */
    color: #ffffff; /* White text */
    border-radius: 10px;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 24px;
    color: #ffe4c7; /* Mustard */
  }
  
  .nav-links {
    display: flex;
    gap: 20px;
  }
  
  .nav-link {
    color: #ffffff; /* White text */
    text-decoration: none;
    font-size: 16px;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #c49a6c; /* Mustard on hover */
  }
  
  .router-link-active {
    color: #c49a6c; /* Mustard for active link */
    font-weight: bold;
  }
  </style>