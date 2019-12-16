<template>     
  <nav >
    <v-card class="overflow-hidden">
    <v-app-bar class="primary"
      app
      tile
      
    >
   <v-app-bar-nav-icon   @click.stop="drawer = !drawer" class="hidden-md-and-up" ></v-app-bar-nav-icon>
    
      <v-toolbar-title class=" white--text pa-2 ">Ecom Store</v-toolbar-title>  
      
        <v-spacer></v-spacer>
        
           <v-toolbar-items class="hidden-sm-and-down pa-2">
          <v-btn text :to="'/'"  color="white" >Home</v-btn>
          <v-btn text :to="'/categories'" color="white" >Categories</v-btn>
          <v-btn text  :to="'/contact'" color="white" >Contact Us</v-btn>
          <v-btn text :to="'/about'" color="white"> About</v-btn>
        </v-toolbar-items>
        
        <v-layout class="ma-2 d-flex justify-end">
          
        <v-menu  offset-y transition="scroll-y-transition" :close-on-content-click="closeOnContentClick" >
          
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
        >
         <v-icon  color="white ">mdi-account-circle</v-icon>
        </v-btn>
      </template>
        <v-list dense>
        
              <v-list-item v-for="mitems in menuItems" :key="mitems.title" >
                    <v-btn text :to="mitems.route" ><v-icon>{{mitems.icon}}</v-icon>{{mitems.title}}</v-btn>
              </v-list-item>
                <v-list-item v-if="userIsAuthenticated">
                  <v-btn @click="onLogout" text> <v-icon>mdi-logout</v-icon> Logout</v-btn>
                </v-list-item>
             </v-list>         
        </v-menu>
           <v-dialog v-model="dialog" scrollable max-width="300px"  :close-on-content-click="closeOnContentClick">
  <template v-slot:activator="{ on }">
        <v-badge  color="cyan"  overlap left >
        <template v-slot:badge >
          <span v-if="numberOfItems>0">{{ numberOfItems }}</span>
        </template>
        <v-btn  icon  color="red" v-on="on" >
          <v-icon right class="theme--light" color="white">mdi-cart</v-icon>
        </v-btn>
        </v-badge>
         </template>
       <v-card  max-width="400px">
           <v-list>
             <v-list-item-title >
            <v-subheader class="justify-center" v-if="numberOfItems>=1">Items in the cart</v-subheader>
            <v-subheader class="justify-center" v-if="numberOfItems<=0">The cart is Empty</v-subheader>
          </v-list-item-title >
        <v-list-item 
        v-for="(product, index) in getProductsInCart" :key="index" >
            <v-avatar >
               <v-img :src="product.imageUrl" max-width="100px"></v-img>
            </v-avatar>
          <v-list-item-content>
            <v-container>
              <v-row>
                <v-col cols="lg6" >
                <v-list-item-title v-text="product.name" class="pt-6 "></v-list-item-title>
                   <v-list-item-title  >
                       <div class=" cyan--text">
                        Rs.{{product.price}}/-
                      </div>
                  </v-list-item-title>
                </v-col>
                  <v-col cols="lg4">
                     <v-text-field type="number" name="numberOfproduct" 
                id="number"  :value="numberOfproducts"
                    style="width: 35px"
                   class=" mx-4"
                  > 
                  </v-text-field>
                  </v-col>
                  
          <v-icon @click="remove(index)" color="red">
                          mdi-delete-circle
                        </v-icon>
             
              </v-row>           
            </v-container>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
         <div class="subheading"  v-if="hasProduct()">   Total: Rs. {{ totalPrice() }},</div>
          </v-list>
         <v-btn class="primary" tile block to="/cart">View Cart</v-btn>
               </v-card>     
           </v-dialog>
    </v-layout>
  
    </v-app-bar>
    </v-card>
    <v-container class="fill-height">
      <v-row
        align="center"
        justify="center"
      >
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      app
      bottom
       color=" #43c6ac"
    >
    <v-list class="primary">
     
        <v-list-item>
        <v-list-item-content >
           <v-subheader class="white--text">More Options</v-subheader>
        </v-list-item-content>
           <v-spacer></v-spacer>
          
            <v-icon  @click.stop="drawer = !drawer" color="white">mdi-close</v-icon>
           
      </v-list-item>
    </v-list>
      <v-divider></v-divider>
      <v-list dense  >
          <v-list-item-group  color="primary">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
         
          >
     
     <v-btn :to="item.route" text block  class="d-flex justify-start"> 
     
             <v-icon v-text="item.icon " left > </v-icon>  
         
                {{item.title}}</v-btn>
             
        </v-list-item>
          </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
  export default {

    data: () => ({
        numberOfItems:0,
        numberOfproducts:0,
        previousProducts:[],
        drawer: false,
        dialog: false,
        hidden:false,
        extendedSlot: true,
         items:[
          { title: 'Home', icon: 'mdi-home' , route:'/'},
          { title: 'Categories', icon: 'mdi-currency-eth',route:'/categories' },
          { title: 'Contact us', icon: 'mdi-contact-mail', route:'/contact' },
          { title: 'About', icon: 'mdi-information-outline', route:'/about'},
      ],
         closeOnContentClick: false,
           
    
    }),

    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'mdi-key', title: 'Sign in', route: '/login', },
          {icon: 'mdi-pen', title: 'Sign up', route: '/signup',},
         
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'mdi-account', title: 'Profile', route: '/profile'},
          ]
          
        }
        return menuItems
      },
        userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        
      },

       ...mapGetters([
      'getProductsInCart',
    ]),
    },

    methods: {
       ...mapActions([
      'removeProduct',
    ]),
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      },
       hasProduct() {
      this.numberOfItems=this.getProductsInCart.length
      return this.getProductsInCart.length > 0
      
    },
   
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0)
    },
    remove(index) {
      this.removeProduct(index)
      },

     
    }

  }
</script>


