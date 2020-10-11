<template>
  <div class="main">
      <div class="album_section" v-for="(album, index) in albums" :key="index">
          <div class="icon">
              <i class="fas fa-folder"></i>
          </div>
          <h4 class="title">{{ album.albumName }}</h4>
      </div>
      
      <div class="add__album" @click="showAlbum">
          <div class="icon">
              <i class="fas fa-plus"></i>
          </div>
          <h4 class="title">Add album</h4>
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
        }
    }
}
</script>

<style scoped src="../../public/css/main.css">

</style>