// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Define your state properties here
    counter: 0,
    contract: '',
    kind:'',
    bedrooms: 0,
    bathrooms: 0,
    activeModal: '',
    showMaxPrice: false,
    maxPrice: 0,
    showMinPrice: false,
    minPrice: 0,
  },
  mutations: {
    // Define your mutations here
    setContract(state, payload){
        state.contract = payload;
    },

    setKind(state, payload){
        state.kind = payload;
    },

    setBedrooms(state, payload){
        state.bedrooms = payload;
    },    
    
    setBathrooms(state, payload){
        state.bathrooms = payload;
    },

    setActiveModal(state, payload){
        state.activeModal = payload;
    },

    setMaxPrice(state, payload){
        state.maxPrice = payload;
    },

    setMinPrice(state, payload){
        state.minPrice = payload;
    },

    setShowMaxPrice(state, payload){
        state.showMaxPrice = payload;
    },

    setShowMinPrice(state, payload){
        state.showMinPrice = payload;
    }
  },

  actions: {
    // Define your actions here
  },

  getters: {
    // Define your getters here
    activeModal(state, getters){
        return state.activeModal;
    },
    contract(state, getters){
        return state.contract;
    },
    kind(state, getters){
        return state.kind;
    },

    bedrooms(state, getters){
        return state.bedrooms;
    },
    
    bathrooms(state, getters){
        return state.bathrooms;
    },
    
    maxPrice(state, getters){
        return state.maxPrice;
    },    
    
    minPrice(state, getters){
        return state.minPrice;
    },    
    
    showMaxPrice(state, getters){
        return state.showMaxPrice;
    },    
    
    showMinPrice(state, getters){
        return state.showMinPrice;
    },    
  }
})
