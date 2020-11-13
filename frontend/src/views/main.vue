<template>
  <div class="main">
      <div class="profile-container">
          <div class="photo"></div>
          <div class="name">
              <h1 class="fullname">Gunawan Nur Ahmad</h1>
              <h2 class="username">Gunawan</h2>
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
                <p class="album-desc">albums description</p>
             </div>
        
            <div class="add__album" @click="showAlbum">
                <div class="icon">
                    <i class="fas fa-plus"></i>
                </div>
                <p class="title">Add album</p>
            </div>
      </div>
      
      <addAlbum v-if="isAddAlbum" class="add_album_component"></addAlbum>
      <div class="add_album_backg " @click="showAlbum" ref="addAlbumBackg"></div>
  </div>
</template>

<script>

import addAlbum from '../components/addAlbum'
export default {
    components : {
        addAlbum
    },
    created() {
        this.albums = this.$store.state.albums;
    },
    data() {
        return {
            albums : [],
            isAddAlbum : false
        }
    },
    methods : {
        showAlbum() {
            this.isAddAlbum = !this.isAddAlbum
            this.$refs.addAlbumBackg.classList.toggle('show')
        },
        showPhotos(albumName) {
            this.$router.push({path : `/gunawanart/${albumName}`, params : {data : 'my name'}})
        }
    }
}
</script>

<style scoped src="../../public/sass/main.scss" lang="scss">

</style>