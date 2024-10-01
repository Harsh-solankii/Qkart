import { createStore } from 'vuex'

const store =  createStore({
  state: {
    state(){
      return{
      authenticated:false,
     }
    },
  },
  getters: {
  },
  mutations: {
    set_auth(state:any,auth){
      state.authenticated = auth
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store;