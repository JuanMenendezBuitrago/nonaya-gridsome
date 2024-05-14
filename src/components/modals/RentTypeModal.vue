<template>
    <BaseModal :activator="activator" :centered="$isMobile()" :show="show" :hideOverflow="true">

        <template v-slot:body>
            <div v-for="rentTypeData, i in rentTypes" :key="`type_${i}`" class="modal-list-item"
                @click.stop="selectRentType(rentTypeData.value)">{{ rentTypeData.text }}
                <Check :checked="isSelected(rentTypeData.value)" />
            </div>
        </template>

    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import Check from '../icons/Check.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'RentTypeModal',

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
            rentTypes: [{
                text: 'Vivienda habitual',
                value: 'permanent'
            },
            {
                text: 'Alquiler de temporada',
                value: 'season'
            }]
        }
    },
    computed: {
        ...mapGetters(['rentType'])
    },

    methods: {
        ...mapMutations(['setRentType', 'setRentText']),

        isSelected(value) {
            return value == this.rentType;
        },

        selectRentType(value) {
            if(this.rentType == value){
                this.setRentType('')
                this.setRentText('')
                this.$emit('selectedValue');
                return;
            }
          
            let type = this.rentTypes.find(item => {
                return item.value == value;
            });
            this.setRentType(type.value);
            this.setRentText(type.text);
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