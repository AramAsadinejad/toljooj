<template>
    <div class="manage-restaurants-page">
      <ManagerHeader />
      <div class="restaurants-container">
        <h1>Manage Restaurants</h1>
  
        <!-- Add New Restaurant Card -->
        <div class="add-restaurant-card" @click="showAddRestaurantForm = true">
          <span>+ Add New Restaurant</span>
        </div>
  
        <!-- Restaurants List -->
        <div class="restaurants-grid">
          <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
            <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image" />
            <div class="restaurant-details">
              <h2>{{ restaurant.name }}</h2>
              <p>{{ restaurant.address }}</p>
              <p>Min Purchase: ${{ restaurant.minPurchase.toFixed(2) }}</p>
              <p>Delivery Radius: {{ restaurant.deliveryRadius }} km</p>
            </div>
          </div>
        </div>
  
        <!-- Add Restaurant Form -->
        <div v-if="showAddRestaurantForm" class="add-restaurant-form">
          <h2>Add New Restaurant</h2>
          <form @submit.prevent="submitRestaurantForm">
            <div class="form-group">
              <label for="name">Restaurant Name</label>
              <input type="text" id="name" v-model="newRestaurant.name" required />
            </div>
            <div class="form-group">
              <label for="image">Restaurant Image URL</label>
              <input type="text" id="image" v-model="newRestaurant.image" />
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" v-model="newRestaurant.address" required />
            </div>
            <div class="form-group">
              <label for="minPurchase">Minimum Purchase</label>
              <input type="number" id="minPurchase" v-model="newRestaurant.minPurchase" required />
            </div>
            <div class="form-group">
              <label for="deliveryRadius">Delivery Radius (km)</label>
              <input type="number" id="deliveryRadius" v-model="newRestaurant.deliveryRadius" required />
            </div>
            <button type="submit" class="submit-button">Submit for Approval</button>
            <button type="button" class="cancel-button" @click="showAddRestaurantForm = false">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ManagerHeader from "./ManagerHeader.vue";
  
  export default {
    name: "ManageRestaurants",
    components: {
      ManagerHeader,
    },
    data() {
      return {
        showAddRestaurantForm: false, // Toggle form visibility
        newRestaurant: {
          name: "",
          image: "",
          address: "",
          minPurchase: 0,
          deliveryRadius: 0,
        },
        restaurants: [
          {
            id: 1,
            name: "The Golden Fork",
            image: "https://via.placeholder.com/300x200?text=Golden+Fork",
            address: "123 Main St, City, Country",
            minPurchase: 15.0,
            deliveryRadius: 5,
          },
          {
            id: 2,
            name: "Mustard Grill",
            image: "https://via.placeholder.com/300x200?text=Mustard+Grill",
            address: "456 Elm St, Town, Country",
            minPurchase: 10.0,
            deliveryRadius: 3,
          },
        ],
      };
    },
    methods: {
      // Submit the new restaurant form
      submitRestaurantForm() {
        // Simulate sending data to the admin for approval
        alert("Restaurant submitted for approval. Waiting for admin confirmation.");
        this.showAddRestaurantForm = false;
        this.newRestaurant = {
          name: "",
          image: "",
          address: "",
          minPurchase: 0,
          deliveryRadius: 0,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .manage-restaurants-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .restaurants-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .add-restaurant-card {
    background-color: #ffffff; /* White */
    border: 2px dashed #c49a6c; /* Mustard */
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-restaurant-card:hover {
    background-color: #f9f9f9; /* Light gray */
  }
  
  .add-restaurant-card span {
    color: #6b4423; /* Dark brown */
    font-size: 18px;
    font-weight: bold;
  }
  
  .restaurants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
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
    margin-bottom: 5px;
  }
  
  .add-restaurant-form {
    background-color: #ffffff; /* White */
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #6b4423; /* Dark brown */
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #c49a6c; /* Mustard */
    border-radius: 5px;
    font-size: 14px;
    outline: none;
  }
  
  input:focus {
    border-color: #6b4423; /* Dark brown */
  }
  
  .submit-button {
    background-color: #c49a6c; /* Mustard */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
  }
  
  .submit-button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .cancel-button {
    background-color: #ff4d4d; /* Red */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-button:hover {
    background-color: #cc0000; /* Darker red */
  }
  </style>