<template>
    <BaseModal :activator="activator" :centered="$isMobile()">
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
                    @clicked="toggleModal('price-min')">
                    <Dropdown 
                        activator = "price-min" 
                        :show="active == 'price-min'"
                        :list = "pricesMin"
                        :selected = "minPrice"
                        @selected = "setMin"/>
                </ButtonWithIcon>
                <ButtonWithIcon 
                    :text="maxPriceText" 
                    icon="down"
                    ref="price-max"
                    @clicked="toggleModal('price-max')">
                    <Dropdown 
                        activator = "price-max" 
                        :show="active == 'price-max'"
                        :list = "pricesMax"
                        :selected = "maxPrice"
                        @selected = "setMax"/>
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
import Dropdown        from './Dropdown.vue';
import Button          from '../Button.vue';
import ButtonWithIcon  from '../ButtonWithIcon.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
    components: {
        BaseModal,
        Button,
        ButtonWithIcon,
        Dropdown
    },

    props: {
        activator: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            active: '',
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
        },

        pricesMin(){
            let result = [0, ...this.prices];

            if (this.maxPrice > 0) {
                result = result.filter(price => price < this.maxPrice)
            }

            result = result.map(price => {
                return {
                    value: price,
                    text: this.$formatCurrency(price)
                }
            })

            return [...result]
        },

        pricesMax(){
            let result = [...this.prices, 'Sin límite'];

            if (this.minPrice > 0) {
                result = result.filter(price => price > this.minPrice || price == 'Sin límite')
            }

            result = result.map(price => {
                if(isNaN(price))
                    return {
                        value: -1,
                        text: 'Sin límite'
                    }

                return {
                    value: price,
                    text: this.$formatCurrency(price)
                }
            })

            return [...result]
        },

        prices() {
            let result1 = Array(19).fill().map((item, i) => {
                return (i + 2) * 50
            });

            let result2 = Array(10).fill().map((item, i) => i * 100 + 1100);
            let result3 = [2100, 2400, 2700, 3000];

            return [...result1, ...result2, ...result3]
        }
    },
    methods: {
        ...mapMutations(['setMaxPrice', 'setMinPrice']),


        toggleModal(name) {
            if (this.active == '' || this.active != name){
                this.active = name;
                return;
            } 
            
            if (this.active == name)
                this.active = '';
        },

        setMin(value){
            this.setMinPrice(value)
            this.close()
        },

        setMax(value){
            this.setMaxPrice(value)
            this.close()
        },

        close(){
            this.active = '';
        },

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