<template>
<div class="app">
  <nav class="navbar">
      <div class="logo">
          <router-link to="/">
            <h1>Ga<span>lio</span></h1>
          </router-link>
          
      </div>
      <div class="nav__list">
          <ul>
              <li v-if="!isSignup" @click="isSignup = true">Signup</li>
              <li v-else @click="isSignup = false">Login</li>
              <li><router-link to="/">About</router-link> </li>
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
          <p v-if="!isSignup">Sign in to your account</p>
          <p v-else>Signup for your account</p>
      </div>
      
      <div class="name form__input" v-if="isSignup">
          <label for="name">Full name</label>
          <div class="input">
              <i class="fas fa-user"></i>
              <input type="text"  name="name" autocomplete="off" v-model="name">
          </div>
          
      </div>
      <div class="username form__input">
          <label for="username">Username</label>
          <div class="input">
              <i class="fas fa-user"></i>
              <input type="text"  name="username" autocomplete="off" v-model="username">
          </div>
          
      </div>
      <div class="email form__input" v-if="isSignup">
          <label for="email">Email</label>
          <div class="input">
              <i class="fas fa-envelope"></i>
              <input type="email"  name="email" autocomplete="off" v-model="email">
          </div>
          
      </div>
      <div class="password form__input">
          <label for="password">Password</label>
          <div class="input">
              <i class="fas fa-unlock-alt"></i>
              <input type="password"  
              name="password"
              ref="passInput"
              v-model="password">    
              <div class="show__pass" @click="showPass">
                  <span v-if="password.length > 0">
                      <i class="fas fa-eye"></i>
                  </span>
              </div>
          </div>
      </div>
      <div class="retype_password form__input" v-if="isSignup">
          <label for="password">Retype Password</label>
          <div class="input">
              <i class="fas fa-unlock-alt"></i>
              <input type="password"  name="password" autocomplete="off" v-model="confirmPassword">
          </div>
      </div>


      <div class="forgot__pass">
          <router-link to="/" v-if="!isSignup">Forgot Password ?</router-link>
      </div>
      <button class="login__btn" @click="submit">{{ isSignup ? 'Signup' : 'Login' }}</button>
  </form>
  </div>
 
</div>
  
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            isSignup : false,
            username : '',
            email : '',
            password : '',
            confirmPassword : '',
            name : ''
        }
    },
    methods : {
        showPass() {

            //switch password type input so user can see what they are inputting
            let type = this.$refs.passInput.type;
            if (type === 'password') {
                this.$refs.passInput.type = 'text'
            } else {
                this.$refs.passInput.type = 'password'
            }
        },
        submit(e) {
            e.preventDefault()
            if(this.isSignup) {
                //do signup functionality
                this.$store.state.loadingScreen.classList.toggle('hide')
                axios.post('/signup', {
                    name : this.name,
                    username : this.username,
                    email : this.username,
                    password : this.password,
                    confirmPassword : this.confirmPassword
                })
                .then(res => {
                    console.log(res)
                    this.login()
                    this.$store.state.loadingScreen.classList.toggle('hide')
                    
                })
                .catch(err => {
                    console.log(err.response.data)
                    this.$store.state.loadingScreen.classList.toggle('hide')
                })
                
            } else {
                //do login functionality
                this.login()
            }
        },
        login() {
            //do login functionality
            this.$store.state.loadingScreen.classList.toggle('hide')
            axios.post('/login', {
                username : this.username,
                password : this.password
            })
            .then(res => {
                this.$store.state.loadingScreen.classList.toggle('hide')
                console.log(res)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);
                this.$router.push({path : `/${localStorage.getItem('username')}`})
            })
            .catch(err => {
                this.$store.state.loadingScreen.classList.toggle('hide')
                console.log(err)
            })
        }
              
    }  
}
</script>

<style scoped src="../../public/sass/login.scss" lang="scss">

</style>