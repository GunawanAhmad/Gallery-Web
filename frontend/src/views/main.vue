<template>
  <div class="main">
      <div class="add__album" @click="addAlbum">
          <div class="icon">
              <i class="fas fa-plus"></i>
          </div>
          <h4 class="title">Add album</h4>
      </div>
      <addAlbum v-if="isAddAlbum"></addAlbum>
  </div>
</template>

<script>

import addAlbum from '../components/addAlbum'
export default {
    components : {
        addAlbum
    },
    data() {
        return {
            albums : [],
            isAddAlbum : false
        }
    },
    methods : {
        addAlbum() {
            this.isAddAlbum = !this.isAddAlbum
        }
    }
}
</script>

<style scoped src="../../public/css/main.css">

</style>