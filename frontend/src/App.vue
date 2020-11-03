<template>
  <div id="nav" v-if="checkRoute">
    <Navbar/>
  </div>
  
  <router-view/>
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
  }
}
</script>


<style lang="scss">


@import '../public/sass/variable.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


</style>
