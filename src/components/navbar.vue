<template>
           
            
  <nav >
    <v-card >
    <v-app-bar color="#845EC2" 
      app
    >
   <v-app-bar-nav-icon   @click.stop="drawer = !drawer" class="hidden-md-and-up" ></v-app-bar-nav-icon>
     <v-container light fluid >
         <v-row>
            <v-col cols="5" >
      <v-toolbar-title class=" white--text hidden-sm-and-down">Gros Store</v-toolbar-title>  
      <v-toolbar-title class=" white--text hidden-md-and-up ">GS</v-toolbar-title>  
            </v-col>
            <v-col cols="4" >
           <v-toolbar-items class="hidden-sm-and-down " >
          <v-btn tile text append :to="'/'"  color="white" >Home</v-btn>
          <v-btn tile text append :to="'/categories'" color="white" >Categories</v-btn>
          <v-btn tile text append  color="white">Contact Us</v-btn>
          <v-btn tile text append  color="white"> About</v-btn>
        </v-toolbar-items>
            </v-col>
         </v-row>
     </v-container>
  
<v-layout class="ma-2 pt-2 pl-2">
      <v-menu offset-y transition="scroll-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
        >
         <v-icon  color="white ">mdi-account-circle</v-icon>
        </v-btn>
      </template>
        <v-list rounded>
              <v-list-item v-for="mitems in menuItems" :key="mitems.title" >
                    <v-btn text :to="mitems.route" ><v-icon>{{mitems.icon}}</v-icon>{{mitems.title}}</v-btn>
              </v-list-item>
                <v-list-item v-if="userIsAuthenticated">
                  <v-btn @click="onLogout" text> <v-icon>mdi-logout</v-icon> Logout</v-btn>
                </v-list-item>
             </v-list>         
</v-menu>
</v-layout>
<v-layout class=" pt-4  pr-2">

            <v-menu  offset-y transition="scroll-y-transition" :close-on-content-click="closeOnContentClick" class="pr-1">
            
  <template v-slot:activator="{ on }">
        <v-badge  color="cyan"  overlap left >
        <template v-slot:badge >
          <span v-if="numberOfItems>0">{{ numberOfItems }}</span>
        </template>
        <v-btn  icon  color="red" v-on="on" >
          <v-icon right class="theme--light pb-2 " color="white">mdi-cart</v-icon>
        </v-btn>
        </v-badge>
         </template>
       <v-card  max-width="400px">
           <v-list   >
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
     </v-menu>
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
      temporary
      bottom
    >
    <v-list>
        <v-list-item>
        <v-list-item-content>
          <v-list-item-title>More Options</v-list-item-title>
        </v-list-item-content>
           <v-spacer></v-spacer>
        <v-icon  @click.stop="drawer = !drawer">mdi-close</v-icon>
      </v-list-item>
    </v-list>
      <v-divider></v-divider>
      <v-list dense  >
          <v-list-item-group  color="primary">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link>
     <div class="px-2">
     <v-btn :to="item.route"  text block> 
               <v-list-item-icon>
             <v-icon v-text="item.icon "  > </v-icon>  
          </v-list-item-icon>
                {{item.title}}</v-btn>
     </div>
   
     
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
           {icon: 'mdi-account', title: 'Admin login', route: '/adminLogin', },
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
      return this.getProductsInCart.length > 0;
      
    },
    matchProduct(id){
    //  if(this.getProductsInCart.id==this.id){
    //    return numberOfproducts++
    //  }
 
     
    },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    remove(index) {
    
      this.removeProduct(index);
    },



    }

  }
</script>
