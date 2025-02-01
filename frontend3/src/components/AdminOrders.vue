<template>
    <div class="admin-orders-page">
      <AdminHeader />
      <div class="admin-orders-container">
        <h1>Orders List</h1>
  
        <!-- Orders List -->
        <div class="orders-list">
          <div v-for="order in orders" :key="order.cartId" class="order-card">
            <div class="order-header" @click="toggleOrderDetails(order.cartId)">
              <p class="restaurant-name">{{ order.restaurant.name }}</p>
              <p class="delivery-fee">Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p>
              <span class="delete-icon" @click.stop="deleteOrder(order.cartId)">🗑️</span>
            </div>
  
            <!-- Order Details Dropdown -->
            <div v-if="expandedOrder === order.cartId" class="order-details-dropdown">
              <div class="order-info">
                <p><strong>Username:</strong> {{ order.address.addressUsername }}</p>
                <p><strong>Deliver to:</strong> {{ order.address.addressValue }}</p>
                <p><strong>Total Cost:</strong> ${{ calculateTotalCost(order) }}</p>
              </div>
  
              <!-- Items in Order -->
              <div class="items-list">
                <div v-for="item in order.items" :key="item.id" class="item">
                  <p class="item-name">{{ item.title }}</p>
                  <p class="item-price">${{ item.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminHeader from "./AdminHeader.vue";
  import axios from "axios";
  
  export default {
    name: "AdminOrders",
    components: {
      AdminHeader,
    },
    data() {
      return {
        orders: [], // List of orders
        expandedOrder: null, // Track which order's details are expanded
        token: localStorage.getItem("token"),
      };
    },
    created() {
      if (!this.token) {
        alert("You must be logged in to view this page.");
        this.$router.push("/login");
      } else {
        this.fetchOrders();
      }
    },
    methods: {
      // Fetch all orders from the API
      async fetchOrders() {
        try {
          const response = await axios.get("http://localhost:3000/order/all/", {
            headers: {
              Authorization: `token ${this.token}`,
            },
          });
          this.orders = response.data;
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to fetch orders. Please try again.");
        }
      },
  
      // Toggle order details dropdown
      toggleOrderDetails(cartId) {
        this.expandedOrder = this.expandedOrder === cartId ? null : cartId;
      },
  
      // Calculate the total cost of an order
      calculateTotalCost(order) {
        const itemsTotal = order.items.reduce((total, item) => total + item.price, 0);
        return (itemsTotal + order.deliveryFee).toFixed(2);
      },
  
      // Delete an order
      async deleteOrder(cartId) {
        if (confirm("Are you sure you want to delete this order?")) {
          try {
            await axios.delete(`http://localhost:3000/order/delete/${cartId}/`, {
              headers: {
                Authorization: `token ${this.token}`,
              },
            });
  
            alert("Order deleted successfully!");
            this.fetchOrders(); // Refresh the orders list
          } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete order. Please try again.");
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-orders-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .admin-orders-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  h1 {
    text-align: center;
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .orders-list {
    background-color: #ffffff; /* White */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .order-card {
    margin-bottom: 10px;
    border-bottom: 1px solid #c49a6c; /* Mustard */
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px;
  }
  
  .restaurant-name {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
  }
  
  .delivery-fee {
    color: #555; /* Dark gray */
  }
  
  .delete-icon {
    cursor: pointer;
    font-size: 18px;
    color: #ab0000; /* Red */
  }
  
  .delete-icon:hover {
    color: #500000; /* Darker red */
  }
  
  .order-details-dropdown {
    padding: 10px;
    background-color: #f9f9f9; /* Light gray */
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .order-info {
    margin-bottom: 10px;
  }
  
  .order-info p {
    margin: 5px 0;
    color: #555; /* Dark gray */
  }
  
  .items-list {
    margin-top: 10px;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  
  .item-name {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
  }
  
  .item-price {
    color: #555; /* Dark gray */
  }
  </style>