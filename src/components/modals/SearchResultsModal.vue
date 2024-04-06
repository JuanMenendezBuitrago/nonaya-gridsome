<template>
    <BaseModal :activator="activator" :show="showMe" :hideOverflow="true">    
        <template v-slot:body v-if="queryResults.length > 0">
            <div 
                v-for="(item, i) in queryResults" 
                :key="`item_${i}`"
                @click="selectResult(item.item)" 
                class="search-result-item">{{ item.item.town + ', ' + item.item.province }}</div>
        </template>
        <template v-slot:footer v-if="query.length > 0 && queryResults.length == 0">
            <div class="no-results">
                No se han encontrado inmuebles 
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
    components: {
        BaseModal,
    },

    props: {
        activator: {
            type: String,
            required: false
        },

    },

    data(){
        return {
            value: 0,
            exact: false
        }
    },
    computed: {
        ...mapGetters(['activeModal','query', 'queryResults','city', 'neighborhood']),

        showMe(){
            return this.query.length > 0 && this.activeModal=='search' ;
        }
    },

    methods:{
        ...mapMutations(['setActiveModal', 'setCity', 'setNeighborhood']),

        selectResult(location) {
            this.setCity(location.town);
            this.setNeighborhood(location.province);
        }

    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.search-result-item{
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

.no-results{
    text-align: center;
    padding: 1rem;
}

</style>