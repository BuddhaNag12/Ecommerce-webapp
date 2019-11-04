import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import product from "./views/products.vue";
import categories from "./views/categories.vue";
import moreitems from "./views/moreitems.vue";
import login from "./views/login.vue";
import signup from "./views/signup.vue";
import profile from "./views/myprofile.vue";
import cart from "./views/cart.vue";
import adminlogin from "./views/admin.vue"
import adminManage from "./views/adminManage.vue"
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    
      {
        path: "/product/:id",
        name: "product",
        props: true,
        component: product
      },
      {
        path: "/categories",
        name: "categories",
        component:categories
      },
       {
      path: "/moreitems/:cat",
      name:"moreitems",
      props:true,
      component:moreitems
       },
       {
         path:"/login",
        name:"login",
        component:login
       },
       {
        path:"/signup",
       name:"signup",
       component:signup
      },

      {
        path:"/profile",
        name:"profile",
        component:profile
      },
      {
        path:"/cart",
        name:"cart",
        component:cart
      },
      {
        path:"/adminlogin",
        name:"adminlogin",
        component:adminlogin
      },
      
      {
        path:"/adminManage",
        name:"adminManage",
        component:adminManage
      },
 

  ]
});
