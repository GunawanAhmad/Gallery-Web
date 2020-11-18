<template>
  <div class="container">
      
      <form action="" class="form" @submit="addAlbum">
        <div class="title">
          <h2>Create a new album</h2>
        </div>
        <div class="album_name input_part">
            <label for="name" >Album name</label>
            <input type="text" name="name" autocomplete="off" required v-model="albumName">
        </div>
        <div class="album_type input_part">
            <div class="public">
                <input type="radio" name="type" value="public" id="public" v-model="type" required>
                <div class="label">
                    <label for="public">Public</label>
                    <p>Anyone on the internet can see this album</p>
                </div>
                
            </div>
            <div class="private">
                <input type="radio" name="type" value="private" id="private" v-model="type" required>
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
  </div>

</template>

<script>
export default {
    data() {
        return {
            albumName : '',
            albumDescription : '',
            albums : [],
            type : null
        }
    },
    methods : {
        addAlbum(e) {
            e.preventDefault();
            
            let album = {
                albumName : this.albumName,
                albumType : this.type,
                albumDescription : this.albumDescription,
                photos : []
            };
            this.$store.state.albums.push(album)
            this.$router.push({path : `/${this.$store.state.username}`})
        }
    }
}
</script>

<style scoped src="../../public/sass/add_album.scss" lang="scss">

</style>