<template>
    <div class="orders-page">
      <UserHeaders />
      <div class="orders-container">
        <!-- Previous Orders -->
        <div class="previous-orders">
          <h2>Previous Orders</h2>
          <div v-for="(order, index) in previousOrders" :key="index" class="order-card faded">
            <h3>{{ order.restaurant.name }}</h3>
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
            <!-- <div class="order-summary faded">
              <p class="faded">Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <p class="total-cost faded">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div> -->
          </div>
        </div>
  
        <!-- Upcoming Orders -->
        <div class="upcoming-orders">
          <h2>Upcoming Orders</h2>
          <div v-for="(order, index) in upcomingOrders" :key="index" class="order-card red">
            <h3 class="upcoming-text">{{ order.restaurant.name }}</h3>
            <p class="delivery-address-upcoming">Delivering to: {{ order.addressId }}</p>
  
            <!-- Items in Order -->
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
              <img :src="item.itemPhotoUrl" :alt="item.name" class="item-image" />
              <div class="item-details ">
                <p class="item-name ">{{ item.itemTitle }}</p>
                <p class="item-quantity ">Quantity: {{ item.quantity }}</p>
              </div>
            </div>
  
            <!-- Order Summary -->
            <!-- <div class="order-summary">
              <p>Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <p class="total-cost">Total: ${{ order.totalCost.toFixed(2) }}</p>
            </div> -->
  
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
  import axios from "axios";
  export default {
    name: "Orders",
    components: {
      UserHeaders,
    },
    data() {
      return {
        // Example data for previous orders
        previousOrders: [
        ],
        token: localStorage.getItem("token"),
        // Example data for upcoming orders
        upcomingOrders: [
        ],
      };
    },
    created(){
      if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      console.log(this.token);
      this.fetchOrders(); // Fetch restaurants data
    }
    },
    methods:{
      async fetchOrders(){
          try {
          const response = await axios.get("http://localhost:3000/order/mine/", {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          const orders=response.data;
          orders.forEach((order)=>{
            if (order.status===false){
              this.previousOrders.push(order);
            }else{
              this.upcomingOrders.push(order);
            }
          })
          console.log(this.previousOrders);
          console.log(this.upcomingOrders);
          
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to fetch orders.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .orders-page {
    /* background-image: "C:/Users/KAVOSH/Desktop/toljooj/frontend3/src/assets/background.jpg"; */
    /* background-image: url("@/assets/Untitled (1).jpeg"); */
    background-color: #f5f5f5; 
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
    background-color: #024805;
    /* border: 2px solid #da7400cd; Red border for upcoming orders */
  }
  
  h3 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 10px;
  }
  .upcoming-text {
    color: #f9f6f4;
  }
  
  .delivery-address {
    color: #555; /* Dark gray */
    margin-bottom: 15px;
  }
  .delivery-address-upcoming {
    color: #a9a9a9; /* Dark gray */
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
    background-color: #605e5bcd; /* Light red */
    border-radius: 5px;
    text-align: center;
  }
  
  .order-status p {
    color: #ffffff; /* Dark red */
    font-weight: bold;
  }
  </style>