<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg6>

        <v-card flat >
            <v-avatar size="400" class="grey lighten-2 ">
            <img :src="products.imageUrl" alt="avatar" width="400" >
         </v-avatar>
        
        </v-card>

      </v-flex>
      <v-flex lg6 class="pl-2 mx-auto "  >
        <v-card flat>
         
        <v-card-actions >
          <div class="text-lg-left pa-2 text-sm-center">
         <v-btn text   to="/" class="font-weight-light back-btn " tile>Back to shop</v-btn>  
          </div>
      </v-card-actions>
          <v-card-text>
            <div class="font-weight-bold text-uppercase display-4">{{products.name}}</div>
            <div class="heading red--text text-lg-left display-2 text-sm-center">Rs.{{products.price}}/-</div>
          </v-card-text>
          <v-card-text>
               <v-container id="dropDown">
    <v-row>
      <v-col cols="12" sm="4">
        <p>Pack</p>

        <v-overflow-btn
          class="my-2"
          
          label="Overflow Btn"
          target="#dropDown"
        ></v-overflow-btn>
      </v-col>
         <v-col cols="12" sm="4">
        <p>Quantity</p>

        <v-overflow-btn
          class="my-2"
         
          :items="quantity"
          label="Quantity"
          target="#dropDown"
          item-value="text"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </v-container>
          </v-card-text>
             <div >
            <v-simple-table dense>
        <template v-slot:default>
      <thead>
        <tr>
          <th >Pack</th>
          <th >Description</th>
      
        </tr>
      </thead>
      <tbody>
        <tr >
          <td class="text-left">{{ products.quantity }} Pices left</td>
          <td class="text-left">{{ products.description }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
     </div>
          <v-card-actions>
         
          <v-btn class="ma-2" color="blue" outlined   tile @click="loader = 'loading'" @click.native="addProductToCart(products)" :loading="loading" >Add to cart</v-btn>
             <v-spacer></v-spacer>
            <v-btn class="ma-2" outlined color="success" tile text>Buy now</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
import firebase from 'firebase/app'
  export default {
        
       data: () => ({
         loader: null,
        loading: false,
      
      quantity: [
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
      ],
    }),
      watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 1000)

        this.loader = null
      },
    },
    props: ['id'],
    
    computed: {
      products () {
        return this.$store.getters.loadedProduct(this.id)
     
      },
      ...mapGetters([
      'getProductsInCart',
    ]),
      
    },

      created(){
        firebase.auth().currentUser.uid.get()
    },
     methods:{
       ...mapActions([
      'addProduct',
      'currentProduct',
    ]),
  
    addProductToCart(product) {
      this.addProduct(product).then(() => {
          this.loading=true
        })
    },
  
     },
       
  }
</script>

<style  scoped>
.back-btn{
  border-bottom :1px solid black;
}



  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
