<template>
        <div class="heading">
            profile
      
        </div>
</template>


<script>
export default {
     methods: {
      onLogout () {
        this.$store.dispatch('logout')
          this.$router.push('/login')
      }
    }
}
</script>