// import * as firebase from 'firebase'
// import 'firebase/firestore'

// const config = {
//     apiKey: "AIzaSyBvR2FNwDEhOV81-1AlBngGh1N2jNa8qY4",
//     authDomain: "grossstore-cdaba.firebaseapp.com",
//     databaseURL: "https://grossstore-cdaba.firebaseio.com",
//     projectId: "grossstore-cdaba",
//     storageBucket: "grossstore-cdaba.appspot.com",
//     messagingSenderId: "823385709986",
//     appId: "1:823385709986:web:8763f72124c264bf7b66fb",
//     measurementId: "G-SGWKERWJ1W"
//   }
  
//  firebase.initializeApp(config)

//   export function firebaseListener(func) {
//     firebase.auth().onAuthStateChanged(function(user) {
//       if (user) {
//         // console.log("User log in success", user);
//         this.$store.dispatch('autoSignIn', user)
//       } else {
//         // console.log("User log in failed", user);
//         func(false)
//       }
//     }, function(error) {
//       console.log(error)
//     });
//   }

//    const db = firebase.database()
//   export const firebaseAuth = firebase.auth
 
//   export default db


