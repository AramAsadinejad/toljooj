import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router methods
import Home from '@/components/Home.vue'; // Example component
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';
import Restaurants from '@/components/Restaurants.vue';
import Profile from '@/components/Profile.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Export the router instance


