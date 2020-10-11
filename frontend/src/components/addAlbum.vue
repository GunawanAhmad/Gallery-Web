<template>
  <form action="" class="form" @submit="addAlbum">
      <div class="album_name input_part">
          <label for="name" >Album name</label>
          <input type="text" name="name" autocomplete="off" required v-model="albumName">
      </div>
      <div class="album_type input_part">
          <label for="type">Album type</label>
          <select name="type" id="type" ref="typeSelect">
              <option value="Public" selected>Public</option>
              <option value="Private">Private</option>
          </select>
      </div>
      <div class="album_description input_part">
          <label for="description" >Description</label>
          <textarea name="description"  cols="30" rows="10" v-model="albumDescription"></textarea>
      </div>
      <button class="btn">Add album</button>
  </form>

</template>

<script>
export default {
    data() {
        return {
            albumName : '',
            albumDescription : '',
            albums : []
        }
    },
    methods : {
        addAlbum(e) {
            e.preventDefault();
            let albumType = this.$refs.typeSelect.value;
            let album = {
                albumName : this.albumName,
                albumType : albumType,
                albumDescription : this.albumDescription
            };
            this.$store.state.albums.push(album)
            
        }
    }
}
</script>

<style scoped src="../../public/css/add_album.css">

</style>