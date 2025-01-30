<template>
    <div class="admin-restaurants-page">
      <AdminHeader />
      <div class="restaurants-container">
        <h1>Admin Restaurants Panel</h1>
  
        <!-- Split Layout -->
        <div class="split-layout">
          <!-- Approved Restaurants (Left Side) -->
          <div class="approved-restaurants">
            <h2>Approved Restaurants</h2>
            <div class="restaurants-grid">
              <div v-for="restaurant in approvedRestaurants" :key="restaurant.id" class="restaurant-card">
                <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image" />
                <div class="restaurant-details">
                  <h2>{{ restaurant.name }}</h2>
                  <p>{{ restaurant.address }}</p>
                  <p>Min Purchase: ${{ restaurant.minPurchase.toFixed(2) }}</p>
                  <p>Delivery Radius: {{ restaurant.deliveryRadius }} km</p>
                  <div class="actions">
                    <span class="edit-icon" @click="openEditForm(restaurant)">✏️</span>
                    <span class="delete-icon" @click="deleteRestaurant(restaurant.id)">🗑️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Restaurants Awaiting Approval (Right Side) -->
          <div class="pending-restaurants">
            <h2>Restaurants Awaiting Approval</h2>
            <div class="restaurants-grid">
              <div v-for="restaurant in pendingRestaurants" :key="restaurant.id" class="restaurant-card">
                <img :src="restaurant.image" :alt="restaurant.name" class="restaurant-image" />
                <div class="restaurant-details">
                  <h2>{{ restaurant.name }}</h2>
                  <p>{{ restaurant.address }}</p>
                  <p>Min Purchase: ${{ restaurant.minPurchase.toFixed(2) }}</p>
                  <p>Delivery Radius: {{ restaurant.deliveryRadius }} km</p>
                  <button class="approve-button" @click="approveRestaurant(restaurant.id)">Approve</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Edit Restaurant Form -->
        <div v-if="showEditRestaurantForm" class="edit-restaurant-form">
          <h2>Edit Restaurant</h2>
          <form @submit.prevent="submitEditForm">
            <div class="form-group">
              <label for="edit-name">Restaurant Name</label>
              <input type="text" id="edit-name" v-model="editRestaurant.name" required />
            </div>
            <div class="form-group">
              <label for="edit-image">Restaurant Image URL</label>
              <input type="text" id="edit-image" v-model="editRestaurant.image" />
            </div>
            <div class="form-group">
              <label for="edit-address">Address</label>
              <input type="text" id="edit-address" v-model="editRestaurant.address" required />
            </div>
            <div class="form-group">
              <label for="edit-minPurchase">Minimum Purchase</label>
              <input type="number" id="edit-minPurchase" v-model="editRestaurant.minPurchase" required />
            </div>
            <div class="form-group">
              <label for="edit-deliveryRadius">Delivery Radius (km)</label>
              <input type="number" id="edit-deliveryRadius" v-model="editRestaurant.deliveryRadius" required />
            </div>
  
            <!-- Opening Hours Section -->
            <div class="opening-hours-section">
              <div class="opening-hours-header">
                <h3>Opening Hours</h3>
                <button type="button" class="add-button" @click="addEditOpeningHour">Add Day</button>
              </div>
              <div v-for="(day, index) in editRestaurant.openingHours" :key="index" class="opening-hours-item">
                <select v-model="day.day" required>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <input type="time" v-model="day.open" required />
                <span>to</span>
                <input type="time" v-model="day.close" required />
                <button type="button" class="remove-button" @click="removeEditOpeningHour(index)">Remove</button>
              </div>
            </div>
  
            <button type="submit" class="submit-button">Save Changes</button>
            <button type="button" class="cancel-button" @click="closeEditForm">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminHeader from "./AdminHeader.vue";
