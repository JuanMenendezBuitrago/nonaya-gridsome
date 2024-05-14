<template>
    <BaseModal :activator="activator" :show="show" :hideOverflow="true" :relative="true">
        <template v-slot:body>
            <div class="scroll-wrapper prices">
                <div v-for="price, i in prices" :key="`type_${i}`" class="modal-list-item" @click.stop="selectPrice(i)">
                    {{ i == (prices.length - 1) && !zero ? price : $formatCurrency(price) }}
                    <Check
                        :checked="(price == minPrice && activator == 'price-min') || (price == maxPrice && activator == 'price-max')" />
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal                    from './BaseModal.vue';
import Check                        from '~/components/icons/Check.vue';
import { mapGetters, mapMutations } from 'vuex';

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
        zero: {
            type: Boolean,
            required: false,
            default: false,
        }
    },

    data() {
        return {
            value: '',
        }
    },

    computed: {
        ...mapGetters(['maxPrice', 'minPrice', 'showMaxPrice', 'showMinPrice']),

        prices() {
            let result1 = Array(19).fill().map((item, i) => {
                return (i + 2) * 50
            });
            let result2 = Array(10).fill().map((item, i) => i * 100 + 1100);
            let result3 = [2100, 2400, 2700, 3000];

            if (this.zero)
                result1 = [0, ...result1];
            else
                result3 = [...result3, 'Sin límite'];


            if (this.activator == 'price-min' && this.maxPrice > 0) {
                return [...result1, ...result2, ...result3].filter(price => price < this.maxPrice)
            }

            if (this.activator == 'price-max' && this.minPrice > 0) {
                return [...result1, ...result2, ...result3].filter(price => price > this.minPrice || price == 'Sin límite')
            }

            return [...result1, ...result2, ...result3]
        }
    },

    methods: {
        ...mapMutations(['setMaxPrice', 'setMinPrice', 'setShowMaxPrice', 'setShowMinPrice']),

        selectPrice(i) {
            if (this.activator == 'price-max') {
                this.value = (i == (this.prices.length - 1) ? -1 : this.prices[i]);
                this.setMaxPrice(this.value);
            } else if (this.activator == 'price-min') {
                this.value = this.prices[i];
                this.setMinPrice(this.value);
            }

            this.$emit('selected')
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.scroll-wrapper {
    max-height: 33vh;
    height: auto;
    overflow-y: auto;


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

.prices {

    .modal-list-item {
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