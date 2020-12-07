<template>
  <div class="home">
    <div class="background">
      <img src="../assets/background.svg" alt="">
    </div>
    <nav>
      <ul>
        <li class="logo">
          <h1>Ga<span>lio</span></h1>
        </li>
        <li v-if="!isAboutPage" @click="isAboutPage = !isAboutPage">About</li>
        <li v-else @click="isAboutPage = !isAboutPage">Home</li>
        <li><router-link to="/login">Login</router-link> </li>
      </ul>
    </nav>
    <main>
      
      
        <h1>
        web <span> gallery</span>
      </h1>
      
      <p v-if="isAboutPage" >Galio is web App where you can put your picture into an albums. <br>
      You can keep your albums private or you can make it public so people can see it</p>
      <p v-else>capture your best moment, create album  <br>
          and save it online 
      </p>
      <button class="btn"> <router-link to="/login">Get started</router-link></button>
      
    </main>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  data() {
    return {
      isAboutPage : false
    }
  }
  
}
</script>

<style scoped src="../../public/sass/home.scss" lang="scss">


</style>
