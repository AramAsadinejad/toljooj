<template>
  <div class="profile-page">
    <UserHeaders />
    <div class="profile-container">
      <h1>Profile</h1>

      <!-- Edit Username Section -->
      <div class="profile-section">
        <h2>Edit Username</h2>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :placeholder="username"
          />
        </div>
        <button class="save-button" @click="saveUsername">Save Username</button>
      </div>

      <!-- Manage Addresses Section -->
      <div class="profile-section">
        <h2>Manage Addresses</h2>

        <!-- Add New Address Form -->
        <div class="form-group">
          <label for="new-address">Add New Address</label>
          <input
            type="text"
            id="new-address"
            v-model="newAddress"
            placeholder="Enter your address"
          />
          <button class="add-button" @click="addAddress">Add Address</button>
        </div>

        <!-- List of Addresses -->
        <div class="address-list">
          <div
            v-for="(address, index) in addresses"
            :key="index"
            class="address-item"
            :class="{ primary: address.is_default }"
          >
            <p>{{ address.value }}</p>
            <div class="address-actions">
              <button
                v-if="!address.is_default"
                class="set-primary-button"
                @click="setPrimaryAddress(index)"
              >
                Set as Primary
              </button>
              <button class="delete-button" @click="deleteAddress(index)">
                Delete
              </button>
            </div>
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
  name: "Profile",
  components: {
    UserHeaders,
  },
  data() {
    return {
      username: "", // User's username
      newAddress: "", // Input for new address
      addresses: [], // List of user addresses
      token: localStorage.getItem("token"), // Get token from localStorage
    };
  },
  created() {
    console.log(this.token);
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      this.fetchUserProfile(); // Fetch user profile data
    }
  },
  methods: {
    // Fetch user profile data (including addresses)
    async fetchUserProfile() {
      try {
        const response = await axios.get("http://localhost:3000/address/mine", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log(response.data.addresses[0].value)
        this.username = response.data.user.username;
        this.addresses = response.data.addresses;
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data.");
      }
    },

    // Save the updated username
    async saveUsername() {
      try {
        await axios.put(
          "/api/user/update-username",
          { username: this.username },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        alert("Username updated successfully!");
      } catch (error) {
        console.error("Error updating username:", error);
        alert("Failed to update username.");
      }
    },

    // Add a new address
    async addAddress() {
      if (this.newAddress.trim() === "") {
        alert("Please enter a valid address.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/address/create",
          {
            value: this.newAddress,
            isDefault: false, // Default value for new addresses
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        // Add the new address to the list
        this.addresses.push(response.data);
        this.newAddress = ""; // Clear the input field
        alert("Address added successfully!");
        this.fetchUserProfile();
      } catch (error) {
        console.error("Error adding address:", error);
        alert("Failed to add address.");
      }
    },

    // Set an address as primary
    async setPrimaryAddress(index) {
      try {
        const addressId = this.addresses[index].address_id;
        await axios.patch(
          `http://localhost:3000/set-prime/${addressId}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );

        // Update the addresses list
        this.addresses.forEach((address, i) => {
          address.is_default = i === index;
        });
        alert("Primary address updated successfully!");
      } catch (error) {
        console.error("Error setting primary address:", error);
        alert("Failed to set primary address.");
      }
    },

    // Delete an address
    async deleteAddress(index) {
      if (confirm("Are you sure you want to delete this address?")) {
        try {
          const addressId = this.addresses[index].id;
          await axios.delete(`/api/address/delete/${addressId}`, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          // Remove the address from the list
          this.addresses.splice(index, 1);
          alert("Address deleted successfully!");
        } catch (error) {
          console.error("Error deleting address:", error);
          alert("Failed to delete address.");
        }
      }
    },
  },
};
</script>

  
  <style scoped>
  .profile-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .profile-container {
    max-width: 500px;
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
  
  .profile-section {
    margin-bottom: 30px;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 15px;
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
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }
  
  .save-button,
  .add-button {
    background-color: #c49a6c; /* Mustard */
    color: #ffffff; /* White */
  }
  
  .save-button:hover,
  .add-button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .address-list {
    margin-top: 20px;
  }
  
  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #c49a6c; /* Mustard */
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f9f9f9; /* Light gray */
  }
  
  .address-item.primary {
    border-color: #6b4423; /* Dark brown */
    background-color: #e8d7c1; /* Light mustard */
  }
  
  .address-actions button {
    margin-left: 10px;
  }
  
  .set-primary-button {
    background-color: #6b4423; /* Dark brown */
    color: #ffffff; /* White */
  }
  
  .set-primary-button:hover {
    background-color: #4a2f1a; /* Darker brown */
  }
  
  .delete-button {
    background-color: #ff4d4d; /* Red */
    color: #ffffff; /* White */
  }
  
  .delete-button:hover {
    background-color: #cc0000; /* Darker red */
  }
  </style>