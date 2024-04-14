<template>
    <BaseModal 
        :activator="activator" 
        :hideOverflow="true"
        centered>
        <template v-slot:header>
            <h1>Filtros</h1>
        </template>       
        <template v-slot:body>
            <div 
                v-for="kind, i in kinds" 
                :key="`type_${i}`" 
                class="modal-list-item"
                @click.stop="selectKind(kind.key)">{{ kind.text }}</div>
        </template>

        <template v-slot:footer>
            <Button flat solid >Mostrar viviendas</Button>
        </template>
    </BaseModal>        
</template>

<script>
import BaseModal from './BaseModal.vue';
import Button          from '../Button.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'KindMFiltersModal',

    components: {
        BaseModal,
        Button
    },

    props: {
        activator: {
            type: String,
            required: false
        }
    },
    
    data(){
        return {
            kinds: [{
                key: 'casa',
                text: 'Casa'
            },
            {
                key: 'piso',
                text: 'Piso'
            },
            {
                key: 'duplex',
                text: 'Duplex'
            }]
        }
    },

    methods: {
        ...mapMutations(['setKind']),

        selectKind(value) {
            let text = this.kinds.find(item => {
                return item.key == value;
            });
            
            this.setKind(value);
            this.$emit('selectedValue',text.text)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal-list-item{
    font-size: 0.8rem;
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

</style>