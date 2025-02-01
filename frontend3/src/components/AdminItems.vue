<template>
    <div class="items-page">
      <AdminHeader />
      <!-- Big Header with Restaurant Photo and Details -->
      <div class="restaurant-header">
        <img src="@/assets/cheese.jpg" alt="Restaurant Photo" class="header-image" />
        <div class="header-overlay">
          <h1>{{ restaurant.name }}</h1>
          <p>{{ restaurant.address }}</p>
          <p class="min-purchase">Minimum Purchase: ${{ restaurant.min_purchase }}</p>
          <div class="opening-hours">
          <h3>Opening Hours</h3>
          <div v-for="(hour, index) in restaurant.openingHours" :key="index" class="opening-hour-item">
            <p>{{ hour.day }}: {{ hour.open }} - {{ hour.close }}</p>
          </div>
        </div>
        </div>
      </div>
  
      <!-- Navbar for Categories -->
      <nav class="category-navbar">
        <!-- Add Category Button -->
        <button class="add-category-button" @click="showAddCategoryForm = true">
          + Add Category
        </button>
  
        <!-- Category Buttons with Edit Icons -->
        <div v-for="category in restaurant.categories" :key="category.id" class="category-button-container">
          <button
            @click="setActiveCategory(category)"
            :class="{ active: activeCategory === category }"
          >
            {{ category.name }}
          </button>
          <span class="edit-icon" @click="openEditCategoryForm(category)">✏️</span>
          <span class="delete-icon" @click="deleteCategory(category.id)">🗑️</span>
        </div>
      </nav>
  
      <!-- Add Category Form -->
      <div v-if="showAddCategoryForm" class="add-category-form">
        <h2>Add New Category</h2>
        <form @submit.prevent="addCategory">
          <div class="form-group">
            <label for="categoryname">Name</label>
            <input v-model="newCategoryName" placeholder="Category Name" required />
          </div>
          <div class="form-buttons">
            <button type="submit" class="submit-button">Save</button>
            <button type="button" class="cancel-button" @click="showAddCategoryForm = false">Cancel</button>
          </div>
        </form>
      </div>
  
      <!-- Edit Category Form -->
      <div v-if="showEditCategoryForm" class="edit-category-form">
        <h3>Edit Category</h3>
        <form @submit.prevent="saveCategoryEdit">
          <div class="form-group">
            <label for="edit-categoryname">Name</label>
            <input v-model="editCategoryName" placeholder="Category Name" required />
          </div>
          <div class="form-buttons">
            <button type="submit" class="submit-button">Save</button>
            <button type="button" class="cancel-button" @click="showEditCategoryForm = false">Cancel</button>
          </div>
        </form>
      </div>
  
      <!-- Items by Category -->
      <div class="items-container">
        <div v-for="category in restaurant.categories" :key="category.id" v-show="activeCategory === category">
          <h2>{{ category.name }}</h2>
  
          <!-- Add Item Card -->
          <div class="add-item-card" @click="showAddItemForm(category)">
            <span>+ Add New Item</span>
          </div>
  
          <!-- Add Item Form -->
          <div v-if="showAddItemFormForCategory === category.id" class="add-item-form">
            <h3>Add New Item</h3>
            <form @submit.prevent="addItem(category)">
              <div class="form-group">
                <label for="itemname">Name</label>
                <input v-model="newItem.title" placeholder="Item Name" required />
              </div>
              <div class="form-group">
                <label for="itemprice">Price</label>
                <input v-model="newItem.price" placeholder="Price" type="number" required />
              </div>
              <div class="form-group">
                <label for="itemimage">Image</label>
                <input type="file" id="itemimage" @change="handleItemImageUpload" required />
              </div>
              <div class="form-group">
                <label for="itemcategory">Categories</label>
                <select v-model="newItem.categoryIds" multiple>
                  <option v-for="cat in restaurant.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div class="form-buttons">
                <button type="submit" class="submit-button">Save</button>
                <button type="button" class="cancel-button" @click="cancelAddItemForm">Cancel</button>
              </div>
            </form>
          </div>
  
          <!-- Items Grid -->
          <div class="items-grid">
            <div v-for="item in category.items" :key="item.title" class="item-card">
              <img :src="getImageUrl(item.photo)" :alt="item.title" class="item-image" />
              <div class="item-details">
                <h3>{{ item.title }}</h3>
                <p class="item-price">${{ item.price }}</p>
                <span class="edit-icon" @click="openEditItemForm(item)">✏️</span>
                <span class="delete-icon" @click.stop="deleteItem(item.id)">🗑️</span>
              </div>
            </div>
          </div>
  
          <!-- Edit Item Form -->
          <div v-if="showEditItemFormForItem === itemToEdit?.title" class="edit-item-form">
            <h3>Edit Item</h3>
            <form @submit.prevent="saveItemEdit">
              <div class="form-group">
                <label for="edit-itemname">Name</label>
                <input v-model="editItem.title" placeholder="Item Name" required />
              </div>
              <div class="form-group">
                <label for="edit-itemprice">Price</label>
                <input v-model="editItem.price" placeholder="Price" type="number" required />
              </div>
              <div class="form-group">
                <label for="edit-itemimage">Image</label>
                <input type="file" id="edit-itemimage" @change="handleEditItemImageUpload" />
              </div>
              <div class="form-group">
                <label for="edit-itemcategory">Categories</label>
                <select v-model="editItem.categoryIds" multiple>
                  <option v-for="cat in restaurant.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div class="form-buttons">
                <button type="submit" class="submit-button">Save</button>
                <button type="button" class="cancel-button" @click="cancelEditItemForm">Cancel</button>
              </div>
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
    name: "ManagerItems",
    components: {
      AdminHeader,
    },
    data() {
      return {
        restaurant: {
          id: null,
          name: "",
          min_purchase: 0,
          photo: null,
          delivery_radius: 0,
          address: "",
          openingHours: [],
          categories: [
            {
              id: null,
              name: "",
              items: [
                {
                  id: null,
                  title: "",
                  price: 0,
                  photo: null,
                  quantity: 0,
                },
              ],
            },
          ],
        },
        token: localStorage.getItem("token"),
        activeCategory: null,
        showAddCategoryForm: false,
        newCategoryName: "",
        showEditCategoryForm: false,
        editCategoryName: "",
        categoryToEdit: null,
        showAddItemFormForCategory: null,
        newItem: {
          title: "",
          price: 0,
          photo: null,
          categoryIds: [],
        },
        showEditItemFormForItem: null,
        itemToEdit: null,
        editItem: {
          title: "",
          price: 0,
          photo: null,
          categoryIds: [],
        },
      };
    },
    created() {
      if (!this.token) {
        alert("You must be logged in to view this page.");
        this.$router.push("/login");
      } else {
        this.restaurant.id = this.$route.params.restaurant_id;
        this.fetchRestaurantDetails();
        
      }
    },
    methods: {
      getImageUrl(imageUrl) {
        return "http://localhost:3000" + imageUrl;
      },
      async fetchRestaurantDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/${this.restaurant.id}/`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.restaurant = response.data;
        this.fetchOpeningHours(); // Fetch opening hours after restaurant details
        if (this.restaurant.categories.length > 0) {
          this.activeCategory = this.restaurant.categories[0];
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        alert("Failed to fetch restaurant details.");
      }
    },
    async fetchOpeningHours() {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurant/open/${this.restaurant.id}/`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // Map the response data to the openingHours format
        this.restaurant.openingHours = response.data.map((hour) => ({
          day: this.getDayOfWeekName(hour.week_day),
          open: hour.start_hour,
          close: hour.end_hour,
        }));
        console.log("Opening Hours:", this.restaurant.openingHours); // Debugging
      } catch (error) {
        console.error("Error fetching opening hours:", error);
        alert("Failed to fetch opening hours. Please try again.");
      }
    },
    getDayOfWeekName(dayNumber) {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return days[dayNumber - 1]; // dayNumber starts from 1
    },
      setActiveCategory(category) {
        this.activeCategory = category;
      },
      async deleteCategory(categoryId) {
        if (confirm("Are you sure you want to delete this category?")) {
          try {
            const response=await axios.delete(`http://localhost:3000/category/delete/${categoryId}/`, {
              headers: {
                Authorization: `token ${this.token}`,
              },
            });
            console.log(response);
            alert("category deleted successfully!");
            this.fetchRestaurantDetails(); // Refresh the users list
          } catch (error) {
            console.error("Error deleting category:", error);
            alert("Failed to delete category. Please try again.");
          }
        }
      },
      async addCategory() {
        try {
          await axios.post(
            `http://localhost:3000/category/create/${this.restaurant.id}`,
            {
              name: this.newCategoryName,
              restaurant_id: this.restaurant.id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          this.fetchRestaurantDetails();
          this.showAddCategoryForm = false;
          this.newCategoryName = "";
        } catch (error) {
          console.error("Error adding category:", error);
          alert("Failed to add category.");
        }
      },
      openEditCategoryForm(category) {
        this.categoryToEdit = category;
        this.editCategoryName = category.name;
        this.showEditCategoryForm = true;
      },
      async saveCategoryEdit() {
        try {
          console.log(this.editCategoryName);
          await axios.put(
            `http://localhost:3000/category/update/${this.categoryToEdit.id}/`,
            { name: this.editCategoryName },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
                
              },
            }
          );
  
        //   Object.assign(this.itemToEdit, response.data);
        this.fetchRestaurantDetails();
          
        } catch (error) {
          console.error("Error updating category:", error);
          alert("Failed to update category.");
        }
      },
      showAddItemForm(category) {
        this.showAddItemFormForCategory = category.id;
        this.newItem.categoryIds = [category.id]; // Default to the current category
      },
      handleItemImageUpload(event) {
        this.newItem.photo = event.target.files[0];
      },
      handleEditItemImageUpload(event) {
        this.editItem.photo = event.target.files[0];
      },
      async deleteItem(itemId) {
        if (confirm("Are you sure you want to delete this item?")) {
          try {
            const response=await axios.delete(`http://localhost:3000/item/delete/${itemId}/`, {
              headers: {
                Authorization: `token ${this.token}`,
              },
            });
            console.log(response);
            alert("item deleted successfully!");
            this.fetchRestaurantDetails(); // Refresh the users list
          } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item. Please try again.");
          }
        }
      },
      async addItem(category) {
        try {
          const formData = new FormData();
          formData.append("title", this.newItem.title);
          formData.append("price", this.newItem.price);
          formData.append("image", this.newItem.photo);
          // formData.append("categoryIds", this.newItem.categoryIds);
          const categoryIdsArray = Object.values(this.newItem.categoryIds);
          
          // Append the array as JSON
          formData.append("categoryIds", categoryIdsArray);
          console.log(typeof formData.get("categoryIds"));
          console.log(this.newItem.categoryIds);
          console.log(typeof categoryIdsArray);
          console.log(Array.isArray(categoryIdsArray));
  
          const response = await axios.post(
            "http://localhost:3000/item/create/",
            formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          category.items.push(response.data);
          this.fetchRestaurantDetails();
          this.cancelAddItemForm();
        } catch (error) {
          console.error("Error adding item:", error);
          alert("Failed to add item.");
        }
      },
      cancelAddItemForm() {
        this.showAddItemFormForCategory = null;
        this.newItem = { title: "", price: 0, photo: null, categoryIds: [] };
      },
      openEditItemForm(item) {
        this.itemToEdit = item;
        this.editItem = { ...item, categoryIds: null };
        this.showEditItemFormForItem = item.title;
      },
      async saveItemEdit() {
        try {
          const formData = new FormData();
          formData.append("title", this.editItem.title);
          formData.append("price", this.editItem.price);
          if (this.editItem.photo) {
            formData.append("image", this.editItem.photo);
          }
          const categoryIdsArray = Object.values(this.editItem.categoryIds);
          formData.append("categoryIds", categoryIdsArray);
          console.log(categoryIdsArray);
          await axios.put(
            `http://localhost:3000/item/update/${this.itemToEdit.id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
  
          this.fetchRestaurantDetails();
          this.cancelEditItemForm();
        } catch (error) {
          console.error("Error updating item:", error);
          alert("Failed to update item.");
        }
      },
      cancelEditItemForm() {
        this.showEditItemFormForItem = null;
        this.itemToEdit = null;
        this.editItem = { title: "", price: 0, photo: null, categoryIds: [] };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  .items-page {
    background-color: #f5f5f5;
    min-height: 100vh;
    padding: 20px;
  }
  
  .restaurant-header {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .header-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .header-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    padding: 20px;
    border-radius: 10px;
    color: white;
  }
  
  h1 {
    color: white;
    margin: 0;
    font-size: 2.5rem;
  }
  
  p {
    color: white;
    margin: 5px 0;
  }
  
  .min-purchase {
    font-weight: bold;
    color: #c49a6c;
  }
  
  .category-navbar {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .category-navbar button {
    background-color: #6a8e4b;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .category-navbar button.active {
    background-color: #024805; /* Darker green for active category */
  }
  
  .category-navbar button:hover {
    background-color: #024805;
  }
  
  .add-category-button {
    background-color: #6a8e4b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .category-button-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .edit-icon,
  .delete-icon {
    cursor: pointer;
    font-size: 14px;
    color: #6b4423;
  }
  
  .add-item-card {
    background-color: #ffffff;
    border: 2px dashed #c49a6c;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .items-container {
    max-width: 800px; /* Adjusted to match card width */
    margin: 0 auto;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .item-card {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .item-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .item-details {
    padding: 15px;
    text-align: center;
  }
  
  h3 {
    color: #6b4423;
    margin-bottom: 10px;
  }
  
  .item-price {
    color: #555;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  .add-category-form,
  .edit-category-form,
  .add-item-form,
  .edit-item-form {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin: 20px auto;
    max-width: 800px; /* Match card width */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center; /* Center align form content */
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left; /* Align labels and inputs to the left */
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #6b4423;
    font-weight: bold;
  }
  
  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #c49a6c;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
  }
  
  input:focus,
  select:focus {
    border-color: #6b4423;
  }
  
  select[multiple] {
    height: 100px; /* Adjust height for multi-select */
  }
  
  .form-buttons {
    display: flex;
    justify-content: center; /* Center buttons */
    gap: 10px;
    margin-top: 20px;
  }
  
  .submit-button {
    background-color: #6a8e4b;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .cancel-button {
    background-color: #ab0000;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .restaurant-header {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
}

.header-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

.header-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent black overlay */
  padding: 20px;
  border-radius: 10px;
  color: white;
}

h1 {
  color: white;
  margin: 0;
  font-size: 2.5rem;
}

p {
  color: white;
  margin: 5px 0;
}

.min-purchase {
  font-weight: bold;
  color: #c49a6c; /* Mustard */
}

.opening-hours {
  margin-top: 15px;
}

.opening-hours h3 {
  color: #c49a6c; /* Mustard */
  margin-bottom: 10px;
}

.opening-hour-item {
  color: white;
  margin: 5px 0;
}
  </style>