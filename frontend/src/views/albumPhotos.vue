<template>
<div class="app">
  <h1>Cool Walpaper</h1>
  <div class="input">
      <div class="icon">
          <i class="fas fa-plus"></i>
      </div>
      <input type="file">
  </div>
  <div class="photos">
     <div class="img" v-for="(img,index) in photos" :key="index">
         <img :src="require('../assets/' + img)" alt="">
     </div>
  </div>
</div>
  
</template>

<script>

export default {
    data() {
        return {
            photos : [],
        }
    },
    created() {
        this.photos = this.$store.state.albums[0].photos;
    }
}
</script>

<style scoped src="../../public/sass/albumPhotos.scss" lang="scss">

</style>