<template>
    <div class="restaurants-page">
      <UserHeaders />
      <div class="restaurants-container">
        <h1>Restaurants</h1>
        <div class="restaurants-grid">
          <div v-for="restaurant in restaurants" :key="restaurant.restaurant_id" class="restaurant-card">
            <img :src="getImageUrl(restaurant.restaurant_photo)" :alt="restaurant.restaurant_name" class="restaurant-image" />
            <div class="restaurant-details">
              <h2>{{ restaurant.restaurant_name }}</h2>
              <p>{{ restaurant.restaurant_address }}</p>
              <button class="order-button" @click="$router.push(`/restaurants/${restaurant.restaurant_id}`)">View Menu</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Paginator -->
      <div class="paginator">
        <button class="paginator-button" @click="previousPage" :disabled="page === 1">Previous</button>
        <span class="page-info">Page {{ page }} of {{ totalPages }}</span>
        <button class="paginator-button" @click="nextPage" :disabled="page === totalPages">Next</button>
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
      page:1,
      limit:10,
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
      console.log(this.token);
      this.fetchRestaurants(); // Fetch restaurants data
    }
  },
  methods: {
    nextPage() {
      
      this.page++;
      this.fetchRestaurants();
    
  },
  previousPage() {
      if (this.page > 1) {
        this.page--;
        this.getRestaurants();
      }
    },
    getImageUrl(imageUrl){
      return "http://localhost:3000" + imageUrl;
    },
    // Fetch restaurants from the backend API
    async fetchRestaurants() {
      try {
        const response = await axios.get(`http://localhost:3000/restaurant/all?page=${this.page}&limit=${this.limit}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        // response.data.restaurant_photo=`http://localhost:3000${response.data.restaurant_photo}`;
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
  .paginator {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.paginator-button {
  background-color: #6a8e4b; /* Mustard */
  color: #ffffff; /* White */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.paginator-button:disabled {
  background-color: #cccccc; /* Gray */
  cursor: not-allowed;
}

.paginator-button:hover:not(:disabled) {
  background-color: #024805; /* Dark green */
}

.page-info {
  font-weight: bold;
  color: #6b4423; /* Dark brown */
}

.limit-selector {
  padding: 5px;
  border: 1px solid #c49a6c; /* Mustard */
  border-radius: 5px;
  font-size: 14px;
  outline: none;
}

.limit-selector:focus {
  border-color: #6b4423; /* Dark brown */
}
  </style>