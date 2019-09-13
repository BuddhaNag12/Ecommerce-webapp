import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProducts: [
        {id:"1",name:'cap',price:'800',avatar:'/assets/cap.jpg'},
        {id:"2",name:'t-shirt',price:'700',avatar:'/assets/tshirt.jpg'},
        {id:"3",name:'shirt',price:'820',avatar:'/assets/shirts.jpg'},
        {id:"4",name:'trackpant',price:'1400',avatar:'/assets/trackpant.jpg'},
      ]
   
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

      searchProduct (state) {
        return (productId) => {
          return state.loadedProducts.find((product) => {
            return product.id === productId
          })
        }
      },
    user (state) {
      return state.user
    }
  }
})
