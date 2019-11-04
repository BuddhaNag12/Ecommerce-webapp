<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
                <div class="heading">Admin Login</div>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      :value="admin.username"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      :value="admin.password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                  >
                      Sign in
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

  
</template>


<script>
import firebase from "firebase/app"
  export default {
    data () {
      return {
        email: '',
        password: '',
        Admin:[]
      }
    },
    created(){
       firebase.database().ref('admin').once('value').then((data)=>{ 
         const admin=[]
        this.admin.push({
        username:data.username,
        password:data.password
        })
        
      })
    },
    // computed: {
    //   admin () {
    //     return this.$store.getters.admin
    //   },
      
    // },
  
    methods: {
      onSignin () {
       if(this.email==this.admin.username && this.password==this.admin.password)
       {
          this.$router.push('/adminManage')
       }
      }
    },
   
  }
</script>