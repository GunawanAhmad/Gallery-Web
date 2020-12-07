import { createStore } from 'vuex'

export default createStore({
  state: {
    albums : [],
    username : 'gunawan',
    loadingScreen : null,
    newPhotos : []
    
  },
  mutations: {
    clearNewPhotos(state) {
      console.log('mutations')
      state.newPhotos = []
    },
    deleteAlbum(state, {index}) {
      state.albums.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
  
})