//   import axios from "axios";
  
  export default {
    name: "AdminRestaurants",
    components: {
      AdminHeader,
    },
    data() {
      return {
        approvedRestaurants: [
          {
            id: 1,
            name: "The Golden Fork",
            image: "https://via.placeholder.com/300x200?text=Golden+Fork",
            address: "123 Main St, City, Country",
            minPurchase: 15.0,
            deliveryRadius: 5,
            openingHours: [
              { day: "Monday", open: "09:00", close: "18:00" },
              { day: "Saturday", open: "12:00", close: "20:00" },
            ],
          },
        ],
        pendingRestaurants: [
          {
            id: 2,
            name: "Mustard Grill",
            image: "https://via.placeholder.com/300x200?text=Mustard+Grill",
            address: "456 Elm St, Town, Country",
            minPurchase: 10.0,
            deliveryRadius: 3,
            openingHours: [
              { day: "Tuesday", open: "10:00", close: "19:00" },
              { day: "Friday", open: "11:00", close: "21:00" },
            ],
          },
        ],
        showEditRestaurantForm: false,
        editRestaurant: {
          id: null,
          name: "",
          image: "",
          address: "",
          minPurchase: 0,
          deliveryRadius: 0,
          openingHours: [],
        },
      };
    },
    methods: {
      // Open the edit form and pre-fill it with the restaurant's details
      openEditForm(restaurant) {
        this.editRestaurant = { ...restaurant, openingHours: [...restaurant.openingHours] };
        this.showEditRestaurantForm = true;
      },
  
      // Close the edit form
      closeEditForm() {
        this.showEditRestaurantForm = false;
        this.editRestaurant = {
          id: null,
          name: "",
          image: "",
          address: "",
          minPurchase: 0,
          deliveryRadius: 0,
          openingHours: [],
        };
      },
  
      // Submit the edit form
      submitEditForm() {
        const index = this.approvedRestaurants.findIndex((r) => r.id === this.editRestaurant.id);
        if (index !== -1) {
          this.approvedRestaurants[index] = { ...this.editRestaurant };
        }
        alert("Restaurant updated successfully!");
        this.closeEditForm();
      },
  
      // Delete a restaurant
      deleteRestaurant(id) {
        this.approvedRestaurants = this.approvedRestaurants.filter((r) => r.id !== id);
        alert("Restaurant deleted successfully!");
      },
  
      // Approve a restaurant
      approveRestaurant(id) {
        const restaurant = this.pendingRestaurants.find((r) => r.id === id);
        if (restaurant) {
          this.approvedRestaurants.push(restaurant);
          this.pendingRestaurants = this.pendingRestaurants.filter((r) => r.id !== id);
          alert("Restaurant approved successfully!");
        }
      },
  
      // Add a new opening hour field to the edit form
      addEditOpeningHour() {
        this.editRestaurant.openingHours.push({ day: "Monday", open: "09:00", close: "18:00" });
      },
  
      // Remove an opening hour field from the edit form
      removeEditOpeningHour(index) {
        this.editRestaurant.openingHours.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-restaurants-page {
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
  
  .split-layout {
    display: flex;
    gap: 20px;
  }
  
  .approved-restaurants,
  .pending-restaurants {
    flex: 1;
    background-color: #ffffff; /* White */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .restaurants-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
    height: 150px;
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
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  
  .edit-icon,
  .delete-icon {
    cursor: pointer;
    font-size: 18px;
    transition: color 0.3s;
  }
  
  .edit-icon:hover {
    color: #6a8e4b; /* Mustard */
  }
  
  .delete-icon:hover {
    color: #ab0000; /* Red */
  }
  
  .approve-button {
    background-color: #6a8e4b; /* Mustard */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .approve-button:hover {
    background-color: #024805; /* Darker green */
  }
  
  .edit-restaurant-form {
    background-color: #ffffff; /* White */
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
  
  .opening-hours-section {
    margin-top: 20px;
  }
  
  .opening-hours-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .opening-hours-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .opening-hours-item select,
  .opening-hours-item input {
    flex: 1;
  }
  
  .remove-button {
    background-color: #ff4d4d; /* Red */
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .remove-button:hover {
    background-color: #cc0000; /* Darker red */
  }
  
  .add-button {
    background-color: #c49a6c; /* Mustard */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .submit-button {
    background-color: #6a8e4b; /* Mustard */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
  }
  
  .submit-button:hover {
    background-color: #024805; /* Darker green */
  }
  
  .cancel-button {
    background-color: #ab0000; /* Red */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-button:hover {
    background-color: #500000; /* Darker red */
  }
  </style>