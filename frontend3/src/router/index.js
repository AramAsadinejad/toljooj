import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router methods
import Home from '@/components/Home.vue'; // Example component
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import Restaurants from '@/components/Restaurants.vue';
import Profile from '@/components/Profile.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import Orders from '@/components/Orders.vue';
import Items from '@/components/Items.vue';
import ManagerRestaurants from '@/components/ManagerRestaurants.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:'/signup',
    name:'signup',
    component: Signup,
  },
  {
    path:'/login',
    name:'login',
    component: Login,
  },
  {
    path:'/restaurants',
    name:'restaurants',
    component: Restaurants,
  },
  {
    path:'/profile',
    name:'profile',
    component: Profile,
  },
  {
    path:'/shoppingcart',
    name:'shoppingcart',
    component: ShoppingCart,
  },
  {
    path:'/orders',
    name:'orders',
    component: Orders,
  },
  {
    path:'/items',
    name:'items',
    component: Items,
  },
  {
    path:'/managerrestaurants',
    name:'managerrestaurants',
    component: ManagerRestaurants,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Export the router instance


