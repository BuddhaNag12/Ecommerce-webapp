<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ products.name }}</h6>
          </v-card-title>
 
            <v-avatar size="200" class="grey lighten-2">
                     <img :src="products.avatar" alt="avatar">
                 </v-avatar>
          <v-card-text>
         
            <div>{{ products.price }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      products () {
        return this.$store.getters.searchProduct(this.id)
      }
    }
  }
</script>