<template>
    <div class="restaurants-page">
      <UserHeaders />
      <div class="restaurants-container">
        <h1>Restaurants</h1>
        <div class="restaurants-grid">
          <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
            <img :src="restaurant.photo" :alt="restaurant.name" class="restaurant-image" />
            <div class="restaurant-details">
              <h2>{{ restaurant.name }}</h2>
              <p>{{ restaurant.description }}</p>
              <button class="order-button" @click="viewMenu(restaurant.id)">View Menu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
import UserHeaders from "./UserHeader.vue";
  
  export default {
    name: "Restaurants",
    components: {
      UserHeaders,
    },
    data() {
      return {
        restaurants: [
          {
            id: 1,
            name: "The Golden Fork",
            description: "A fine dining experience with a touch of elegance.",
            image: "https://via.placeholder.com/300x200",
          },

        ],
      };
    },
    mounted(){
      this.get_restaurants();
    },
    methods: {
      viewMenu(restaurantId) {
        alert(`Viewing menu for restaurant ID: ${restaurantId}`);
      },
      get_restaurants(){
        const token = localStorage.getItem("token");
        axios.get("google.com",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then(res=>{
          console.log(res.data);
          
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
  };
  </script>
  
  <style scoped>
  .restaurants-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
  }
  
  .restaurants-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .restaurants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .restaurant-card {
    background-color: #ffffff; /* White */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .restaurant-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .restaurant-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .restaurant-details {
    padding: 15px;
    text-align: center;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 10px;
  }
  
  p {
    color: #555; /* Dark gray */
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .order-button {
    background-color: #c49a6c; /* Mustard */
    color: #ffffff; /* White text */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .order-button:hover {
    background-color: #6b4423; /* Dark brown on hover */
  }
  </style>