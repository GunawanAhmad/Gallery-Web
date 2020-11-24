<template>
  <div class="main">
      <div class="profile-container">
          <div class="photo"></div>
          <div class="name">
              <h1 class="fullname">{{ name }}</h1>
              <h2 class="username">{{ username }}</h2>
          </div>
          <div class="desc">
              <p>saya adalah orang yang akan sukses, amin ya allah</p>
          </div>
          <button class="edit-btn">Edit profile</button>
          <div class="follow-info">
              <span class="icon"><i class="fas fa-user-friends"></i></span>
              <span class="followers">0 Followers</span>
              <span class="following">4 Following</span>
          </div>

      </div>
      <div class="albums-container">
            <div class="album_section" v-for="(album, index) in albums" :key="index" @click="showPhotos(album.albumName)">
                <div class="title">
                    <span class="icon"><i class="fas fa-folder"></i></span>
                    <span><p>{{ album.albumName }}</p></span>
                </div>
                <p class="album-desc">{{ album.description }}</p>
             </div>
      </div>
      
  </div>
</template>

<script>

import axios from 'axios';
export default {
    
    created() {
        let username = this.$route.params.user;
        let headers;

        //check if the user we want to see is our page or not
        if(username == localStorage.getItem("username")) {
            // console.log(localStorage.getItem("token"))
            headers = {
                Authorization : 'Bearer ' + localStorage.getItem("token")
            }
            console.log(headers)   
        } else {
            headers = null
        }
        
        this.username = localStorage.getItem("username")
        axios.get('/' + username, {headers : headers})
        .then(res => {
            console.log(res)
            this.albums = res.data.user.albums
            console.log(this.albums)
            this.$store.state.albums = res.data.user.albums
            this.name = res.data.user.name
        })
        .catch(err => {
            console.log(err)
        })
    
    },
    data() {
        return {
            albums : [],
            isAddAlbum : false,
            username : '',
            name : ''
        }
    },
    methods : {
        showPhotos(albumName) {
            this.$router.push({path : `/gunawanart/${albumName}`, params : {data : 'my name'}})
        }
    }
}
</script>

<style scoped src="../../public/sass/main.scss" lang="scss">

</style>