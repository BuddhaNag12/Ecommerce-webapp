<template>
    <v-footer  height="auto"   elevation="5" padless tile> 
      <v-card flat tile color="#424242" class=" lighten-1 white--text text-center flex">
        <v-card-text class="">
          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="20px">{{icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text">
          Ecom Store All right reserved
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          &copy;2019 - <strong>Ecom Store</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
        'mdi-facebook ',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram'
      ]
    })
}
</script>

<style>

</style>