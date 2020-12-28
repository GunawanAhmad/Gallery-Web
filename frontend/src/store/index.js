import { createStore } from "vuex";

export default createStore({
  state: {
    albums: [],
    username: "",
    avatar: "",
    loadingScreen: null,
    newPhotos: [],
    avaImg: null,
  },
  mutations: {
    clearNewPhotos(state) {
      console.log("mutations");
      state.newPhotos = [];
    },
    deleteAlbum(state, { index }) {
      state.albums.splice(index, 1);
    },
  },

  actions: {},
  modules: {},
});
