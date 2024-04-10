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
    scrolledPixels: 0,
    showMaxPrice: false,
    maxPrice: 0,
    showMinPrice: false,
    minPrice: 0,
    query:'',
    queryResults: '',
    city:'',
    neighborhood: '',
    touchDelta: 0
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

    setScrolledPixels(state, payload){
        state.scrolledPixels = payload;
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
    },

    setQuery(state, payload){
        state.query = payload;
    },

    setQueryResults(state, payload){
        state.queryResults = payload;
    },

    setCity(state, payload){
        state.city = payload;
    },

    setNeighborhood(state, payload){
        state.neighborhood = payload;
    },

    setTouchDelta(state, payload){
        state.touchDelta = payload;
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
    scrolledPixels(state, getters){
        return state.scrolledPixels;
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
    
    query(state, getters){
        return state.query;
    }, 

    queryResults(state, getters){
        return state.queryResults;
    } , 

    city(state, getters){
        return state.city;
    } , 

    neighborhood(state, getters){
        return state.neighborhood;
    } , 

    touchDelta(state, getters){
        return state.touchDelta;
    } 
  }
})
