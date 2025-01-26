<template>
    <div class="items-page">
        <UserHeaders/>
      <!-- Big Header with Restaurant Photo and Details -->
      <div class="restaurant-header">
        <img src="@/assets/cheese.jpg" alt="Restaurant Photo" class="header-image" />
        <div class="header-overlay">
          <h1>Traitoria Fiorentina</h1>
          <p>123 Walnut St., Schlewhere, TX 23456</p>
          <p class="min-purchase">Minimum Purchase: ${{ minPurchase.toFixed(2) }}</p>
        </div>
      </div>
  
      <!-- Navbar for Categories -->
      <nav class="category-navbar">
        <button
          v-for="category in categories"
          :key="category"
          @click="activeCategory = category"
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </button>
      </nav>
  
      <!-- Items by Category -->
      <div class="items-container">
        <div v-for="category in categories" :key="category" v-show="activeCategory === category">
          <h2>{{ category }}</h2>
          <div class="items-grid">
            <div v-for="item in items[category]" :key="item.name" class="item-card">
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-price">${{ item.price.toFixed(2) }}</p>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
                  <span class="quantity">{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)" class="quantity-button">+</button>
                </div>
                <button @click="addToCart(item)" class="add-to-cart-button">Add to Cart</button>
              </div>
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
  name: "Items",
  components: {
    UserHeaders,
  },
  data() {
    return {
      // id: null, 
      // restaurant: {
      //   id: null,
      //   name: "",
      //   photo: "",
      //   min_purchase: 0,
      //   delivery_radius: 0,
      //   address: "",
      //   categories: [], 
      // },
      // activeCategory: null, 
      token: localStorage.getItem("token"), 
      restaurant:{
        id: null,
        name: "",
        min_purchase: 0,
        delivery_radius: 0,
        address: "",
        categories: []
      }
      
    };
  },
  created() {
    // Check if the user is logged in
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      this.restaurant.id = this.$route.params.restaurant_id;
      console.log(this.restaurant.id); 
      this.fetchRestaurantDetails(); 
    }
  },
  methods: {
    // Fetch restaurant details and items
    async fetchRestaurantDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/${this.restaurant.id}/`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        // Set restaurant details
        this.restaurant = response.data;
        console.log(this.restaurant);

        // Set the first category as active by default
        if (this.restaurant.categories.length > 0) {
          this.activeCategory = this.restaurant.categories[0];
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        alert("Failed to fetch restaurant details.");
      }
    },

    // Increase item quantity
    increaseQuantity(item) {
      if (!item.quantity) item.quantity = 1; // Initialize quantity if not set
      item.quantity += 1;
    },

    // Decrease item quantity
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Add item to cart
    addToCart(item) {
      alert(`Added ${item.title} (${item.quantity}) to cart!`);
      // You can integrate this with a shopping cart system
    },
  },
};
</script>
  
  <style scoped>
  .items-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .restaurant-header {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .header-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black overlay */
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  
  h1 {
    color: white;
    margin: 0;
    font-size: 2.5rem;
  }
  
  p {
    color: white;
    margin: 5px 0;
  }
  
  .min-purchase {
    font-weight: bold;
    color: #c49a6c; /* Mustard */
  }
  
  .category-navbar {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .category-navbar button {
    background-color: #c49a6c; /* Mustard */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .category-navbar button.active {
    background-color: #6b4423; /* Dark brown */
  }
  
  .category-navbar button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .items-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 15px;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .item-card {
    background-color: #ffffff; /* White */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .item-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .item-details {
    padding: 15px;
    text-align: center;
  }
  
  h3 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 10px;
  }
  
  .item-price {
    color: #555; /* Dark gray */
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  .quantity-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .quantity-button {
    background-color: #c49a6c; /* Mustard */
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .quantity-button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .add-to-cart-button {
    background-color: #6b4423; /* Dark brown */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-to-cart-button:hover {
    background-color: #4a2f1a; /* Darker brown */
  }
  </style>