<template>
    <div class="restaurants-page">
      <UserHeaders />
      <div class="restaurants-container">
        <h1>Restaurants</h1>
        <div class="restaurants-grid">
          <div v-for="restaurant in restaurants" :key="restaurant.restaurant_id" class="restaurant-card">
            <img :src="restaurant.restaurant_photo" :alt="restaurant.restaurant_name" class="restaurant-image" />
            <div class="restaurant-details">
              <h2>{{ restaurant.restaurant_name }}</h2>
              <p>{{ restaurant.restaurant_address }}</p>
              <button class="order-button" :to="`/restaurants/${restaurant.id}`">View Menu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import UserHeaders from "./UserHeader.vue";
import axios from "axios";

export default {
  name: "Restaurants",
  components: {
    UserHeaders,
  },
  data() {
    return {
      restaurants: [], // List of restaurants
      token: localStorage.getItem("token"), // Get token from localStorage
    };
  },
  created() {
    // Check if the user is logged in
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      this.fetchRestaurants(); // Fetch restaurants data
    }
  },
  methods: {
    // Fetch restaurants from the backend API
    async fetchRestaurants() {
      try {
        const response = await axios.get("http://localhost:3000/restaurant/all/", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.restaurants = response.data; // Set the list of restaurants
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants.");
      }
    },
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