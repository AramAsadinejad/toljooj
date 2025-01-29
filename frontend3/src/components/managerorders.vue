<template>
    <div class="manager-orders-page">
      <ManagerHeader />
      <div class="orders-container">
        <!-- Approved Orders -->
        <div class="approved-orders">
          <h2>Approved Orders</h2>
          <div v-for="(order, index) in approvedOrders" :key="index" class="order-card faded">
            <h3>{{ order.restaurantName }}</h3>
            <p class="delivery-address">Deliver to: {{ order.deliveryAddress }}</p>
  
            <!-- Items in Order -->
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-quantity">Quantity: {{ item.quantity }}</p>
                <p class="item-price">Price: ${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
  
            <!-- Order Summary -->
            <div class="order-summary">
              <p>Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <p class="total-cost">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div>
          </div>
        </div>
  
        <!-- Pending Orders -->
        <div class="pending-orders">
          <h2>Pending Orders</h2>
          <div v-for="(order, index) in pendingOrders" :key="index" class="order-card red">
            <h3>{{ order.restaurantName }}</h3>
            <p class="delivery-address">Deliver to: {{ order.deliveryAddress }}</p>
  
            <!-- Items in Order -->
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <p class="item-name">{{ item.name }}</p>
                <p class="item-quantity">Quantity: {{ item.quantity }}</p>
                <p class="item-price">Price: ${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
  
            <!-- Order Summary -->
            <div class="order-summary">
              <!-- <p>Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p> -->
              <p class="total-cost">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div>
  
            <!-- Delivery Price Input and Action Buttons -->
            <div class="order-actions">
              <div class="delivery-price-input">
                <label for="deliveryPrice">Delivery Fee:</label>
                <input
                  type="number"
                  id="deliveryPrice"
                  v-model="order.deliveryPrice"
                  placeholder="Enter delivery fee"
                />
              </div>
              <button @click="approveOrder(index)" class="approve-button">Approve</button>
              <button @click="rejectOrder(index)" class="reject-button">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ManagerHeader from "@/components/ManagerHeader.vue";
  
  export default {
    name: "ManagerOrders",
    components: {
      ManagerHeader,
    },
    data() {
      return {
        // Example data for approved orders
        approvedOrders: [
          {
            restaurantName: "The Golden Fork",
            deliveryAddress: "123 Main St, City, Country",
            items: [
              {
                name: "Grilled Salmon",
                quantity: 2,
                price: 15.99,
                image: "https://via.placeholder.com/100x100?text=Salmon",
              },
              {
                name: "Caesar Salad",
                quantity: 1,
                price: 8.99,
                image: "https://via.placeholder.com/100x100?text=Salad",
              },
            ],
            deliveryFee: 5.99,
            totalCost: 40.97,
          },
        ],
  
        // Example data for pending orders
        pendingOrders: [
          {
            restaurantName: "Mustard Grill",
            deliveryAddress: "456 Elm St, Town, Country",
            items: [
              {
                name: "Mustard Chicken",
                quantity: 3,
                price: 12.99,
                image: "https://via.placeholder.com/100x100?text=Chicken",
              },
              {
                name: "Garlic Bread",
                quantity: 2,
                price: 4.99,
                image: "https://via.placeholder.com/100x100?text=Bread",
              },
            ],
            deliveryFee: 4.99,
            totalCost: 53.95,
            deliveryPrice: 0, // Delivery price input by manager
          },
        ],
      };
    },
    methods: {
      // Approve an order
      approveOrder(index) {
        const order = this.pendingOrders[index];
        if (!order.deliveryPrice || order.deliveryPrice <= 0) {
          alert("Please enter a valid delivery price.");
          return;
        }
  
        // Update delivery fee and move to approved orders
        order.deliveryFee = order.deliveryPrice;
        this.approvedOrders.push(order);
        this.pendingOrders.splice(index, 1);
        alert("Order approved!");
      },
  
      // Reject an order
      rejectOrder(index) {
        if (confirm("Are you sure you want to reject this order?")) {
          this.pendingOrders.splice(index, 1);
          alert("Order rejected.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .manager-orders-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .orders-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .approved-orders,
  .pending-orders {
    flex: 1;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .order-card {
    background-color: #ffffff; /* White */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .faded {
    opacity: 0.7; /* Faded effect for approved orders */
  }
  
  .red {
    border: 3px solid #6a8e4b; /* Red border for pending orders */
  }
  
  h3 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 10px;
  }
  
  .delivery-address {
    color: #555; /* Dark gray */
    margin-bottom: 15px;
  }
  
  .order-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-right: 15px;
    object-fit: cover;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
  }
  
  .item-quantity,
  .item-price {
    color: #555; /* Dark gray */
  }
  
  .order-summary {
    margin-top: 15px;
    border-top: 1px solid #c49a6c; /* Mustard */
    padding-top: 10px;
  }
  
  .total-cost {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
  }
  
  .order-actions {
    margin-top: 15px;
    padding: 10px;
    background-color: #f9f9f9; /* Light gray */
    border-radius: 5px;
  }
  
  .delivery-price-input {
    margin-bottom: 10px;
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
  
  .approve-button {
    background-color: #6a8e4b; /* Green */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
  }
  
  .approve-button:hover {
    background-color: #024805; /* Darker green */
  }
  
  .reject-button {
    background-color: #ff4d4d; /* Red */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .reject-button:hover {
    background-color: #cc0000; /* Darker red */
  }
  </style>