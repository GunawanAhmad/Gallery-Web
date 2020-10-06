<template>
<div class="app">
  <nav class="navbar">
      <div class="logo">
          <router-link to="/">
            <h1>Ga<span class="flip">L</span><span>Leri</span></h1>
          </router-link>
          
      </div>
      <div class="nav__list">
          <ul>
              <li><router-link to="/">Sign Up</router-link> </li>
              <li><router-link to="/about">About</router-link> </li>
          </ul>
      </div>
  </nav>
  <div class="img">
      <img src="../../public/img/login.svg" alt="">
  </div>
  <div class="form__container">
    <form class="form">
      <div class="intro">
          <p>Welcome !</p>
          <p>Sign in to your account</p>
      </div>
      <div class="username">
          <label for="username">Username</label>
          <div class="input">
              <i class="fas fa-user"></i>
              <input type="text"  name="username" autocomplete="off">
          </div>
          
      </div>
      <div class="password">
          <label for="password">Password</label>
          <div class="input">
              <i class="fas fa-unlock-alt"></i>
              <input type="password"  name="password" autocomplete="off">
          </div>
          
      </div>
      <div class="forgot__pass">
          <router-link to="/">Forgot Password ?</router-link>
      </div>
      <button class="login__btn">Login</button>
  </form>
  </div>
 
</div>
  
</template>

<script>
export default {
    

}
</script>

<style scoped src="../../public/css/login.css">

</style>