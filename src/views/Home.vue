<template>
<div class="homeContent">
        <v-container>
          <v-row>
            <v-col cols="sm12 12" >
    <v-carousel height="350px"
      cycle 
     hide-delimiter-background
    show-arrows-on-hover
    delimiter-icon="mdi-minus">
    <v-carousel-item
      v-for="item in Allproducts"
      :key="item.id"
      :src="item.imageUrl"
      reverse-transition="fade-transition"
      transition="fade-transition"
      class="grey darken-4"
    >
    <h1 class="my-10 pa-10 text-center">{{item.name}}</h1>
    </v-carousel-item>
  </v-carousel>
       </v-col>
    </v-row>
  </v-container>
  
 <v-container>
      <h2 class="black--text font-weight-light" >For Fast Snacks</h2>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="product in Allproducts " :key="product.id">
                <v-card 
                    class="ma-3 text-xs-center" hover  >
                    <v-responsive class="pt-4" >
                 <v-avatar size="200" class="grey lighten-2" >
                     <img  :src="product.imageUrl" alt="avatar">
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
            <v-btn link  class="warning" :to="'/product/'+product.id">
                <v-icon small center>
                      mdi-eye
                </v-icon >
                <span>View</span>
                </v-btn>
                   <v-spacer></v-spacer>
                  <v-btn link  color="primary"  @click.native="addProductToCart(product)" >
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

<v-container >
  <v-row class="pa-3">
    <v-col >
      <v-sheet
      class="mx-auto"
     >
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
    </v-sheet>
    </v-col>
  </v-row>
</v-container>
</div>

</template>

<script>
import { METHODS } from 'http';
import { mapActions } from 'vuex';
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
      featuredProducts:[],
      imgURL:[],
      productId:"",    
}),
  computed: {
       loading () {
        return this.$store.getters.loading
      },
         Allproducts(){
           return this.$store.getters.loadedProducts
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
