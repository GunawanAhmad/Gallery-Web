<template>
<div class="container">
    <div class="menu">
      <ul class="ul">
          <li @click="changeTab('profile')" :class="tabOpen == 'profile' ? 'active' : ''" > 
              <router-link to="/settings/profile">Profile</router-link>
          </li>
          <li @click="changeTab('account')" :class="tabOpen == 'account' ? 'active' : ''"> 
              <router-link to="/settings/account">Account</router-link>
          </li>
      </ul>
  </div>
  <div class="router-view">
      <router-view />
  </div>
  
</div>
  
</template>

<script>
export default {
    created() {
        if(this.$route.path === '/settings') {
            this.$router.push({path : '/settings/profile'})
        }
    },
    data() {
        return {
            tabOpen : 'profile',
        }
    },
    methods : {
        changeTab(tab) {
            this.tabOpen = tab
        }
        
    }
}
</script>

<style scoped src="../../public/sass/settings.scss" lang="scss">

</style>