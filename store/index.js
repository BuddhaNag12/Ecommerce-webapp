import Vue from 'vue'
import Vuex from 'vuex'
import firebase, { firestore } from 'firebase/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProducts: [],
    user: null,
    users:[],
    admin:[],
    loading: false,
    error: null,
    cartProducts: [],
    currentProduct: {},
  },
  mutations: {
    setLoadedProducts (state, payload) {
      state.loadedProducts = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setAdmin(state,payload){
      state.admin=payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    ADD_PRODUCT: (state, product) => {
        state.cartProducts.push(product)
      },
      addUsers:(state,users)=>{
        state.users.push(users)
      },
      REMOVE_PRODUCT: (state, index) => {
        state.cartProducts.splice(index, 1)
    },
      CURRENT_PRODUCT: (state, product) => {
        state.currentProduct = product;
      }, 
      addProduct:(state,payload)=>{
        state.loadedProducts.push(payload)
      } 
  },
  actions: {
    loadProducts ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('products').once('value')
        .then((data) => {
          const products = []
          const obj = data.val()
          for (let key in obj) {
            products.push({
              id: key,
              name: obj[key].name,
              cat:obj[key].cat,
              price:obj[key].price,
              description: obj[key].description,
              quantity:obj[key].quantity,
              imageUrl: obj[key].imgURL,
            })
          }
          commit('setLoadedProducts', products)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },


    addProducts ({commit}, payload) {
      const products = {
        name: payload.name,
        price: payload.price,
        description: payload.description,
        cat:payload.cat,
        brand: payload.brand,
        imgURL:payload.image,
        key:payload.key,
        quantity:payload.quantity
      }
      firebase.database().ref('products').push(products)   
        .then(() => {
          commit('addProduct',products)
        })
        .catch((error) => {
          console.log(error)
        })
      },
      addUser({commit},payload){
        commit('setLoading',true)
        commit('clearError')
        const users={
          name:payload.name,
          email:payload.email,
          password:payload.password,
          phone:payload.phone
        }
        firebase.database().ref('users').push(users).then(()=>{
          commit('addUsers',users)
        }).catch((error) => {
          console.log(error)
        })
      },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    adminCheck({commit},payload){
      commit('setLoading', true)
      commit('clearError')
      firebase.database().ref('admin').once('value').then((data)=>{
        const users = []
        users.push({
        username:data.username,
        password:data.password
        })
        commit('setAdmin', users)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },

    addProduct: (context, product) => {
        context.commit('ADD_PRODUCT', product);
       
      },
      removeProduct: (context, index) => {
        context.commit('REMOVE_PRODUCT', index);

      },
      currentProduct: (context, product) => {
        context.commit('CURRENT_PRODUCT', product);
      },


  },
  getters: {
    loadedProducts (state) {
      return state.loadedProducts.sort((productA, productB) => {
        return productA.price > productB.price
      })
    },
    featuredProducts (state, getters) {
      return getters.loadedProducts.slice(0, 5)
    },
    loadedProduct (state) {
      return (productId) => {
        return state.loadedProducts.find((product) => {
          return product.id === productId
        })
      }
    },
    getSelectedCat: (state) => (Cat) => {
      return state.loadedProducts
        .filter(o => o.cat === Cat)
    },
    user (state) {
      return state.user
    },
    admin(state){
      return state.admin
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    getProductsInCart: state => state.cartProducts,
 
  }
})