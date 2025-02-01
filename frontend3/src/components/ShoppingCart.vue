<template>
  <div class="shopping-cart-page">
    <UserHeaders />
    <div class="shopping-cart-container">
      <h1>Shopping Cart</h1>

      <!-- Restaurant Carts -->
      <div v-for="(cart, index) in carts" :key="index" class="restaurant-cart">
        <div v-if="cart.isActive">
        <h2>{{ cart.restaurant.name }}</h2>

        <!-- Items in Cart -->
        <div v-for="(item, itemIndex) in cart.restaurant.items" :key="itemIndex" class="cart-item">
          <!-- Food Image -->
          <img :src="getImageUrl(item.photoUrl)" :alt="item.title" class="item-image" />

          <!-- Item Details -->
          <div class="item-details">
            <p class="item-name">{{ item.title }}</p>
            <p class="item-price">${{ item.price.toFixed(2) }}</p>
          </div>

          <!-- Quantity Controls -->
          <div class="item-quantity">
            <span class="quantity-display">{{ item.quantity }}</span>
            <button class="quantity-button" @click="reduceQuantity(index, itemIndex)">
              🗑️
            </button>
          </div>
        </div>
        </div>

        <!-- Total Price and Order Button -->
        <div class="cart-summary">
          <button class="order-button" @click="placeOrder(index)">Order Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeaders from "./UserHeader.vue";
import axios from "axios";

export default {
  name: "ShoppingCart",
  components: {
    UserHeaders,
  },
  data() {
    return {
      carts: [],
      token: localStorage.getItem("token"),
    };
  },
  created() {
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      this.fetchCarts();
    }
  },
  methods: {
    getImageUrl(imageUrl) {
      return "http://localhost:3000" + imageUrl;
    },

    // Reduce the quantity of an item
    async reduceQuantity(restaurantIndex, itemIndex) {
      const item = this.carts[restaurantIndex].restaurant.items[itemIndex];
      const cart = this.carts[restaurantIndex];
      console.log(cart,item);
      try {
        // Call the API to decrease the quantity
        const response = await axios.post(
          "http://localhost:3000/cart/decrease",
          {
            itemId: item.id, // Assuming the item has an `id` field
            cartId: cart.cartId
          },
          {
            headers: {
              Authorization: `token ${this.token}`,
            },
      
          }
        );
        console.log(response);

          if (item.quantity > 1) {
            item.quantity -= 1; // Reduce quantity by 1
          } else {
            if (confirm("Remove this item from the cart?")) {
              this.carts[restaurantIndex].restaurant.items.splice(itemIndex, 1); // Remove item if quantity is 1
            }
          }
        
      } catch (error) {
        console.log("Error reducing quantity:", error);
        alert("Failed to update quantity. Please try again.");
      }
    },

    // Place an order for a specific restaurant's cart
    async placeOrder(cartIndex) {
      try {
        const cart = this.carts[cartIndex];

        // Prepare the payload
        const payload = {
          cartId: cart.cartId, // Send the cart ID
          isPurchased: true, // Set is_purchased to true
        };

        // Send the POST request to the API
        const response = await axios.post(
          "http://localhost:3000/order/create/",
          payload,
          {
            headers: {
              Authorization: `token ${this.token}`, // Include the token in the headers
            },
          }
        );

        // Handle success
        alert("Order placed successfully!");
        console.log("Order response:", response.data);

        // Remove the cart from the list after placing the order
        this.carts.splice(cartIndex, 1);
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      }
    },

    // Fetch carts from the backend
    async fetchCarts() {
      try {
        const response = await axios.get("http://localhost:3000/cart/mine/", {
          headers: {
            Authorization: `token ${this.token}`,
          },
        });
        
        this.carts = response.data;
        console.log(this.carts);
      } catch (error) {
        console.error("Error fetching carts:", error);
        alert("Failed to get carts. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.shopping-cart-page {
  background-color: #fff2d1; /* Light background */
  min-height: 100vh;
  padding: 20px;
}

.shopping-cart-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #ffffff; /* White */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #6b4423; /* Dark brown */
  margin-bottom: 20px;
}

.restaurant-cart {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #c49a6c; /* Mustard */
  border-radius: 10px;
  background-color: #f9f9f9; /* Light gray */
}

h2 {
  color: #6b4423; /* Dark brown */
  margin-bottom: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #c49a6c; /* Mustard */
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 15px;
  object-fit: cover;
  background-color: transparent;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: bold;
  color: #6b4423; /* Dark brown */
  margin-bottom: 5px;
}

.item-price {
  color: #555; /* Dark gray */
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-display {
  font-size: 16px;
  color: #6b4423; /* Dark brown */
}

.quantity-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #ff4d4d; /* Red */
  transition: color 0.3s;
}

.quantity-button:hover {
  color: #cc0000; /* Darker red */
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.order-button {
  background-color: #c49a6c; /* Mustard */
  color: #ffffff; /* White */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-button:hover {
  background-color: #6b4423; /* Dark brown */
}
</style>