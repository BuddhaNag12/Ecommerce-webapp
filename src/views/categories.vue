<template>
<div > 

        <div class="categories">
            <v-container>
         
                  
              <v-sheet color="success" class="white--text font-italic font-weight-medium" elevation="3">Collections</v-sheet>
      
                <v-col cols="md12 sm12" >
                  <v-row justify="space-around" >
                    <v-hover v-slot:default="{ hover }" v-for="item in categories" :key="item.name"  class="mx-2 mt-2">
                 <v-card link  hover  :to="'/moreitems/'+item.name">
               <v-avatar color="grey" size="200" tile >
                  <v-img
              :src="item.img"
                 alt=""
                 class="cat-img"  
                 gradient  
                 width="350" 
             >
               <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-4 v-card--reveal display-1 white--text text--lighten-4"
            style="height: 100%;"
          >
           {{item.title}}
          </div>
        </v-expand-transition>
             </v-img>
              
     </v-avatar>

 </v-card> 
 </v-hover>
</v-row>
 </v-col>
 </v-container>
        </div>

</div>
 
</template>


<script>
  export default {
    data: () => ({
     
     categories:[
       {name:"Footwear",title:'Foot Wear' ,img:'assets/Footwear/shoes.jpg', },
       {name:"Trousers",title:'Formals & Trousers' ,img:'assets/trousers/pents.jpg', },
        {name:"Shirts",title:'Shirts / Tshirts' ,img:'assets/tshirts/shirt.jpg', },
        {name:"Winter",title:'Winter wear' ,img:'assets/winterwear/winter.jpg', },
     ]
    }),

  }
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>