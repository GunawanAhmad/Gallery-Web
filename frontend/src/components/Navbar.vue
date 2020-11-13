<template>
  <nav>
      <div class="logo">
          <router-link to="/">
            <h1>Ga<span>lio</span></h1>
          </router-link>
          
      </div>
      <ul class="nav__ul">
          <li class="nav__list search" >
              <input type="text" ref="searchInput" @focus="showResultBar" @focusout="showResultBar" v-model="inputSearch">
              <span class="search__logo" @click="showSearchInput" ref="searchLogo">
                  <i class="fas fa-search"></i>
              </span>
              <div class="search-result" v-show="resultShow"> 
                  <ul ref="suggestionBar" @mouseover="suggestBoxHover" @mouseout="suggestBoxHover">
                      <li v-for="(data,index) in arrSearchResult" :key="index" @click="selectSuggestion(data)">{{ data }}</li>
                  </ul>
              </div>
              
              
          </li>
          <li class="nav__list name">Gunawan</li>
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
    data() {
        return {
            resultShow : false,
            arrSearchResult : ['makan', 'ayam'],
            inputSearch : ''
        }
    },
    methods : {
        showMenu() {
            this.$refs.menuList.classList.toggle('show')
        },
        showSearchInput() {
            this.$refs.searchInput.classList.toggle('show')
            this.$refs.searchLogo.classList.toggle('show')
            this.inputSearch = ''
        },
        showSearchResult() {
            
            console.log('masuk')
        },
        showResultBar() {
            if(!this.$refs.suggestionBar.classList.contains('hovered')) {
                this.resultShow = !this.resultShow;
            }
    
            if (this.arrSearchResult.length > 0) {
                this.$refs.searchInput.classList.toggle('result-show')
            }
            
        },
        suggestBoxHover() {
            this.$refs.suggestionBar.classList.toggle('hovered')
        },
        selectSuggestion(data) {
            this.inputSearch = data;
            this.resultShow = false;
            this.$refs.searchInput.classList.remove('result-show')
            this.$router.push({path : '/search', query : {q : data}})
        }
        
       
    }

}
</script>

<style scoped src="../../public/sass/navbar.scss" lang="scss">

</style>