<template>
    <BaseModal 
        :activator="activator" 
        :show="show" 
        :hideOverflow="true" 
        :relative="true">
        <template v-slot:body>
            <div class="scroll-wrapper dropdown">
                <div v-for="pair, i in list" :key="`type_${i}`" class="dropdown-item" @click.stop="selectItem(i)">
                    {{ pair.text }}
                    <Check :checked="isSelected(pair.value)" />
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal                    from './BaseModal.vue';
import Check                        from '~/components/icons/Check.vue';

export default {
    name: 'PricesDropdown',

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
        },

        list: {
            type: Array,
            required: true
        },

        selected: {
            required: false,
            default: null
        }
    },

    data() {
        return {
            value: '',
        }
    },

    methods: {
        isSelected(value){
            if(this.selected instanceof Object && value instanceof Object){
                return this.equalObjects(value, this.selected);
            }

            return value === this.selected;
        },

        equalObjects(obj1, obj2) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            
            if (keys1.length !== keys2.length) {
                return false;
            }
            
            for (let key of keys1) {
                if (obj1[key] !== obj2[key]) {
                    return false;
                }
            }
            
            return true;
        },

        selectItem(i) {
            this.$emit('selected', this.list[i].value)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.scroll-wrapper {

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 3px;
        border: none;
        background-color: $gray-light;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: $gray;
    }
}

.dropdown {
    max-height: 33vh;
    height: auto;
    overflow-y: auto;

    .dropdown-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        padding: calc(5px + 0.3rem) calc((10px + 0.8rem) / 2) calc(5px + 0.3rem) calc(10px + 0.8rem) ;
        cursor: pointer;

        svg {
            visibility: hidden;
            height: 1.5rem;
            width: auto;

            &.checked{
                visibility: visible;
            }
        }

        &:hover {
            background-color: white;
            color: inherit;
            svg {
                visibility: visible;
            }
        }
    }
}
</style>