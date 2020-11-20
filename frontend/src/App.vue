<template>
  <div id="nav" v-if="checkRoute">
    <Navbar/>
  </div>
  <router-view/>
  <div class="container-loader hide" ref="loader">
      <div class="circle-con">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  computed : {
    checkRoute() {
      if (this.$route.path === '/login' || this.$route.path === '/') {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    console.log(this.$route.path)
    this.$store.state.loadingScreen = this.$refs.loader;
  }
}
</script>


<style src="../public/sass/app.scss" lang="scss">


</style>
