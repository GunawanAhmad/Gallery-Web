<template>
  <nav>
      <div class="logo">
          <router-link to="/">
            <h1>Ga<span>lio</span></h1>
          </router-link>
          
      </div>
      <ul class="nav__ul">
          <li class="nav__list search" >
              <input type="text" ref="searchInput">
              <span class="search__logo" @click="showSearchInput" ref="searchLogo">
                  <i class="fas fa-search"></i>
              </span>
              
          </li>
          <li class="nav__list">Gunawan Nur Ahmad</li>
          <li class="img-profile nav__list">
              <div class="img" @click="showMenu"></div>
              <ul class="menu__list" ref="menuList">
                  <li>Your profile</li>
                  <li>Setting</li>
                  <li>Log out</li>
              </ul>
          </li>
      </ul>
     
  </nav>
</template>

<script>
export default {
    methods : {
        showMenu() {
            this.$refs.menuList.classList.toggle('show')
        },
        showSearchInput() {
            console.log('search')
            this.$refs.searchInput.classList.toggle('show')
            this.$refs.searchLogo.classList.toggle('show')
        }
    }

}
</script>

<style scoped src="../../public/sass/navbar.scss" lang="scss">

</style>