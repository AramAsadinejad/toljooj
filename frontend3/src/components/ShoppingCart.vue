<template>
    <div class="shopping-cart-page">
      <UserHeaders />
      <div class="shopping-cart-container">
        <h1>Shopping Cart</h1>
  
        <!-- Restaurant Carts -->
        <div v-for="(cart, index) in restaurantCarts" :key="index" class="restaurant-cart">
          <h2>{{ cart.restaurantName }}</h2>
  
          <!-- Items in Cart -->
          <div v-for="(item, itemIndex) in cart.items" :key="itemIndex" class="cart-item">
            <!-- Food Image -->
            <img :src="item.photo" :alt="item.name" class="item-image" />
  
            <!-- Item Details -->
            <div class="item-details">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>
  
            <!-- Quantity Controls -->
            <div class="item-quantity">
              <button class="quantity-button" @click="reduceQuantity(index, itemIndex)">
                🗑️
              </button>
              <span class="quantity">{{ item.quantity }}</span>
            </div>
          </div>
  
          <!-- Total Price and Order Button -->
          <div class="cart-summary">
            <p class="total-price">Total: ${{ cart.totalPrice.toFixed(2) }}</p>
            <button class="order-button" @click="placeOrder(index)">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserHeaders from "./UserHeader.vue";
  
  export default {
    name: "ShoppingCart",
    components: {
      UserHeaders,
    },
    data() {
      return {
        // Example data for restaurant carts
        restaurantCarts: [
          {
            restaurantName: "The Golden Fork",
            items: [
              {
                name: "Grilled Salmon",
                price: 15.99,
                quantity: 2,
                image: "https://via.placeholder.com/100x100?text=Salmon", // Food image
              },
              {
                name: "Caesar Salad",
                price: 8.99,
                quantity: 1,
                image: "https://via.placeholder.com/100x100?text=Salad", // Food image
              },
            ],
            totalPrice: 40.97, // Calculated dynamically in a real app
          },
          {
            restaurantName: "Mustard Grill",
            items: [
              {
                name: "Mustard Chicken",
                price: 12.99,
                quantity: 3,
                image: "https://via.placeholder.com/100x100?text=Chicken", // Food image
              },
              {
                name: "Garlic Bread",
                price: 4.99,
                quantity: 2,
                image: "https://via.placeholder.com/100x100?text=Bread", // Food image
              },
            ],
            totalPrice: 53.95, // Calculated dynamically in a real app
          },
        ],
      };
    },
    methods: {
      // Reduce the quantity of an item
      reduceQuantity(restaurantIndex, itemIndex) {
        const item = this.restaurantCarts[restaurantIndex].items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1; // Reduce quantity by 1
        } else {
          if (confirm("Remove this item from the cart?")) {
            this.restaurantCarts[restaurantIndex].items.splice(itemIndex, 1); // Remove item if quantity is 1
          }
        }
        this.calculateTotalPrice(restaurantIndex); // Recalculate total price
      },
  
      // Place an order for a specific restaurant's cart
      placeOrder(restaurantIndex) {
        const restaurantName = this.restaurantCarts[restaurantIndex].restaurantName;
        alert(`Order placed for ${restaurantName}!`);
        this.restaurantCarts.splice(restaurantIndex, 1); // Remove the cart after ordering
      },
  
      // Calculate the total price for a restaurant's cart
      calculateTotalPrice(restaurantIndex) {
        const cart = this.restaurantCarts[restaurantIndex];
        cart.totalPrice = cart.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .shopping-cart-page {
    background-color: #FFF2D1; /* Light background */
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
  
  .quantity {
    font-size: 16px;
    color: #6b4423; /* Dark brown */
  }
  
  .cart-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  
  .total-price {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
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