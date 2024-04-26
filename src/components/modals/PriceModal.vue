<template>
    <BaseModal :activator="activator" >
        <template v-slot:header>
            <h1>Precio</h1>
        </template>        
        <template v-slot:body>
            <div class="price-form">
                <label>Mínimo</label>
                <label>Máximo</label>
                <ButtonWithIcon 
                    :text="minPriceText" 
                    icon="down" 
                    ref="price-min"
                    @clicked="togglePriceModal('price-min')">
                    <ListPricesModal 
                        activator="price-min" 
                        :show="showMinPrice"
                        zero
                        @selected="closeMin"/>
                </ButtonWithIcon>
                <ButtonWithIcon 
                    :text="maxPriceText" 
                    icon="down"
                    ref="price-max"
                    @clicked="togglePriceModal('price-max')">
                    <ListPricesModal 
                        activator="price-max" 
                        :show="showMaxPrice"
                        @selected="closeMax"/>
                </ButtonWithIcon>
            </div>
        </template>
        <template v-slot:footer>
            <Button flat solid >Mostrar viviendas</Button>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal       from './BaseModal.vue';
import ListPricesModal from './ListPricesModal.vue';
import Button          from '../Button.vue';
import ButtonWithIcon  from '../ButtonWithIcon.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
    components: {
        BaseModal,
        Button,
        ButtonWithIcon,
        ListPricesModal
    },
    props: {
        activator: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            showMinPrice: false,
            showMaxPrice: false,
            kinds: [{
                text: 'Casa'
            },
            {
                text: 'Piso'
            },
            {
                text: 'Duplex'
            }]
        }
    },
    computed:{
        ...mapGetters(['maxPrice', 'minPrice']),

        minPriceText(){
            if(this.minPrice === '') return 'Mínimo'
            if(this.minPrice < 0)   return 'Sin Límite' 
            
            return this.$formatCurrency(this.minPrice)
        },

        maxPriceText(){
            if(this.maxPrice === '') return 'Máximo'
            if(this.maxPrice < 0)   return 'Sin Límite' 
            
            return this.$formatCurrency(this.maxPrice)
        }
    },
    methods: {
        ...mapMutations(['setMaxPrice', 'setMinPrice']),

        togglePriceModal(name) {
            if('price-min' == name) {
                this.showMinPrice = !this.showMinPrice
            }
            if('price-max' == name) {
                this.showMaxPrice = !this.showMaxPrice;
            }
        },

        closeMin(){
            this.showMinPrice = false;
        },

        closeMax(){
            this.showMaxPrice = false;
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
    pointer-events: all;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

.price-form{
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 5px;
    padding: 10px;
    pointer-events: all;
    
    &>label{
        font-size: 0.6rem;
        font-weight: 600;
        width: calc(50% - 5px);
    }
    &>div{
        width: calc(50% - 5px);
    }
}

</style>