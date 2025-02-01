<template>
  <div class="items-page">
    <UserHeaders />
    <!-- Big Header with Restaurant Photo and Details -->
    <div class="restaurant-header">
      <img :src="getImageUrl(restaurant.photo)" alt="Restaurant Photo" class="header-image" />
      <div class="header-overlay">
        <h1>{{ restaurant.name }}</h1>
        <p>{{ restaurant.address }}</p>
        <p class="min-purchase">Minimum Purchase: ${{ restaurant.min_purchase }}</p>
        <div class="opening-hours">
          <h3>Opening Hours</h3>
          <div v-for="(hour, index) in restaurant.openingHours" :key="index" class="opening-hour-item">
            <p>{{ hour.day }}: {{ hour.open }} - {{ hour.close }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar for Categories -->
    <nav class="category-navbar">
      <button
        v-for="category in restaurant.categories"
        :key="category.id"
        @click="activeCategory = category"
        :class="{ active: activeCategory === category }"
      >
        {{ category.name }}
      </button>
    </nav>

    <!-- Items by Category -->
    <div class="items-container">
      <div v-for="category in restaurant.categories" :key="category.id" v-show="activeCategory === category">
        <h2>{{ category.name }}</h2>
        <div class="items-grid">
          <div v-for="item in category.items" :key="item.id" class="item-card">
            <img :src="getImageUrl(item.photo)" :alt="item.title" class="item-image" />
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="item-price">${{ item.price }}</p>
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
    <!-- Paginator -->
    <!-- <div class="paginator">
        <button class="paginator-button" @click="previousPage" :disabled="page === 1">Previous</button>
        <span class="page-info">Page {{ page }} of {{ totalPages }}</span>
        <button class="paginator-button" @click="nextPage" :disabled="page === totalPages">Next</button>
      </div> -->
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
      page:1,
      limit:1,
      token: localStorage.getItem("token"),
      restaurant: {
        id: null,
        name: "",
        min_purchase: 0,
        photo: null,
        delivery_radius: 0,
        address: "",
        categories: [],
      },
      activeCategory: null, // Track the active category
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
    nextPage() {
      
      this.page++;
      this.fetchRestaurantDetails();
    
  },
  previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchRestaurantDetails();
      }
    },
    getImageUrl(imageUrl) {
      return "http://localhost:3000" + imageUrl;
    },
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
        console.log(response);
        // Set restaurant details
        this.restaurant = response.data;
        this.addQuantityToItems(this.restaurant.categories);
        this.fetchOpeningHours();
        // Set the first category as active by default
        if (this.restaurant.categories.length > 0) {
          this.activeCategory = this.restaurant.categories[0];
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        alert("Failed to fetch restaurant details.");
      }
    },
    async fetchOpeningHours() {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/open/${this.restaurant.id}/`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // Map the response data to the openingHours format
        this.restaurant.openingHours = response.data.map((hour) => ({
          day: this.getDayOfWeekName(hour.week_day),
          open: hour.start_hour,
          close: hour.end_hour,
        }));
        console.log("Opening Hours:", this.restaurant.openingHours); // Debugging
      } catch (error) {
        console.error("Error fetching opening hours:", error);
        alert("Failed to fetch opening hours. Please try again.");
      }
    },
    getDayOfWeekName(dayNumber) {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return days[dayNumber - 1]; // dayNumber starts from 1
    },

    // Add quantity property to items
    addQuantityToItems(categories) {
      for (let category of categories) {
        for (let item of category.items) {
          item.quantity = 1; // Initialize quantity to 1
        }
      }
    },

    // Increase item quantity
    increaseQuantity(item) {
      item.quantity += 1;
    },

    // Decrease item quantity
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Add item to cart
    async addToCart(item) {
      console.log(item);
      try {
        const response = await axios.post(
          "http://localhost:3000/cart/add/",
          {
            itemId: item.id, // Send itemId
            quantity: item.quantity, // Send quantity
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log(response);
        alert(`Added ${item.title} (${item.quantity}) to cart!`);
        
      } catch (error) {
        console.error("Error adding item to cart:", error);
        alert("Failed to add item to cart. Please try again.");
      }
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
  background-color: #6a8e4b; /* Mustard */
  color: #ffffff; /* White */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-navbar button.active {
  background-color: #024805; /* Dark green for active category */
}

.category-navbar button:hover {
  background-color: #024805; /* Dark green on hover */
}

.items-container {
  max-width: 500px;
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
  background-color: #ff8400; /* Darker brown */
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