<template>
<div class="app">
  <h1>Cool Walpaper</h1>
  <div class="input">
      <div class="icon" @click="addImage">
          <i class="fas fa-plus"></i>
      </div>
  </div>
  <div class="photos">
     <div class="img" v-for="(img,index) in photos" :key="index">
         <img :src="img" alt="" @click="showPhoto(img, index)">
     </div>
  </div>
  <div class="back-photo" ref="backPhoto">
      <div class="background" @click="hidePhoto"></div>
      <div class="img">
          <img src="" alt="" ref="imgFocus">
          <div class="icon" @click="deletePhoto">
              <i class="fas fa-trash"></i>
          </div>
      </div>
      
  </div>
  <add-photo v-if="isAddingPhoto" class="add-photo" @close="addImage"/>
</div>
   
</template>

<script>

import addPhoto from '../components/addPhoto'

export default {
    components : {
        addPhoto
    },
    data() {
        return {
            photos : [],
            selectedFile : null,
            albumIndex : undefined,
            selectedPhoto : undefined,
            isAddingPhoto : false
        }
    },
    created() {
        //find the index of the current album in vue store
        let currentAlbumName = this.$route.params.album;
        let albums = this.$store.state.albums;
        for(let i = 0; i < albums.length; i++) {
            if (currentAlbumName === albums[i].albumName) {
                this.albumIndex = i;

            }
        }
        this.photos = this.$store.state.albums[this.albumIndex].photos;

    },
    methods : {
        addImage() {
            
            this.isAddingPhoto = !this.isAddingPhoto
            
        },
        fileSelected(event) {
            //add image to album
            let albumIndex;
            let currentAlbumName = this.$route.params.album;
            let albums = this.$store.state.albums;

            //find the index of the current album in vue store
            for(let i = 0; i < albums.length; i++) {
                if (currentAlbumName === albums[i].albumName) {
                    albumIndex = i;
                }
            }

            //select the selected file
            this.selectedFile = event.target.files[0]
            
            //add selected file to album
            let path = URL.createObjectURL(this.selectedFile)
            
            //add image to album
            this.$store.state.albums[albumIndex].photos.unshift(path)
            
        },
        showPhoto(img) {
            this.$refs.backPhoto.classList.toggle('show')
            this.$refs.imgFocus.src = img;
        },
        hidePhoto() {
            this.$refs.backPhoto.classList.toggle('show')
        },
        deletePhoto() {
            this.$store.state.albums[this.albumIndex].photos.splice(this.selectedPhoto, 1)
            this.hidePhoto()
        }
    }
}
</script>

<style scoped src="../../public/sass/albumPhotos.scss" lang="scss">

</style>