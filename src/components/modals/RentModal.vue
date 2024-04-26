<template>
    <BaseModal 
        :activator="activator" 
        :relative="relative"
        :show="show" 
        :hideOverflow="true">

        <template v-slot:body>
            <div 
                v-for="rentType, i in rentTypes" :key="`type_${i}`" 
                class="modal-list-item"
                @click.stop="selectRentType(rentType.key)">{{ rentType.text }}</div>
        </template>

    </BaseModal>
</template>

<script>
import BaseModal        from './BaseModal.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'RentModal',

    components: {
        BaseModal
    },

    props: {
        relative:{
            type: Boolean,
            required: false,
            default: false,
        },
        show: {
            type: Boolean,
            required: false,
            default: false,
        },
        
        activator: {
            type: String,
            required: false
        }
    },
    
    data(){
        return {
            value:'',
            rentTypes: [{
                text: 'Vivienda habitual',
                key: 'vivienda'            
            },
            {
                text: 'Alquiler de temporada',
                key: 'temporada'            
            }]
        }
    },
    methods: {
        ...mapMutations(['setRentType', 'setRentText']),

        selectRentType(value) {
            let selected = this.rentTypes.find(item => {
                return item.key == value;
            });
            this.setRentType(selected.key);
            this.setRentText(selected.text);
            this.$emit('selected')
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal-list-item{
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    font-size: 0.8rem;
    cursor: pointer;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

</style>