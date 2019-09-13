
<template>
<div class="contents">


  <template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
    >
      <v-btn small flat color="grey" class="mx-2" @click="sortBy('price')" v-on="on">
  
   <v-icon left small >mdi-men</v-icon>
   <span class="caption text-lowercase white--text">
     by project person
   </span>
 </v-btn>
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
    <template>
        <v-container>
          <v-row>
            <v-col>
    <v-carousel height="350px"  cycle  hide-delimiter-background
    show-arrows-on-hover>
    <v-carousel-item
      v-for="item in featureProducts"
      :key="item.price"
      :src="item.avatar"
      reverse-transition="fade-transition"
      transition="fade-transition"
      contain 
      class="grey darken-4"
    >
    <h1 class="my-10 pa-10 text-center">{{item.name}}</h1>
    </v-carousel-item>
  </v-carousel>
            </v-col>
    </v-row>
       
  </v-container>
</template>

<template>
  <h1 class="headline">Top picks</h1>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
     <v-col cols="lg12" v-for="items in products" :key="items.price">
        <v-card   class="ma-3 text-xs-center" >
             <v-responsive class="pt-4">
                 <v-avatar size="200" class="grey lighten-2">
                     <img :src="items.avatar" alt="avatar">
                 </v-avatar>
                    </v-responsive>
                     <v-card-text>
                        <div class="subheading">
                            {{items.name}}
                        </div>
                        <div class="grey--text">
                            {{items.price}}
                        </div>
                    </v-card-text>
        </v-card>
     </v-col>
    </v-row>
  </v-container>
</template>
  <v-container class="my-5" id="man">
<h2 >man</h2>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="product in products " :key="product.price">       
                <v-card 
                    class="ma-3 text-xs-center"  >
                    <v-responsive class="pt-4">
                 <v-avatar size="200" class="grey lighten-2">
                     <img :src="product.avatar" alt="avatar">
                 </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{product.name}}
                        </div>
                        <div class="grey--text">
                            {{product.price}}
                        </div>
                    </v-card-text>
                            <v-card-actions>
            <v-btn text  color="grey" flat>
                <v-icon small center>
                      mdi-product
                </v-icon >
                <span>buy</span>
                </v-btn>
                    <v-spacer></v-spacer>
                  <v-btn text  color="grey" flat  :to="'/product/'+product.id">
                <v-icon small center>
                      mdi-eye
                </v-icon >
                <span>view</span>
                </v-btn>
            </v-card-actions>
             </v-card>
            </v-flex>
        </v-layout>
  </v-container>
  <v-container class="my-5" id="women">
  
<h2 >women</h2>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4 lg3 v-for="product in products " :key="product.price">
                <v-card 
                    class="ma-3 text-xs-center"  >
                    <v-responsive class="pt-4">
                 <v-avatar size="200" class="grey lighten-2">
                     <img :src="product.avatar" alt="avatar">
                 </v-avatar>
                    </v-responsive>
                    <v-card-text>
                        <div class="subheading">
                            {{product.name}}
                        </div>
                        <div class="grey--text">
                            {{product.price}}
                        </div>
                    </v-card-text>
                            <v-card-actions>
            <v-btn text  color="grey" flat >
                <v-icon small center>
                      mdi-product
                </v-icon >
                <span>buy</span>
                </v-btn>
                   <v-spacer></v-spacer>
                  <v-btn text  color="grey" flat :to="'/product/'+product.id" >
                <v-icon small center>
                      mdi-eye
                </v-icon >
                <span>view</span>
                </v-btn>
            </v-card-actions>
             </v-card>
            </v-flex>
        </v-layout>

  </v-container>

</div>
</template>

<script>
import { METHODS } from 'http';
export default {
  computed: {

    featureProducts(){
      return this.$store.getters.featuredProducts
    },
      products () {
        return this.$store.getters.loadedProducts
      }
    },
    methods:{
      sortBy(param){
          this.women.sort((a,b)=>a[param]<b[param] ? -1:1)
      },
        
     }
}
</script>