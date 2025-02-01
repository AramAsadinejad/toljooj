<template>
  <div class="manager-orders-page">
    <ManagerHeader />
    <div class="orders-container">
      <!-- Approved Orders -->
      <div class="approved-orders">
        <h2>Approved Orders</h2>
        <div v-for="(order, index) in approvedOrders" :key="index" class="order-card faded">
          <h3>{{ order.restaurant.name }}</h3>
          <p class="delivery-address">Deliver to: {{ order.address.addressValue }}</p>

          <!-- Items in Order -->
          <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
            <img :src="getImageUrl(item.photoUrl)" :alt="item.name" class="item-image" />
            <div class="item-details">
              <p class="item-name">{{ item.title }}</p>
              <p class="item-quantity">Quantity: {{ item.quantity }}</p>
              <p class="item-price">Price: ${{ item.price }}</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <p>Delivery Fee: ${{ order.deliveryFee}}</p>
            <p class="total-cost">Total: ${{ order.totalCost }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Orders -->
      <div class="pending-orders">
        <h2>Pending Orders</h2>
        <div v-for="(order, index) in pendingOrders" :key="index" class="order-card red">
          <h3>{{ order.restaurant.name }}</h3>
          <p class="delivery-address">Deliver to: {{ order.address.addressValue }}</p>

          <!-- Items in Order -->
          <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-details">
              <p class="item-name">{{ item.title }}</p>
              <p class="item-quantity">Quantity: {{ item.quantity }}</p>
              <p class="item-price">Price: ${{ item.price }}</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary">
            <!-- <p>Delivery Fee: ${{ order.deliveryFee.toFixed(2) }}</p> -->
            <p class="total-cost">Total: ${{ order.totalCost }}</p>
          </div>

          <!-- Delivery Price Input and Action Buttons -->
          <div class="order-actions">
            <div class="delivery-price-input">
              <label for="deliveryPrice">Delivery Fee:</label>
              <input
                type="number"
                id="deliveryPrice"
                v-model="delivery_fee"
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
import axios from "axios";

export default {
  name: "ManagerOrders",
  components: {
    ManagerHeader,
  },
  data() {
    return {
      delivery_fee:0,
      // Example data for approved orders
      approvedOrders: [
      ],

      // Example data for pending orders
      pendingOrders: [
        
      ],
      token: localStorage.getItem("token"),
    };
  },
  created() {
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      console.log(this.token);
      this.fetchManagerOrders(); // Fetch orders data
    }
  },
  methods: {
    getImageUrl(imageUrl) {
      return "http://localhost:3000" + imageUrl;
    },
    // Approve an order
    async approveOrder(index) {
      const order = this.pendingOrders[index];
      
      try{
        console.log(this.delivery_fee);
        console.log(order.orderId);
      await axios.patch(
        `http://localhost:3000/order/set-status/${order.orderId}`,
        { deliveryFee : this.delivery_fee },
        {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
      )
      alert("Primary address updated successfully!");
      this.fetchManagerOrders();
      } catch (error) {
        console.error("Error setting primary address:", error);
        alert("Failed to set primary address.");
      }
      
    },

    // Reject an order
    rejectOrder(index) {
      if (confirm("Are you sure you want to reject this order?")) {
        this.pendingOrders.splice(index, 1);
        alert("Order rejected.");
      }
    },
    async fetchManagerOrders(){
      try {
        const response = await axios.get(
          "http://localhost:3000/order/manager/pending/",  {
        headers: {
          Authorization: `Bearer ${this.token}`,
        }
      })
    
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach((order) => {
            if (order.status === false) {
              this.pendingOrders.push(order); // Add to pending orders
            } else {
              this.approvedOrders.push(order); // Add to approved orders
            }
          });
          console.log(this.pendingOrders);console.log(this.approvedOrders);
        } else {
          console.error("Invalid response data format");
        }
      }catch(error){
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders.");
      }
        
      
    }
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