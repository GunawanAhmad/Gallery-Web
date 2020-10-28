import { createStore } from 'vuex'

export default createStore({
  state: {
    albums : [{
      albumName : 'test1',
      photos : ['1.jpg', '2.png', '3.jpg', '9.png', '8.png', '7.jpg'],
      albumDescription : 'Mantap'
    }]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
