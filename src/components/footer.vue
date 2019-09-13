<template>
    <v-footer  height="auto"  color="indigo lighten-1" > 
      <v-card flat tile class="indigo lighten-1 white--text text-center flex">
        <v-card-text class="">
          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="20px">{{icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text>
          shopping card footer text here.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          &copy;2019 - <strong>ShoppingCard</strong>
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