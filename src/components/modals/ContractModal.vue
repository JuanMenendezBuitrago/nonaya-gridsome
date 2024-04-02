<template>
    <BaseModal :activator="activator" :hideOverflow="true">
        <template v-slot:body>
            <div 
                v-for="contractData, i in contractTypes" 
                :key="`type_${i}`" 
                class="modal-list-item"
                @click.stop="selectContract(contractData.key)">{{ contractData.text }}</div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal        from './BaseModal.vue';
import { mapMutations } from 'vuex';

export default {
    components: {
        BaseModal
    },
    props: {
        activator: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            value:'',
            contractTypes: [{
                text: 'Compra',
                key: 'compra'            
            },
            {
                text: 'Alquiler',
                key: 'alquiler'            
            },
            {
                text: 'Alquiler con opción a compra',
                key: 'opcion'            
            }]
        }
    },
    methods: {
        ...mapMutations(['setContract']),

        selectContract(value) {
            let text = this.contractTypes.find(item => {
                return item.key == value;
            });
            
            this.setContract(value);
            this.$emit('selectedValue',text.text)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal-list-item{
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

</style>