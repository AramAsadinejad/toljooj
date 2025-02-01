<template>
    <div class="admin-users-page">
      <AdminHeader />
      <div class="admin-users-container">
        <!-- Left Side: Users List -->
        <div class="users-list">
          <h1>Users List</h1>
          <div v-for="user in users" :key="user.userId" class="user-card">
            <div class="user-header" @click="toggleAddresses(user.userId)">
              <p class="username">{{ user.username }}</p>
              <div class="user-actions">
                <span class="edit-icon" @click.stop="openEditForm(user)">✏️</span>
                <span class="delete-icon" @click.stop="deleteUser(user.userId)">🗑️</span>
              </div>
            </div>
  
            <!-- Addresses Dropdown -->
            <div v-if="expandedUser === user.userId" class="addresses-dropdown">
              <div v-for="address in user.addresses" :key="address.addressId" class="address-item">
                <p class="address">{{ address.value }} ({{ address.isDefault ? "Default" : "Not Default" }})</p>
                <div class="address-actions">
                  <span class="edit-icon" @click.stop="openEditAddressForm(address)">✏️</span>
                  <span class="delete-icon" @click.stop="deleteAddress(address.addressId)">🗑️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Side: Forms -->
        <div class="forms-container">
          <!-- Create User Form -->
          <div class="create-user-form">
            <h2>Create New User</h2>
            <form @submit.prevent="submitCreateUserForm">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="newUser.username" required />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="newUser.password" required />
              </div>
              <div class="form-group">
                <label for="role">Role</label>
                <select id="role" v-model="newUser.type" required>
                  <option value="User">User</option>
                  <option value="RestaurantManager">Restaurant Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" class="submit-button">Create User</button>
            </form>
          </div>
  
          <!-- Edit User Form -->
          <div v-if="showEditForm" class="edit-user-form">
            <h2>Edit User</h2>
            <form @submit.prevent="submitEditForm">
              <div class="form-group">
                <label for="edit-username">Username</label>
                <input type="text" id="edit-username" v-model="editUser.username" required />
              </div>
              <div class="form-group">
                <label for="edit-password">Password</label>
                <input type="password" id="edit-password" v-model="editUser.password" required />
              </div>
              <div class="form-group">
                <label for="edit-role">Role</label>
                <select id="edit-role" v-model="editUser.type" required>
                  <option value="User">User</option>
                  <option value="RestaurantManager">Restaurant Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" class="submit-button">Save Changes</button>
              <button type="button" class="cancel-button" @click="closeEditForm">Cancel</button>
            </form>
          </div>
  
          <!-- Edit Address Form -->
          <div v-if="showEditAddressForm" class="edit-address-form">
            <h2>Edit Address</h2>
            <form @submit.prevent="submitEditAddressForm">
              <div class="form-group">
                <label for="edit-address-id">Address </label>
                <input type="text" id="edit-address-id" v-model="editAddress.value" disabled />
              </div>
              <div class="form-group">
                <label for="edit-is-default">Is Default</label>
                <input type="checkbox" id="edit-is-default" v-model="editAddress.isDefault" />
              </div>
              <button type="submit" class="submit-button">Save Changes</button>
              <button type="button" class="cancel-button" @click="closeEditAddressForm">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminHeader from "./AdminHeader.vue";
  import axios from "axios";
  
  export default {
    name: "AdminUser",
    components: {
      AdminHeader,
    },
    data() {
      return {
        users: [], // List of users
        newUser: {
          username: "",
          password: "",
          type: "User", // Default role
        },
        editUser: {
          userId: null,
          username: "",
          password: "",
          type: "User",
        },
        editAddress: {
          value:"",
          addressId: null,
          isDefault: false,
        },
        showEditForm: false, // Toggle edit user form visibility
        showEditAddressForm: false, // Toggle edit address form visibility
        expandedUser: null, // Track which user's addresses are expanded
        token: localStorage.getItem("token"),
      };
    },
    created() {
      if (!this.token) {
        alert("You must be logged in to view this page.");
        this.$router.push("/login");
      } else {
        this.fetchUsers();
      }
    },
    methods: {
      // Fetch all users from the API
      async fetchUsers() {
        try {
          const response = await axios.get("http://localhost:3000/user/getall/", {
            headers: {
              Authorization: `token ${this.token}`,
            },
          });
          this.users = response.data;
        } catch (error) {
          console.error("Error fetching users:", error);
          alert("Failed to fetch users. Please try again.");
        }
      },
  
      // Toggle addresses dropdown for a user
      toggleAddresses(userId) {
        this.expandedUser = this.expandedUser === userId ? null : userId;
      },
  
      // Open the edit user form
      openEditForm(user) {
        this.editUser = { ...user };
        this.showEditForm = true;
      },
  
      // Close the edit user form
      closeEditForm() {
        this.showEditForm = false;
        this.editUser = { userId: null, username: "", password: "", type: "User" };
      },
  
      // Open the edit address form
      openEditAddressForm(address) {
        this.editAddress = { ...address };
        this.showEditAddressForm = true;
      },
  
      // Close the edit address form
      closeEditAddressForm() {
        this.showEditAddressForm = false;
        this.editAddress = { addressId: null, isDefault: false };
      },
  
      // Submit the create user form
      async submitCreateUserForm() {
        try {
          const response = await axios.post(
            "http://localhost:3000/user/create/",
            {
              username: this.newUser.username,
              password: this.newUser.password,
              type: this.newUser.type,
            },
            {
              headers: {
                Authorization: `token ${this.token}`,
              },
            }
          );
            console.log(response);
          alert("User created successfully!");
          this.newUser = { username: "", password: "", type: "User" }; // Reset form
          this.fetchUsers(); // Refresh the users list
        } catch (error) {
          console.error("Error creating user:", error);
          alert("Failed to create user. Please try again.");
        }
      },
  
      // Submit the edit user form
      async submitEditForm() {
        try {
          await axios.put(
            `http://localhost:3000/user/update/${this.editUser.userId}/`,
            {
              username: this.editUser.username,
              password: this.editUser.password,
              type: this.editUser.type,
            },
            {
              headers: {
                Authorization: `token ${this.token}`,
              },
            }
          );
  
          alert("User updated successfully!");
          this.closeEditForm();
          this.fetchUsers(); // Refresh the users list
        } catch (error) {
          console.error("Error updating user:", error);
          alert("Failed to update user. Please try again.");
        }
      },
  
      // Submit the edit address form
      async submitEditAddressForm() {
        try {
          await axios.put(
            `http://localhost:3000/address/update/${this.editAddress.addressId}/`,
            {
              value: this.editAddress.value,
              isDefault: this.editAddress.isDefault,
            },
            {
              headers: {
                Authorization: `token ${this.token}`,
              },
            }
          );
  
          alert("Address updated successfully!");
          this.closeEditAddressForm();
          this.fetchUsers(); // Refresh the users list
        } catch (error) {
          console.error("Error updating address:", error);
          alert("Failed to update address. Please try again.");
        }
      },
  
      // Delete a user
      async deleteUser(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
          try {
            console.log(userId);
            const response=await axios.delete(`http://localhost:3000/user/delete/${userId}/`, {
              headers: {
                Authorization: `token ${this.token}`,
              },
            });
            console.log(response);
            alert("User deleted successfully!");
            this.fetchUsers(); // Refresh the users list
          } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user. Please try again.");
          }
        }
      },
  
      // Delete an address
      async deleteAddress(addressId) {
        if (confirm("Are you sure you want to delete this address?")) {
          try {
            await axios.delete(`http://localhost:3000/address/delete/${addressId}/`, {
              headers: {
                Authorization: `token ${this.token}`,
              },
            });
  
            alert("Address deleted successfully!");
            this.fetchUsers(); // Refresh the users list
          } catch (error) {
            console.error("Error deleting address:", error);
            alert("Failed to delete address. Please try again.");
          }
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-users-page {
    background-color: #f5f5f5; /* Light background */
    min-height: 100vh;
    padding: 20px;
  }
  
  .admin-users-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .users-list {
    flex: 2; /* Take up 2/3 of the space */
    background-color: #ffffff; /* White */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .forms-container {
    flex: 1; /* Take up 1/3 of the space */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Space between forms */
  }
  
  .create-user-form,
  .edit-user-form,
  .edit-address-form {
    background-color: #ffffff; /* White */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
  }
  
  .user-card {
    margin-bottom: 10px;
    border-bottom: 1px solid #c49a6c; /* Mustard */
  }
  
  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 10px;
  }
  
  .username {
    font-weight: bold;
    color: #6b4423; /* Dark brown */
  }
  
  .user-actions {
    display: flex;
    gap: 10px;
  }
  
  .edit-icon,
  .delete-icon {
    cursor: pointer;
    font-size: 18px;
  }
  
  .edit-icon:hover {
    color: #6a8e4b; /* Mustard */
  }
  
  .delete-icon:hover {
    color: #ab0000; /* Red */
  }
  
  .addresses-dropdown {
    padding: 10px;
    background-color: #f9f9f9; /* Light gray */
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .address-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
  }
  
  .address {
    color: #555; /* Dark gray */
  }
  
  .address-actions {
    display: flex;
    gap: 10px;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 20px;
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
  
  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #c49a6c; /* Mustard */
    border-radius: 5px;
    font-size: 14px;
    outline: none;
  }
  
  input:focus,
  select:focus {
    border-color: #6b4423; /* Dark brown */
  }
  
  .submit-button {
    background-color: #6a8e4b; /* Mustard */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px;
  }
  
  .submit-button:hover {
    background-color: #024805; /* Dark brown */
  }
  
  .cancel-button {
    background-color: #ab0000; /* Red */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .cancel-button:hover {
    background-color: #500000; /* Darker red */
  }
  </style>