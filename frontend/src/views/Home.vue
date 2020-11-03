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
        <li>About</li>
        <li><router-link to="/login">Login</router-link> </li>
      </ul>
    </nav>
    <main>
      <h1>
        web <span> gallery</span>
      </h1>
      <p>capture your best moment, create album  <br>
          and save it online 
      </p>
      <button class="btn">Get started</button>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  
  
}
</script>

<style scoped src="../../public/sass/home.scss" lang="scss">


</style>
