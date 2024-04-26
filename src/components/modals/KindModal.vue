<template>
    <BaseModal 
        :activator="activator" 
        :show="show"
        :hideOverflow="true">
        <template v-slot:body>
            <div 
                v-for="kind, i in kinds" 
                :key="`type_${i}`" 
                class="modal-list-item"
                @click.stop="selectKind(kind.key)">{{ kind.text }}</div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'KindModal',

    components: {
        BaseModal
    },

    props: {
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
            kinds: [{
                key: 'vivienda',

                text: 'Vivienda'
            },
            {
                key: 'bajo',
                text: 'Bajo'
            },
            {
                key: 'duplex',
                text: 'Duplex'
            },
            {
                key: 'estudio',
                text: 'Estudio'
            },
            {
                key: 'casa',
                text: 'Casa'
            },
            {
                key: 'local',
                text: 'Local'
            },
            {
                key: 'garaje',
                text: 'Garaje'
            }]
        }
    },

    methods: {
        ...mapMutations(['setKind', 'setKindText']),

        selectKind(value) {
            let text = this.kinds.find(item => {
                return item.key == value;
            });
            
            this.setKind(value);
            this.setKindText(text.text);
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