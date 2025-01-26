<template>
    <header class="manager-header">
      <div class="logo">
        <h1>Manager Panel</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/managerrestaurants" class="nav-link">Restaurants</router-link>
        <router-link to="/managerorders" class="nav-link">Orders</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "ManagerHeader",
  };
  </script>
  
  <style scoped>
  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #6b4423; /* Dark brown */
    color: #ffffff; /* White text */
    border-radius: 10px;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 24px;
    color: #c49a6c; /* Mustard */
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