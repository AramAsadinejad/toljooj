<template>
  <div class="items-page">
    <UserHeaders />
    <!-- Big Header with Restaurant Photo and Details -->
    <div class="restaurant-header">
      <img src="@/assets/cheese.jpg" alt="Restaurant Photo" class="header-image" />
      <div class="header-overlay">
        <h1>{{ restaurant.name }}</h1>
        <p>{{ restaurant.address }}</p>
        <p class="min-purchase">Minimum Purchase: ${{ restaurant.min_purchase.toFixed(2) }}</p>
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
          @click="activeCategory = category"
          :class="{ active: activeCategory === category }"
        >
          {{ category.name }}
        </button>
        <span class="edit-icon" @click="openEditCategoryForm(category)">✏️</span>
      </div>
    </nav>

    <!-- Add Category Form -->
    <div v-if="showAddCategoryForm" class="add-category-form">
      <h2>Add New Category</h2>
      <form>
      <div class="form-group">
            <label for="categoryname">Name</label>
            <input v-model="newCategoryName" placeholder="Category Name" />
          </div>
      
      <div class="form-buttons">
        <button class="submit-button" @click="addCategory">Save</button>
        <button class="cancel-button" @click="showAddCategoryForm = false">Cancel</button>
      </div>
    </form>
    </div>

    <!-- Edit Category Form -->
    <div v-if="showEditCategoryForm" class="edit-category-form">
      <h3>Edit Category</h3>
      <input v-model="editCategoryName" placeholder="Category Name" />
      <div class="form-buttons">
        <button class="submit-button" @click="saveCategoryEdit">Save</button>
        <button class="cancel-button" @click="showEditCategoryForm = false">Cancel</button>
      </div>
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
          <div class="form-group">
            <label for="itemname">Name</label>
            <input v-model="newItem.title" placeholder="Item Name" />
          </div>
          <div class="form-group">
            <label for="itemprice">Price</label>
            <input v-model="newItem.price" placeholder="Price" type="number" />
          </div>
          <div class="form-group">
            <label for="itemimage">Image</label>
            <input v-model="newItem.photo" placeholder="Image URL" />
          </div>
          
          <div class="form-buttons">
            <button class="submit-button" @click="addItem(category)">Save</button>
            <button class="cancel-button" @click="cancelAddItemForm">Cancel</button>
          </div>
        </div>

        <!-- Items Grid -->
        <div class="items-grid">
          <div v-for="item in category.items" :key="item.title" class="item-card">
            <img :src="item.photo" :alt="item.title" class="item-image" />
            <div class="item-details">
              <h3>{{ item.title }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
              <span class="edit-icon" @click="openEditItemForm(item)">✏️</span>
            </div>
          </div>
        </div>

        <!-- Edit Item Form -->
        <div v-if="showEditItemFormForItem === itemToEdit?.title" class="edit-item-form">
          <h3>Edit Item</h3>
          <input v-model="editItem.title" placeholder="Item Name" />
          <input v-model="editItem.price" placeholder="Price" type="number" />
          <input v-model="editItem.photo" placeholder="Image URL" />
          <div class="form-buttons">
            <button class="submit-button" @click="saveItemEdit">Save</button>
            <button class="cancel-button" @click="cancelEditItemForm">Cancel</button>
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
  name: "ManagerItems",
  components: {
    UserHeaders,
  },
  data() {
    return {
      restaurant:{
        id: null,
        name: "",
        min_purchase: 0,
        photo:null,
        delivery_radius: 0,
        address: "",
        categories: [
        {
            id: null,
            name: "",
            items: [
                {
                    title: "",
                    price: 0,
                    photo: null,
                    quantity:0
                }
            ]
        },
        ]
      },
      token:localStorage.getItem("token"),
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
        photo: "",
      },
      showEditItemFormForItem: null,
      itemToEdit: null,
      editItem: {
        title: "",
        price: 0,
        photo: "",
      },
    };
  },
  created() {
    // Check if the user is logged in
    if (!this.token) {
      alert("You must be logged in to view this page.");
      this.$router.push("/login"); // Redirect to login page
    } else {
      this.restaurant.id = this.$route.params.restaurant_id;
      console.log(this.restaurant.id); 
      this.fetchRestaurantDetails(); 
    }
  },
  methods: {
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

        // Set restaurant details
        this.restaurant = response.data;
        this.addquantitytoitems(this.restaurant.categories);
        // console.log(this.restaurant.categories[0].items[0].quantity);

        // Set the first category as active by default
        if (this.restaurant.categories.length > 0) {
          this.activeCategory = this.restaurant.categories[0];
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        alert("Failed to fetch restaurant details.");
      }
    },
    addCategory() {
      if (this.newCategoryName) {
        this.restaurant.categories.push({
          id: Date.now(), // Temporary ID
          name: this.newCategoryName,
          items: [],
        });
        this.showAddCategoryForm = false;
        this.newCategoryName = "";
      }
    },
    openEditCategoryForm(category) {
      this.categoryToEdit = category;
      this.editCategoryName = category.name;
      this.showEditCategoryForm = true;
    },
    saveCategoryEdit() {
      if (this.editCategoryName) {
        this.categoryToEdit.name = this.editCategoryName;
        this.showEditCategoryForm = false;
      }
    },
    showAddItemForm(category) {
      this.showAddItemFormForCategory = category.id;
    },
    addItem(category) {
      if (this.newItem.title && this.newItem.price) {
        category.items.push({ ...this.newItem, quantity: 1 });
        this.cancelAddItemForm();
      }
    },
    cancelAddItemForm() {
      this.showAddItemFormForCategory = null;
      this.newItem = { title: "", price: 0, photo: "" };
    },
    openEditItemForm(item) {
      this.itemToEdit = item;
      this.editItem = { ...item };
      this.showEditItemFormForItem = item.title;
    },
    saveItemEdit() {
      if (this.editItem.title && this.editItem.price) {
        Object.assign(this.itemToEdit, this.editItem);
        this.cancelEditItemForm();
      }
    },
    cancelEditItemForm() {
      this.showEditItemFormForItem = null;
      this.itemToEdit = null;
      this.editItem = { title: "", price: 0, photo: "" };
    },
  },
};
</script>

<style scoped>

  .items-page {
    background-color: #f5f5f5; /* Light background */
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
  
  .category-navbar {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .category-navbar button {
    background-color: #6a8e4b; /* Mustard */
    color: #ffffff; /* White */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .category-navbar button.active {
    background-color: #6a8e4b; /* Dark brown */
  }
  
  .category-navbar button:hover {
    background-color: #024805; /* Dark brown */
  }
  
  .items-container {
    max-width: 500px;
    margin: 0 auto;
  }
  
  h2 {
    color: #6b4423; /* Dark brown */
    margin-bottom: 15px;
  }
  
  .items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .item-card {
    background-color: #ffffff; /* White */
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
    color: #6b4423; /* Dark brown */
    margin-bottom: 10px;
  }
  
  .item-price {
    color: #555; /* Dark gray */
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  
  .quantity-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .quantity-button {
    background-color: #c49a6c; /* Mustard */
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .quantity-button:hover {
    background-color: #6b4423; /* Dark brown */
  }
  
  .add-to-cart-button {
    background-color: #6b4423; /* Dark brown */
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-to-cart-button:hover {
    background-color: #ff8400; /* Darker brown */
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

.edit-icon {
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
.add-category-form,
.edit-category-form,
.add-item-form,
.edit-item-form {
  background-color: #ffffff; /* White */
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
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

</style>