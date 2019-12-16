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
import PageNotFound from "./views/pageNotFound.vue";
import adminManage from "./views/adminManage.vue"
import about from "./views/about.vue"
import contact from "./views/contact.vue"

Vue.use(Router);

export default new Router({
 
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

    { path: "*", component: PageNotFound },

    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path:"/about",
      name:"about",
      component:about
    },
    {
      path:"/contact",
      name:"contact",
      component:contact
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
        path:"/adminManage",
        name:"adminManage",
        component:adminManage
      },
 

  ]

});
