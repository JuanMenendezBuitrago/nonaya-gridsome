<template>
    <BaseModal 
        :activator="activator" 
        :show="show" 
        :hideOverflow="true"
        :relative="relative">
        <template v-slot:body>
            <div v-for="value, i in values" :key="`sort_${i}`" class="modal-list-item"
                @click.stop="$emit('selected', value)">
                {{ value.sortText }}
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';

export default {
    name: 'SortByModal',

    components: {
        BaseModal
    },

    props: {
        relative: {
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

    data() {
        return {
            values: [
                {
                    sortText: 'Más caro',
                    sortBy:   'cost',
                    sortByWay: -1
                },
                {
                    sortText: 'Más barato',
                    sortBy:   'cost',
                    sortByWay: 1
                }
            ]
        }
    },

    methods: {

    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.scroll-wrapper {
    height: 33vh;
    overflow-y: scroll;


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

.modal-list-item {
    font-size: 0.8rem;
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    &:hover {
        background-color: $orange;
        color: white;
    }
}
</style>