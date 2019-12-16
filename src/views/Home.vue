<template>
<div class="homeContent">
        <v-container>
          <v-row>
            <v-col class="col-lg-12 col-sm-12">
              <v-card>
            <v-carousel 
            height="350px"     
      cycle 
     hide-delimiter-background
   >
      <v-carousel-item
      v-for="item in customeProducts"
      :key="item.id"
      :src="item.imageUrl"
      reverse-transition="fade-transition"
      transition="fade-transition"
      class="grey darken-4"
      
    >

    </v-carousel-item>
 
  </v-carousel>
              </v-card>
       </v-col>
    
      
    </v-row>
    <v-row>
       <v-col>
         <v-card >
              <v-icon color="orange" size="50" class="ma-3">
             mdi-truck-delivery
           </v-icon>
              <v-card-text>
                  <h4>Free Delivery</h4>
                  <h5>on order above 1000/-</h5>
              </v-card-text>
            
         </v-card>
       </v-col>
        <v-col>
         <v-card>
            <v-icon color="red" size="50" class="ma-3">
             mdi-forum
           </v-icon>
           <v-card-text>
              <h4>Dedicated support</h4>
             <h5>Live chat on Discord</h5>
           </v-card-text>
         </v-card>
       </v-col>
        <v-col>
         <v-card >
           <v-icon color="blue" size="50" class="ma-3">
             mdi-cart-arrow-down
           </v-icon>
           <v-card-text>
             <h4 >Secure</h4>
              <h5>Payment through shopify</h5>
           </v-card-text>
         </v-card>
       </v-col>
    </v-row>
  </v-container>
  
 <v-container>
      <h4 class=" font-weight-light text-sm-center " >All new latest</h4>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="product in Allproducts " :key="product.id" >
                <v-card 
                    class="ma-3 text-xs-center" hover >
                    <v-responsive class="pt-4">
               <v-avatar  size="200" >
         <img  :src="product.imageUrl" alt="avatar"   >
               </v-avatar>
                  
               
                    </v-responsive>
                    <v-card-text >
                        <div class="subheading">
                            {{product.name}}
                        </div>
                        <div class="grey--text">
                            {{product.price}}
                        </div>
                    </v-card-text>
                    
                    <v-card-actions>
            <v-btn link   :to="'/product/'+product.id" text>
                <v-icon small center>
                      mdi-eye
                </v-icon >
                <span>View</span>
                </v-btn>
                   <v-spacer></v-spacer>
        
       <v-btn link  text @click.native="addProductToCart(product)">
                <v-icon small center >
                      mdi-cart
                </v-icon >
                <span>add to cart</span>
                </v-btn>
            </v-card-actions>
             </v-card>
            </v-flex>
        </v-layout>
        </v-container>

      <v-slide-group
        class="pa-2 "
        :prev-icon="prevIcon ? 'mdi-minus' : undefined"
        :next-icon="nextIcon ? 'mdi-plus' : undefined"
      >
        <v-slide-item
         v-for="product in Allproducts " :key="product.id"
          v-slot:default="{ active, toggle }"  
        >
         <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        class="mx-auto pa-3"
        max-width="200"
      >
      <v-responsive>
        <v-avatar tile>
          <v-img :src="product.imageUrl"></v-img>
        </v-avatar>
      </v-responsive>
        <v-card-text>
          <h2 class="title primary--text">{{product.name}}</h2>
          
        </v-card-text>
        <v-card-title>
          <v-rating
            :value="4"
            dense
            color="orange"
            background-color="orange"
            hover
            class="mr-2"
          ></v-rating>
          <span class="primary--text subtitle-2">64 Reviews</span>
        </v-card-title>
        <v-scale-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="grey"
            :opacity="opacity">
            <v-btn  @click.native="addProductToCart(product)" fab  dark small color="primary">
              <v-icon>mdi-cart</v-icon>
              </v-btn >
                <v-btn :to="'/product/'+product.id" fab  dark small color="info">
              <v-icon>mdi-eye</v-icon>
           </v-btn>
          </v-overlay>
        </v-scale-transition>
      </v-card>
    </template>
  </v-hover> 
        </v-slide-item>
      </v-slide-group>
 
</div>

</template>

<script>
import { METHODS } from 'http';
import { mapActions,mapMutations,mapGetters } from 'vuex';
import firebase from "../firebase"
import {db} from "../firebase";
import storage from "../firebase"

export default {

  data:()=>({
     
      model: null,
      prevIcon: false,
      nextIcon: false,
      centerActive: false,
      opacity: 0.2,
       disabled:false
       
}),
  computed: {
     ...mapGetters([
      'loadedProducts',
    ]),
       loading () {
        return this.$store.getters.loading
      },
         Allproducts(){
           return this.$store.getters.loadedProducts
          
         },
          customeProducts(){
           return this.$store.getters.featuredProducts
          
         },

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
   
    
  },

}


</script>
