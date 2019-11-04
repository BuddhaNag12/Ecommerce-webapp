<template>
       <v-layout row wrap>
             <v-card
    class="mx-auto"
 
    tile
  >
         <v-list flat>
      <v-subheader class="justify-center"  v-if="numberOfItems>=1">Items in the cart</v-subheader>
      <v-subheader class="justify-center"  v-if="numberOfItems<=0">cart is empty</v-subheader>
        <v-list-item
        v-for="(product, index) in getProductsInCart" :key="index">
      
          <v-list-item-icon>
            <v-img :src="product.imageUrl" max-width="200px"></v-img>
          </v-list-item-icon>
    
          <v-list-item-content>
                 <v-divider></v-divider>
                      <v-list-item-title v-text="product.name"></v-list-item-title>
                      <v-btn @click="remove(index)" color="red" rounded>x</v-btn>
          </v-list-item-content>
        </v-list-item>
    </v-list>
      <div class="subheading"  v-if="hasProduct()">   Total: Rs. {{ totalPrice() }}, 00</div>
     </v-card>
       </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
  },
  data: () => ({
    numberOfItems:0
  }),
  methods: {
    ...mapActions([
      'removeProduct',
    ]),
    hasProduct() {
      this.numberOfItems= this.getProductsInCart.length
      return this.getProductsInCart.length > 0;
    },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
  },
};
</script>
