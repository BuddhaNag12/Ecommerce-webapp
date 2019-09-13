<template>
  <v-app class="grey lighten-4">
   
    <navbar />
      
    <v-content>
      <router-view class="text-center my-10 display-2 blue--text"></router-view>
   
    </v-content>
   <footers />
  </v-app>

</template>

<script>
import navbar from "./components/navbar";
import footers from "./components/footer";

export default {
  name: "App",
  components: { navbar,footers},
};
</script>
