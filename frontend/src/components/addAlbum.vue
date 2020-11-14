<template>
  <form action="" class="form" @submit="addAlbum">
      <div class="album_name input_part">
          <label for="name" >Album name</label>
          <input type="text" name="name" autocomplete="off" required v-model="albumName">
      </div>
      <div class="album_type input_part">
          <div class="public">
              <input type="radio" name="type" value="public" id="public" required>
              <div class="label">
                  <label for="public">Public</label>
                  <p>Anyone on the internet can see this album</p>
              </div>
              
          </div>
          <div class="private">
               <input type="radio" name="type" value="private" id="private" required>
               <div class="label">
                   <label for="private">Private</label>
                   <p>Only you can see this album</p>
               </div>
               
          </div>
         
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
            let albumType;
            let radios = document.getElementsByName('type')
            for(let i = 0; i < radios.length; i++) {
                if(radios[i].checked) {
                    albumType = radios[i].value;
                }
            }
            
            let album = {
                albumName : this.albumName,
                albumType : albumType,
                albumDescription : this.albumDescription,
                photos : []
            };
            this.$store.state.albums.push(album)
            this.$emit('close-tab')
        }
    }
}
</script>

<style scoped src="../../public/sass/add_album.scss" lang="scss">

</style>