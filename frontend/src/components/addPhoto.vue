<template>
<div class="container"  >
    
    <form action="" class="form" @submit="addAlbum">
      <div class="photo input_part">
          <label for="name" >Choose photo</label>
          <input type="file" name="name" autocomplete="off" required >
      </div>
    
      <div class="album_description input_part">
          <label for="description" >Description</label>
          <textarea name="description"  cols="30" rows="10"></textarea>
      </div>
      <button class="btn" >Add photo</button>
  </form>
  <div class="background" @click="closeTab"></div>
</div>
  
</template>

<script>
export default {
    methods : {
        closeTab() {
            console.log('emit')
            this.$emit('close')
            
        }
    }
}
</script>

<style scoped src="../../public/sass/addPhoto.scss" lang="scss">

</style>