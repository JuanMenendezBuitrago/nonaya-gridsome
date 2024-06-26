<template>
    <BaseModal :activator="activator" :centered="$isMobile()" :show="show" :hideOverflow="true">
        <template v-slot:body>
            <div v-for="kind, i in kinds" :key="`type_${i}`" class="modal-list-item" @click.stop="selectKind(kind.value)">
                {{ kind.text }}<Check :checked="isSelected(kind.value)" /></div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import Check     from '../icons/Check.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'KindModal',

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
            kinds: [{
                value: 'vivienda',
                text: 'Vivienda'
            },
            {
                value: 'bajo',
                text: 'Bajo'
            },
            {
                value: 'duplex',
                text: 'Duplex'
            },
            {
                value: 'estudio',
                text: 'Estudio'
            },
            {
                value: 'casa',
                text: 'Casa'
            },
            {
                value: 'local',
                text: 'Local'
            },
            {
                value: 'garaje',
                text: 'Garaje'
            }]
        }
    },

    computed: {
        ...mapGetters(['kind'])
    },

    methods: {
        ...mapMutations(['setKind', 'setKindText']),

        isSelected(value) {
            return value == this.kind;
        },

        selectKind(value) {
            if(this.kind == value){
                this.setKind('')
                this.setKindText('')
                this.$emit('selectedValue');
                return;
            }

            let kind = this.kinds.find(item => {
                return item.value == value;
            });

            this.setKind(kind.value);
            this.setKindText(kind.text);
            this.$emit('selectedValue', kind.text)
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