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
         <img :src="baseUrl + img.path" alt="" @click="showPhoto(img, index)">
     </div>
     <div class="img" v-for="(img,index) in $store.state.newPhotos" :key="index">
         <img :src="img.path" alt="" @click="showPhoto(img, index)">
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

import axios from 'axios'
import addPhoto from '../components/addPhoto'

export default {
    components : {
        addPhoto
    },
    data() {
        return {
            photos : [],
            newPhotos : this.$store.state.newPhotos,
            selectedFile : null,
            albumIndex : undefined,
            selectedPhoto : undefined,
            isAddingPhoto : false,
            albumInfo : null,
            albumName : '',
            baseUrl : "http://localhost:5000/"
        }
    },
    created() {
        this.$store.commit('clearNewPhotos')
        let albumInfo = JSON.parse(localStorage.getItem('albumInfo'))
        this.albumId = albumInfo.id
        this.albumIndex = albumInfo.index
        // this.albumName = this.$store.state.albums[this.albumIndex].albumName
        this.baseUrl = axios.defaults.baseURL + "/"
        

        // let token = localStorage.getItem("token");
        axios.get('/get-album-photos/' + this.albumId)
        .then(res => {
            console.log(res)
            this.photos = res.data.photos.photos
            

        })
        .catch(err => {
            console.log(err)
        })
    },
    
    methods : {
        addImage() {
            
            this.isAddingPhoto = !this.isAddingPhoto
            
        }
    },
    mounted() {
        
    }
}
</script>

<style scoped src="../../public/sass/albumPhotos.scss" lang="scss">

</style>