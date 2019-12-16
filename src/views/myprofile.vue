    <template>
  <v-container fluid   >
   
    <v-row>
   
      <v-col cols="12">
      <v-row   align="center"
          justify="center"
          class="grey lighten-5"
         >
    <h4 class="black--text text-sm-left font-weight-light ">
     Your account
    </h4>
      </v-row>
        <v-row
          align="center"
          justify="center"
          class="grey lighten-5"
          style="height: 300px;"
        >
    
          <v-card
            v-for="n in options"
            :key="n.type"
            class="ma-3 pa-6"
            tile
            hover
            :to="n.path"
          >
          <v-icon>{{n.icon}}</v-icon>
          <v-card-text>
        {{n.title}}
          </v-card-text>
           
          </v-card>
        </v-row>
      </v-col>
     
    </v-row>
  </v-container>
</template>

<script>
import { mapActions,mapMutations,mapGetters } from 'vuex';
export default {

    data:()=>({
        options:[
          {type:"editProfile",icon:"mdi-account-edit",path:"/editProdile",title:"Edit Account Details"},
          {type:"viewOrders",icon:"mdi-airplane-takeoff",path:"/orders",title:"View Order Details"}
        ]
    }),
     methods: {
      onLogout () {
        this.$store.dispatch('logout')
          this.$router.push('/login')
      }
    }
}
</script>