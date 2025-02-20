<template>
  <div class="manage-restaurants-page">
    <AdminHeader />
    <div class="restaurants-container">
      <h1>Admin Restaurants</h1>

      <!-- Add New Restaurant Card -->
      <div class="add-restaurant-card" @click="showAddRestaurantForm = true">
        <span>+ Add New Restaurant</span>
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
            <label for="image">Restaurant Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              @change="handleImageUpload"
              required
            />
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

          <!-- Opening Hours Section -->
          <div class="opening-hours-section">
            <div class="opening-hours-header">
              <h3>Opening Hours</h3>
              <button type="button" class="add-button" @click="addOpeningHour">Add Day</button>
            </div>
            <div v-for="(day, index) in newRestaurant.openingHours" :key="index" class="opening-hours-item">
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
              <button type="button" class="remove-button" @click="removeOpeningHour(index)">Remove</button>
            </div>
            
          </div>

          <button type="submit" class="submit-button">Submit for Approval</button>
          <button type="button" class="cancel-button" @click="showAddRestaurantForm = false">Cancel</button>
        </form>
      </div>

      <!-- Edit Restaurant Form -->
      <div v-if="showEditRestaurantForm" class="edit-restaurant-form">
        <h2>Edit Restaurant</h2>
        <form @submit.prevent="submitEditForm">
          <div class="form-group">
            <label for="edit-name">Restaurant Name</label>
            <input type="text" id="edit-name" v-model="editRestaurant.restaurant_name" required />
          </div>
          <div class="form-group">
            <label for="edit-image">Restaurant Image URL</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              @change="handleImageUpload"
              required
            />
          </div>
          <div class="form-group">
            <label for="edit-address">Address</label>
            <input type="text" id="edit-address" v-model="editRestaurant.restaurant_address" required />
          </div>
          <div class="form-group">
            <label for="edit-minPurchase">Minimum Purchase</label>
            <input type="number" id="edit-minPurchase" v-model="editRestaurant.restaurant_min_purchase" required />
          </div>
          <div class="form-group">
            <label for="edit-deliveryRadius">Delivery Radius (km)</label>
            <input type="number" id="edit-deliveryRadius" v-model="editRestaurant.restaurant_delivery_radius" required />
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


      <!-- Restaurants List -->
      <div class="restaurants-grid">
        <div v-for="restaurant in restaurants" :key="restaurant.restaurant_id" class="restaurant-card">
          <img :src="getImageUrl(restaurant.restaurant_photo)" :alt="restaurant.name" class="restaurant-image" />
          <div class="restaurant-details">
            <h2>{{ restaurant.restaurant_name }}</h2>
            <p>{{ restaurant.address }}</p>
            <p>Min Purchase: ${{ restaurant.restaurant_min_purchase }}</p>
            <p>Delivery Radius: {{ restaurant.restaurant_delivery_radius }} km</p>
            <button class="edit-button" @click="openEditForm(restaurant)">Edit</button>
            <button class="order-button" @click="$router.push(`/adminitems/${restaurant.restaurant_id}`)">View Menu</button>
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
  </div>
</template>

