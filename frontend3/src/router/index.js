// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Home from '@/components/Home.vue';
// // import SignUp from '@/views/SignUp.vue';
// // import SignIn from '@/views/SignIn.vue';

// Vue.use(VueRouter);

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//   },
// //   {
// //     path: '/signup',
// //     name: 'SignUp',
// //     component: SignUp,
// //   },
// //   {
// //     path: '/signin',
// //     name: 'SignIn',
// //     component: SignIn,
// //   },
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router methods
import Home from '@/components/Home.vue'; // Example component
import Signup from '@/components/Signup.vue';
import Login from '@/components/Login.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Export the router instance


