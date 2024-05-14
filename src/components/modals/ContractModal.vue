<template>
    <BaseModal :activator="activator" :centered="$isMobile()" :show="show" :hideOverflow="true">

        <template v-slot:body>
            <div v-for="contractData, i in contractTypes" :key="`type_${i}`" class="modal-list-item"
                @click.stop="selectContract(contractData.value)">{{ contractData.text }}
                <Check :checked="isSelected(contractData.value)" />
            </div>
        </template>

    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import Check from '../icons/Check.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'ContractModal',

    components: {
        BaseModal,
        Check
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

    data() {
        return {
            value: '',
            contractTypes: [{
                text: 'Venta',
                value: 'sell'
            },
            {
                text: 'Alquiler',
                value: 'rent'
            }]
        }
    },
    computed: {
        ...mapGetters(['contract'])
    },

    methods: {
        ...mapMutations(['setContract', 'setContractText']),

        isSelected(value) {
            return value == this.contract;
        },

        selectContract(value) {
            if(this.contract == value){
                this.setContract('')
                this.setContractText('')
                this.$emit('selectedValue');
                return;
            }

            let contract = this.contractTypes.find(item => {
                return item.value == value;
            });
            this.setContract(contract.value);
            this.setContractText(contract.text);
            this.$emit('selectedValue');
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    padding: calc(5px + 0.3rem) calc((10px + 0.8rem) / 2) calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    svg {
        visibility: hidden;
        height: 1.5rem;
        width: auto;

        &.checked {
            visibility: visible;
        }
    }

    &:hover {
        background-color: white !important;
        color: inherit !important;

        svg {
            visibility: visible;
        }
    }
}
</style>