<script>
import AdminHeader from "./AdminHeader.vue";
import axios from "axios";
export default {
  name: "ManageRestaurants",
  components: {
    AdminHeader,
  },
  data() {
    return {
      showAddRestaurantForm: false, // Toggle add form visibility
      showEditRestaurantForm: false, // Toggle edit form visibility
      page: 1,
      limit: 5,
      newRestaurant: {
        name: "",
        image: "",
        address: "",
        min_purchase: 0,
        locationX: 0,
        locationY: 0,
        delivery_radius: 0,
        openingHours: [], // Array to store opening hours
      },
      editRestaurant: {
        id: null,
        restaurant_name: "",
        image_url: null,
        address: "",
        min_purchase: 0,
        delivery_radius: 0,
        openingHours: [],
      },
      restaurants: [
      ],
      token:localStorage.getItem("token")
    };
  },
  created() {
    console.log(this.token);
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    }else {
      this.getRestaurants();
    }
  },
  methods: {
    nextPage() {
      
        this.page++;
        this.getRestaurants();
      
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.getRestaurants();
      }
    },
    // Change the limit (items per page)
    changeLimit() {
      this.page = 1; // Reset to the first page
      this.getRestaurants();
    },
    // Add a new opening hour field to the add form
    addOpeningHour() {
      this.newRestaurant.openingHours.push({ day: "Monday", open: "09:00", close: "18:00" });
    },

    // Remove an opening hour field from the add form
    removeOpeningHour(index) {
      this.newRestaurant.openingHours.splice(index, 1);
    },

    // Add a new opening hour field to the edit form
    addEditOpeningHour() {
      this.editRestaurant.openingHours.push({ day: "Monday", open: "09:00", close: "18:00" });
    },

    // Remove an opening hour field from the edit form
    removeEditOpeningHour(index) {
      this.editRestaurant.openingHours.splice(index, 1);
    },

    // Close the edit form
    closeEditForm() {
      this.showEditRestaurantForm = false; // Hide the edit form
      this.editRestaurant = {
        id: null,
        name: "",
        image: "",
        address: "",
        minPurchase: 0,
        deliveryRadius: 0,
        openingHours: [],
      }; // Reset the edit form
    },
    getImageUrl(imageUrl) {
      return "http://localhost:3000" + imageUrl;
    },
    async getRestaurants(){
      try {
        const response=await axios.get(
          `http://localhost:3000/restaurant/all?page=${this.page}&limit=${this.limit}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        this.restaurants = await Promise.all(response.data.map(async (restaurant) => {
          const openingHoursResponse = await axios.get(
            `http://localhost:3000/restaurant/open/${restaurant.restaurant_id}/`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          restaurant.openingHours = openingHoursResponse.data.map(hour => ({
            day: this.getDayOfWeekName(hour.week_day),
            open: hour.start_hour,
            close: hour.end_hour
          }));
          return restaurant;
        }));
        console.log(this.restaurants); 
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants.");
      }
    },

    handleImageUpload(event) {
    this.newRestaurant.image = event.target.files[0]; // Store the selected file
    },
    
    async submitRestaurantForm() {
      try {
        const formData = new FormData();
        formData.append("name", this.newRestaurant.name);
        formData.append("min_purchase", this.newRestaurant.min_purchase);
        formData.append("deliveryRadius", this.newRestaurant.delivery_radius);
        formData.append("locationX", this.newRestaurant.locationX);
        formData.append("locationY", this.newRestaurant.locationY);
        formData.append("address", this.newRestaurant.address);
        formData.append("image", this.newRestaurant.image);

        const response = await axios.post(
          "http://localhost:3000/restaurant/create/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${this.token}`,
            },
          }
        );

        const restaurantId = response.data.restaurant_id;
        console.log(response.data);
        alert("Restaurant added successfully!");

        await this.submitOpeningHours(restaurantId);

        this.showAddRestaurantForm = false;
        this.newRestaurant = {
          name: "",
          image: null,
          address: "",
          minPurchase: 0,
          deliveryRadius: 0,
          locationX: 0,
          locationY: 0,
          openingHours: [],
        };

        this.getRestaurants();
      } catch (error) {
        console.error("Error adding restaurant:", error);
        alert("Failed to add restaurant. Please try again.");
      }
    },

    async submitOpeningHours(restaurantId) {
      try {
        
        const openHours = this.newRestaurant.openingHours.map((hour) => {
        const dayOfWeek = this.getDayOfWeekNumber(hour.day); // Convert day to number
        return {
          startHour: hour.open,
          endHour: hour.close,
          dayOfWeek: dayOfWeek,
        };
      });

        await axios.post(
          `http://localhost:3000/restaurant/create/open/`,
          {
            restId: restaurantId, // Restaurant ID
            openHours: openHours,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        );

        alert("Opening hours added successfully!");
      } catch (error) {
        console.error("Error adding opening hours:", error);
        alert("Failed to add opening hours. Please try again.");
      }
    },

    async submitEditForm() {
      try {
        const formData = new FormData();
        formData.append("name", this.editRestaurant.restaurant_name);
        formData.append("min_purchase", this.editRestaurant.min_purchase);
        formData.append("deliveryRadius", this.editRestaurant.delivery_radius);
        formData.append("address", this.editRestaurant.address);
        if (this.editRestaurant.image_url) {
          formData.append("image", this.editRestaurant.image_url);
        }

        const response = await axios.put(
          `http://localhost:3000/restaurant/update/${this.editRestaurant.restaurant_id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${this.token}`,
            },
          }
        );
        console.log(response);
        alert("Restaurant updated successfully!");

        await this.updateOpeningHours(this.editRestaurant.restaurant_id);

        const index = this.restaurants.findIndex((r) => r.id === this.editRestaurant.id);
        if (index !== -1) {
          this.restaurants[index] = { ...this.editRestaurant };
        }

        this.closeEditForm();
      } catch (error) {
        console.error("Error updating restaurant:", error);
        alert("Failed to update restaurant. Please try again.");
      }
    },

    async updateOpeningHours(restaurantId) {
      try {
        const openHours = this.editRestaurant.openingHours.map((hour) => {
        const dayOfWeek = this.getDayOfWeekNumber(hour.day); // Convert day to number
        return {
          startHour: hour.open,
          endHour: hour.close,
          dayOfWeek: dayOfWeek,
        };
      });

        await axios.post(
          `http://localhost:3000/restaurant/create/open/`,
          {
            restId: restaurantId, // Restaurant ID
            openHours: openHours,
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        );

        alert("Opening hours updated successfully!");
      } catch (error) {
        console.error("Error updating opening hours:", error);
        alert("Failed to update opening hours. Please try again.");
      }
    },

    async openEditForm(restaurant) {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/open/${restaurant.restaurant_id}/`,
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
          }
        );

        this.editRestaurant = {
          ...restaurant,
          openingHours: response.data.map(hour => ({
            day: this.getDayOfWeekName(hour.week_day),
            open: hour.start_hour,
            close: hour.end_hour
          })),
        };

        this.showEditRestaurantForm = true;
      } catch (error) {
        console.error("Error fetching opening hours:", error);
        alert("Failed to fetch opening hours. Please try again.");
      }
    },

    getDayOfWeekNumber(day) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days.indexOf(day) + 1; // Monday = 1, Tuesday = 2, etc.
  },

  getDayOfWeekName(dayNumber) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return days[dayNumber - 1]; // dayNumber starts from 1
  }

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
  max-width: 900px;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 5fr));
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

.edit-button {
  background-color: #6b4423; /* Dark brown */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #4a2f1a; /* Darker brown */
}

.add-restaurant-form,
.edit-restaurant-form {
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

.opening-hours-section {
  margin-top: 20px;
}

.opening-hours-section h3 {
  color: #6b4423; /* Dark brown */
  
}

.opening-hours-header {
  display: flex; /* Align items horizontally */
  align-items: center; /* Vertically center items */
  justify-content: space-between; /* Space between h3 and button */
  margin-bottom: 15px; /* Add some spacing below the header */
}

.opening-hours-header h3 {
  margin: 0; /* Remove default margin for h3 */
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
  color: #ffffff; /* White */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.submit-button:hover {
  background-color: #024805; /* Dark brown */
}

.cancel-button {
  background-color: #ab0000; /* Red */
  color: #ffffff; /* White */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #500000; /* Darker red */
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