<template>
        <div class="categories">
            <v-container>
              <v-sheet color="blue" class="text-center white--text ">Collections  </v-sheet>
                <v-col cols="md6 sm12" >
                  <v-row justify="space-between"  >
                    
                         
                 <v-card link  hover  v-for="item in categories" :key="item.name" :to="'/moreitems/'+item.name">
               <v-avatar color="grey" size="150" tile>
             <img
              :src="item.img"
                 alt=""
             >
        <v-card-text class="cardtext">
        <h2 class="heading  white--text text-uppercase ">{{item.title}}</h2>
        </v-card-text>
     </v-avatar>
 </v-card> 
</v-row>
 </v-col>
 </v-container>
        </div>
</template>


<script>
  export default {
    data: () => ({
     
     categories:[
       {name:"fastFood",title:'Snacks' ,img:'assets/snacks/maggi.jpg', },
       {name:"cleaning",title:'Cleaning & household' ,img:'assets/cleaning/cleaning.jpg', },
       {name:"daily",title:'Daily staples' ,img:'assets/daily/daily.jpg', },
       {name:"beauty",title:'Beauty and hygine',img:'assets/snacks/maggi.jpg', },
       {name:"bb",title:'Baby store' , img:'assets/snacks/maggi.jpg', },
     ]
    }),

  }
</script>

<style scoped>
.cardtext{
    position:absolute;
    font-size: 15px;
    font-style:normal;
    font: caption;
}

</style>