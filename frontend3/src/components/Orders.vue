<template>
    <div class="orders-page">
      <UserHeaders />
      <div class="orders-container">
        <!-- Previous Orders -->
        <div class="previous-orders">
          <h2>Previous Orders</h2>
          <div v-for="(order, index) in previousOrders" :key="index" class="order-card faded">
            <h3>{{ order.restaurantName }}</h3>
            <p class="delivery-address">Delivered to: {{ order.deliveryAddress }}</p>
  
            <!-- Items in Order -->
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item faded">
              <img :src="item.photo" :alt="item.name" class="item-image faded" />
              <div class="item-details faded">
                <p class="item-name faded">{{ item.name }}</p>
                <p class="item-quantity faded">Quantity: {{ item.quantity }}</p>
              </div>
            </div>
  
            <!-- Order Summary -->
            <div class="order-summary faded">
              <p class="faded">Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <p class="total-cost faded">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div>
          </div>
        </div>
  
        <!-- Upcoming Orders -->
        <div class="upcoming-orders">
          <h2>Upcoming Orders</h2>
          <div v-for="(order, index) in upcomingOrders" :key="index" class="order-card red">
            <h3>{{ order.restaurantName }}</h3>
            <p class="delivery-address">Delivering to: {{ order.deliveryAddress }}</p>
  
            <!-- Items in Order -->
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
              <img :src="item.photo" :alt="item.name" class="item-image" />
              <div class="item-details ">
                <p class="item-name ">{{ item.name }}</p>
                <p class="item-quantity ">Quantity: {{ item.quantity }}</p>
              </div>
            </div>
  
            <!-- Order Summary -->
            <div class="order-summary">
              <p>Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <p class="total-cost">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div>
  
            <!-- Order Status -->
            <div class="order-status">
              <p>ON THE WAY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserHeaders from "./UserHeader.vue";
  
  export default {
    name: "Orders",
    components: {
      UserHeaders,
    },
    data() {
      return {
        // Example data for previous orders
        previousOrders: [
          {
            restaurantName: "The Golden Fork",
            deliveryAddress: "123 Main St, City, Country",
            items: [
              {
                name: "Grilled Salmon",
                quantity: 2,
                image: "https://via.placeholder.com/100x100?text=Salmon",
              },
              {
                name: "Caesar Salad",
                quantity: 1,
                image: "https://via.placeholder.com/100x100?text=Salad",
              },
            ],
            deliveryFee: 5.99,
            totalCost: 40.97,
          },
          {
            restaurantName: "Mustard Grill",
            deliveryAddress: "456 Elm St, Town, Country",
            items: [
              {
                name: "Mustard Chicken",
                quantity: 3,
                image: "https://via.placeholder.com/100x100?text=Chicken",
              },
              {
                name: "Garlic Bread",
                quantity: 2,
                image: "https://via.placeholder.com/100x100?text=Bread",
              },
            ],
            deliveryFee: 4.99,
            totalCost: 53.95,
          },
        ],
  
        // Example data for upcoming orders
        upcomingOrders: [
          {
            restaurantName: "Pizza Palace",
            deliveryAddress: "789 Oak St, Village, Country",
            items: [
              {
                name: "Pepperoni Pizza",
                quantity: 1,
                image: "https://via.placeholder.com/100x100?text=Pizza",
              },
              {
                name: "Garlic Knots",
                quantity: 2,
                image: "https://via.placeholder.com/100x100?text=Knots",
              },
            ],
            deliveryFee: 6.99,
            totalCost: 28.97,
            status: "On the way",
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .orders-page {
    /* background-image: "C:/Users/KAVOSH/Desktop/toljooj/frontend3/src/assets/background.jpg"; */
    background-image: url("@/assets/Untitled (1).jpeg");
    /* background-color: #f5f5f5;  */
    min-height: 100vh;
    padding: 20px;
  }
  
  .orders-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .previous-orders,
  .upcoming-orders {
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
    opacity: 0.8; 
  }
  
  .red {
    border: 2px solid #da7400cd; /* Red border for upcoming orders */
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
  
  .item-quantity {
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
  
  .order-status {
    margin-top: 15px;
    padding: 10px;
    background-color: #da7400cd; /* Light red */
    border-radius: 5px;
    text-align: center;
  }
  
  .order-status p {
    color: #ffffff; /* Dark red */
    font-weight: bold;
  }
  </style>