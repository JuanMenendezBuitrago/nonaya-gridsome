// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Define your state properties here
  
    activeModal:      '',
    scrolledPixels:   0,
    counter:          0,
    showMaxPrice:     false,
    showMinPrice:     false,
    query:            '',
    queryResults:     '',
    touchDelta:       0,
      
    filter_maxPrice:     0,
    filter_minPrice:     0,
    filter_contract:     '',
    filter_kind:         '',
    filter_bedrooms:     0,
    filter_bathrooms:    0,
    filter_city:         '',
    filter_neighborhood: '',

    sort_text:           '',
    sort_direction:      '',
    sort_by:             '',
  },


  mutations: {
    // Define your mutations here
    setContract(state, payload){
        state.filter_contract = payload;
    },

    setKind(state, payload){
        state.filter_kind = payload;
    },

    setBedrooms(state, payload){
        state.filter_bedrooms = payload;
    },    
    
    setBathrooms(state, payload){
        state.filter_bathrooms = payload;
    },

    setMaxPrice(state, payload){
        state.filter_maxPrice = payload;
    },

    setMinPrice(state, payload){
        state.filter_minPrice = payload;
    },

    setCity(state, payload){
        state.filter_city = payload;
    },

    setNeighborhood(state, payload){
        state.filter_neighborhood = payload;
    },

    setSortText(state, payload){
        state.sort_text = payload;
    },
    
    setSortByWay(state, payload){
        state.sort_direction = payload;
    },
    
    setSortBy(state, payload){
        state.sort_by = payload;
    },

    setTouchDelta(state, payload){
        state.touchDelta = payload;
    },

    setScrolledPixels(state, payload){
        state.scrolledPixels = payload;
    },

    setActiveModal(state, payload){
        state.activeModal = payload;
    },

    setQuery(state, payload){
        state.query = payload;
    },

    setQueryResults(state, payload){
        state.queryResults = payload;
    },

  },

  actions: {
    // Define your actions here
  },

  getters: {
    // Define your getters here
  
    contract(state, getters){
        return state.filter_contract;
    },
    kind(state, getters){
        return state.filter_kind;
    },

    bedrooms(state, getters){
        return state.filter_bedrooms;
    },
    
    bathrooms(state, getters){
        return state.filter_bathrooms;
    },
    
    maxPrice(state, getters){
        return state.filter_maxPrice;
    },    
    
    minPrice(state, getters){
        return state.filter_minPrice;
    },    
    
    city(state, getters){
        return state.filter_city;
    } , 
    
    neighborhood(state, getters){
        return state.filter_neighborhood;
    } , 
    
    
    sortText(state, getters){
        return state.sort_text;
    } ,

    sortBy(state, getters){
        return state.sort_by;
    } ,

    sortByWay(state, getters){
        return state.sort_direction;
    } ,
    
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
    
    touchDelta(state, getters){
        return state.touchDelta;
    },

    activeModal(state, getters){
        return state.activeModal;
    },

    scrolledPixels(state, getters){
        return state.scrolledPixels;
    },
  }
})
