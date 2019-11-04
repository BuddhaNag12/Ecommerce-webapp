<template>
  <v-container>
       <v-layout row wrap >
         
           <v-flex xs12 sm8 md3 lg4  v-for="products in catProducts" :key="products.id"  >
          <v-card
          class="mx-auto ma-4" 
            max-width="344"
            tile
            hover
          
          >
            <v-avatar size="150" class="grey lighten-2 ">
            <img :src="products.imageUrl" alt="avatar" width="400" >
         </v-avatar>
         <v-card-text >
           <div class="text-center">
          {{products.name}}
           </div>
            <div class="text--primary">
        Rs.{{products.price}}/-.<br>
              </div>
      <div class="text--secondary">
        Description:<br>{{products.description}}
              </div>

         </v-card-text>
       <v-card-actions>
        <v-btn
        text
        color="deep-purple accent-4"
         @click.native="addProductToCart(products)"
      >
        Add to cart
      </v-btn>
    <v-spacer></v-spacer>

        <v-btn
        text
        color="blue accent-4"
      >
       buy now
      </v-btn>
 
    </v-card-actions>
          </v-card>
           </v-flex>
       </v-layout>
  </v-container>
</template>


<script>
import { mapActions,mapGetters } from 'vuex';
  export default {
    props:['cat'],
      data:()=>({  
    }),
     computed: {
  
      catProducts () {
        return this.$store.getters.getSelectedCat(this.cat)
      }, 
       ...mapGetters([
      'getSelectedCat',
    ]),
    },

      methods:{
       ...mapActions([
      'addProduct',
      'currentProduct',
          ]),

    addProductToCart(product) {
      this.addProduct(product)
    },
    addCurrentProduct(product) {
      this.currentProduct(product)
    },
     
    }
  }
</script>