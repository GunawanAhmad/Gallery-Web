<template>
<div class="container"  >
    
    <form action="" class="form" >
      <div class="photo input_part">
          <label for="name" >Choose photo</label>
          <input type="file" name="name" autocomplete="off" required @change="selectFile">
      </div>
      <div class="img-sample" v-if="newPhoto.path">
          <img :src="newPhoto.path" alt="">
      </div>
      
      <div class="album_description input_part">
          <label for="description" >Description</label>
          <textarea name="description"  cols="30" rows="10" v-model="newPhoto.description"></textarea>
      </div>
      <button class="btn" @click="emitData">Add photo</button>
  </form>
  <div class="background" @click="closeTab"></div>
</div>
  
</template>

<script>

import axios from 'axios'
export default {
    data() {
        return {
            selectedFile : null,
            description : '',
            newPhoto : {
                path : null,
                description : ''
            }
            
        }
    },
    methods : {
        closeTab() {
            console.log('emit')
            this.$emit('close')
        },
        emitData() {
            
            this.$store.state.newPhotos.push(this.newPhoto)
            this.closeTab()
        },
        submitData(e) {
            
            e.preventDefault()
            this.$store.state.loadingScreen.classList.toggle('hide')

            const formData = new FormData()
            let albumInfo = JSON.parse(localStorage.getItem('albumInfo')) 
            let albumId = albumInfo.id
            


            formData.append('description', this.description)
            formData.append('photo', this.selectedFile)

            let token = localStorage.getItem("token");
            axios.post(`/add-photo/${albumId}`, formData, {
            headers: {
                Authorization: "Bearer " + token,
                },
            })
            .then((res) => {
                console.log(res);
                this.emitData();
                this.$store.state.loadingScreen.classList.toggle('hide')
            })
            .catch((err) => {
                console.log(err);
                this.$store.state.loadingScreen.classList.toggle('hide')
                
            });
        },
        selectFile(e) {
            //select photo file from the user
            this.selectedFile = e.target.files[0];
            

            //create path from selected file to show to img-sample element
            // this.photoPath = URL.createObjectURL(this.selectedFile)
            this.newPhoto.path = URL.createObjectURL(this.selectedFile)
            
        }
    }
}
</script>

<style scoped src="../../public/sass/addPhoto.scss" lang="scss">

</style>