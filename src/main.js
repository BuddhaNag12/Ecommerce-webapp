import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import {store} from "../store/index.js";
import * as firebase from 'firebase'
import 'firebase/firestore'
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),

  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBvR2FNwDEhOV81-1AlBngGh1N2jNa8qY4",
      authDomain: "grossstore-cdaba.firebaseapp.com",
      databaseURL: "https://grossstore-cdaba.firebaseio.com",
      projectId: "grossstore-cdaba",
      storageBucket: "grossstore-cdaba.appspot.com",
      messagingSenderId: "823385709986",
      appId: "1:823385709986:web:8763f72124c264bf7b66fb",
      measurementId: "G-SGWKERWJ1W"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        
      }
    })
    this.$store.dispatch('loadProducts')
  }
  
}).$mount("#app");
