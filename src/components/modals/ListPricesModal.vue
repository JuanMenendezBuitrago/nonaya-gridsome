<template>
    <BaseModal :activator="activator" :show="show" :hideOverflow="true">
        <template v-slot:body>
            <div class="scroll-wrapper">
                <div 
                    v-for="price, i in prices" 
                    :key="`type_${i}`" 
                    class="modal-list-item"
                    @click.stop="selectPrice(i)">
                        {{ i == (prices.length - 1 ) && !zero ? price : formatPrice(price) }}
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal                    from './BaseModal.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'ListPricesModal',

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
        },
        zero: {
            type: Boolean,
            required: false,
            default: false,
        }
    },

    data(){
        return {
            value:'',
        }
    },

    computed:{
        ...mapGetters(['maxPrice', 'minPrice', 'showMaxPrice', 'showMinPrice']),
        prices(){
            let result1 = Array(19).fill().map((item, i) =>  {
                return (i+2)*50
            });
            let result2 = Array(10).fill().map((item,i) => i*100 + 1100);
            let result3 = [2100, 2400, 2700, 3000];

            if(this.zero)
                result1 = [0, ...result1];
            else
                result3 = [...result3, 'Sin límite'];
            
            return [...result1, ...result2, ...result3]
        }
    },

    methods: {
        ...mapMutations(['setMaxPrice', 'setMinPrice', 'setShowMaxPrice', 'setShowMinPrice']),

        formatPrice(value) {
            let euro = Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });

            return euro.format(value);
        },

        selectPrice(i) {
            this.value = (i == (this.prices.length - 1 ) ? -1 : this.prices[i]);
            this.$emit('selected', this.value)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.scroll-wrapper{
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