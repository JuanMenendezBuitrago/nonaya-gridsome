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
    contractText:     '',
    rentText:         '',
    kindText:         '',

    filter_rentType:     '',
    filter_maxPrice:     '',
    filter_minPrice:     '',
    filter_contract:     '',
    filter_kind:         '',
    filter_bedrooms:     0,
    filter_bathrooms:    0,
    filter_city:         '',
    filter_neighborhood: '',
    filter_apartment_all:    false,
    filter_apartment_atic:   false,    
    filter_apartment_first:  false, 
    filter_apartment_middle: false,
    filter_house_all:        false,
    filter_house_rustic:     false,    
    filter_house_terraced:   false,    
    filter_house_chalet:     false, 
    filter_new:              false,    
    'filter_second-hand':    false,        

    sort_text:           '',
    sort_direction:      '',
    sort_by:             '',
  },


  mutations: {
    // Define your mutations here
    setRentText(state, payload){
        state.rentText = payload;
    },

    setRentType(state, payload){
        state.filter_rentType = payload;
    },


    setContractText(state, payload){
        state.contractText = payload;
    },

    setKindText(state, payload){
        state.kindText = payload;
    },
    
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

    setApartmentAll(state, payload) {
        state.filter_apartment_all = payload;
    },

    setApartmentAtic(state, payload){
        state.filter_apartment_atic = payload;
    },

    setApartmentFirst(state, payload){
        state.filter_apartment_first = payload;
    },

    setApartmentMiddle(state, payload){
        state.filter_apartment_middle = payload;
    },

    setHouseAll(state, payload){
        state.filter_house_all = payload;
    },

    setHouseRustic(state, payload){
        state.filter_house_rustic = payload;
    },

    setHouseTerraced(state, payload){
        state.filter_house_terraced = payload;
    },

    setHouseChalet(state, payload){
        state.filter_house_chalet = payload;
    },

    setIsNew(state, payload){
        state.filter_new = payload;
    },

    setSecondHand(state, payload){
        state['filter_second-hand'] = payload;
    }
  },

  actions: {
    // Define your actions here
  },

  getters: {
    // Define your getters here
    apartmentAll(state, getters) {
        return state.filter_apartment_all;
    },

    apartmentAtic(state, getters){
        return state.filter_apartment_atic;
    },

    apartmentFirst(state, getters){
        return state.filter_apartment_first;
    },

    apartmentMiddle(state, getters){
        return state.filter_apartment_middle;
    },

    houseAll(state, getters){
        return state.filter_house_all;
    },

    houseRustic(state, getters){
        return state.filter_house_rustic;
    },

    houseTerraced(state, getters){
        return state.filter_house_terraced;
    },

    houseChalet(state, getters){
        return state.filter_house_chalet;
    },

    isNew(state, getters){
        return state.filter_new;
    },

    secondHand(state, getters){
        return state['filter_second-hand'];
    },

    contract(state, getters){
        return state.filter_contract;
    },
    
    kind(state, getters){
        return state.filter_kind;
    },

    rentText(state, getters){
        return state.rentText;
    },

    rentType(state, getters){
        return state.filter_rentType;
    },

    contractText(state, getters){
        return state.contractText;
    },
    
    kindText(state, getters){
        return state.kindText;
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
