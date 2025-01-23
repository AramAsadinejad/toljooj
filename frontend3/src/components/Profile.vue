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
              placeholder="Enter your username"
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
              :class="{ primary: address.isPrimary }"
            >
              <p>{{ address.text }}</p>
              <div class="address-actions">
                <button
                  v-if="!address.isPrimary"
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
  
  export default {
    name: "Profile",
    components: {
      UserHeaders,
    },
    data() {
      return {
        username: "JohnDoe", // Default username
        newAddress: "", // Input for new address
        addresses: [
          {
            text: "123 Main St, City, Country",
            isPrimary: true,
          },
          {
            text: "456 Elm St, Town, Country",
            isPrimary: false,
          },
        ], // List of addresses
      };
    },
    methods: {
      // Save the updated username
      saveUsername() {
        alert(`Username saved: ${this.username}`);
      },
  
      // Add a new address
      addAddress() {
        if (this.newAddress.trim() === "") {
          alert("Please enter a valid address.");
          return;
        }
        this.addresses.push({
          text: this.newAddress,
          isPrimary: false,
        });
        this.newAddress = ""; // Clear the input field
      },
  
      // Set an address as primary
      setPrimaryAddress(index) {
        this.addresses.forEach((address, i) => {
          address.isPrimary = i === index;
        });
        alert(`Primary address set to: ${this.addresses[index].text}`);
      },
  
      // Delete an address
      deleteAddress(index) {
        if (confirm("Are you sure you want to delete this address?")) {
          this.addresses.splice(index, 1);
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