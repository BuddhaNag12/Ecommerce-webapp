<template>
  <nav>
    <v-app-bar color="#F5F5F5" dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer" color="grey"></v-app-bar-nav-icon>

      <v-toolbar-title class="font-weight-bold black--text">Shopping</v-toolbar-title
      >
      <v-toolbar-title class="black--text">Cart</v-toolbar-title>
      <v-spacer></v-spacer>

  <v-badge v-model="show" color="cyan" buttom overlap >
        <template v-slot:badge >
          <span>{{ counter }}</span>
        </template>
        <v-btn flat icon class="pt-3" color="grey" >
          <v-icon right class="theme--light pb-2 px-2">mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" class="primary" app>
      <template>
        <v-card class="mx-auto" max-width="300" tile>   
  <v-expansion-panels>
    <h1 class="black--text heading text--lighten-3 text-capitalize">categories</h1>
    <v-expansion-panel
     v-for="links in links"
    :key="links.text"
    >
      <v-expansion-panel-header> 
          <v-icon v-text="links.icon">
                  
                  </v-icon>
                <h5 class="subheading grey--text justify-md-center ">{{links.text}}</h5>
                  </v-expansion-panel-header>
      <v-expansion-panel-content v-for="subcat in subcat" :key="subcat.text">
         
     <a :href="subcat.route" class="subheading v-btn v-btn--flat">{{subcat.text}}</a>
          
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> 
        </v-card>
      </template>
    </v-navigation-drawer>

  </nav>

</template>


<script>
  export default {
    data: () => ({
      counter:1,

   
        drawer: false,
      links: [
        { icon: "mdi-gender-male", text: "Women"  },
        { icon: "mdi-gender-female", text: "men"  },
         { icon: "mdi-hand", text: "Handlome" },
 
      ],
      subcat:[
    { text:"pants",route: "#women"},

    
      ]
    }),
  }
</script>
