<template>
    <BaseModal :activator="activator" :show="showMe" :hideOverflow="true">
        <template v-slot:body>
            <div class="scroll-wrapper">
                <div 
                    v-for="price, i in prices" 
                    :key="`type_${i}`" 
                    class="modal-list-item"
                    @click.stop="i == (prices.length - 1 ) ? selectPrice(-1) : selectPrice(price)">{{ i == (prices.length - 1 ) ? price : formatPrice(price) }}
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal                    from './BaseModal.vue';
import { mapGetters, mapMutations } from 'vuex';

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
        }
    },
    computed:{
        ...mapGetters(['maxPrice', 'minPrice', 'showMaxPrice', 'showMinPrice']),
        prices(){
            let result1 = Array(19).fill().map((item, i) =>  {
                return (i+2)*50
            });
            let result2 = Array(10).fill().map((item,i) => i*100 + 1100)
            let result3 = [2100, 2400, 2700, 3000]
            return [...result1, ...result2, ...result3, 'Sin límite']
        },
        showMe(){
            if(this.activator == 'price-min')
                return this.showMinPrice;
            if(this.activator == 'price-max')
                return this.showMaxPrice;
        }
    },
    methods: {
        ...mapMutations(['setMaxPrice', 'setMinPrice', 'setShowMaxPrice', 'setShowMinPrice']),

        formatPrice(value) {
            let euro = Intl.NumberFormat('en-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });

            return euro.format(value);
        },

        selectPrice(value) {

            if(this.activator == 'price-max')
            {
                this.setMaxPrice(value);
                this.setShowMaxPrice(false);
            }

            else if(this.activator == 'price-min'){
                this.setMinPrice(value);
                this.setShowMinPrice(false);
            }
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