<template>
    <BaseModal :activator="activator" :hideOverflow="false" :centered="$isMobile()" :classes="{ 'filters-modal': true }">

        <template v-slot:header>
            <h1>Filtros</h1>
        </template>

        <template v-slot:body>
            <div class="filters-grid">

                <h1 class="full-width">Tipo de construcción</h1>
                <div class="checkbox"
                @click.stop="toggle('secondHand')"">
                    <Checkbox  :checked="secondHand"> segunda mano</Checkbox>
                </div>
                <div class="checkboxs"
                @click.stop="toggle('isNew')">
                    <Checkbox :checked="isNew"> obra nueva</Checkbox>
                </div>

                <hr class="full-width"/>

            
                <h1 class="full-width">Tipo de vivienda</h1>
                <section>
                    <div class="checkbox"
                    @click.stop="toggle('apartmentAll')">
                        <Checkbox :checked="apartmentAll"> todos los pisos</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('apartmentMiddle')">
                        <Checkbox
                        :checked="apartmentMiddle || apartmentAll"> plantas intermedias</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('apartmentFirst')">
                        <Checkbox
                        :checked="apartmentFirst || apartmentAll"> apartamento</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('apartmentAtic')">
                        <Checkbox
                        :checked="apartmentAtic || apartmentAll"> ático</Checkbox>
                    </div>
                </section>
                <section>
                    <div class="checkbox"
                    @click.stop="toggle('houseAll')">
                        <Checkbox
                        :checked="houseAll"
                        > todas las casas</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('houseChalet')">
                        <Checkbox
                        :checked="houseChalet || houseAll"> casa o chalet</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('houseRustic')">
                        <Checkbox
                        :checked="houseRustic || houseAll"> finca rústica</Checkbox>
                    </div>
                    <div class="checkbox indent"
                    @click.stop="toggle('houseTerraced')">
                        <Checkbox
                        :checked="houseTerraced || houseAll"> casa adosada</Checkbox>
                    </div>
                </section>
            </div>
        </template>

        <template v-slot:footer>
            <Button flat solid>Mostrar viviendas</Button>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal        from './BaseModal.vue';
import Button           from '../Button.vue';
import Checkbox         from '~/components/icons/Checkbox.vue';
import PricesDropdown   from '~/components/modals/PricesDropdown.vue';
import KindModal        from '~/components/modals/KindModal.vue';
import RentModal        from '~/components/modals/RentModal.vue';
import ButtonWithIcon   from '~/components/ButtonWithIcon.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
    name: 'FiltersModal',

    components: {
        BaseModal,
        Button,
        Checkbox,
        PricesDropdown,
        ButtonWithIcon,
        RentModal,
        KindModal
    },

    props: {
        activator: {
            type: String,
            required: false
        }
    },

    data() {
        return {
            active:'',
        }
    },

    computed:{
        ...mapGetters(['maxPrice', 'minPrice', 'contract', 'rentText', 'kindText', 'apartmentAll', 'apartmentAtic', 'apartmentFirst', 'apartmentMiddle','houseAll', 'houseRustic', 'houseTerraced', 'houseChalet', 'isNew', 'secondHand' ]),

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
        ...mapMutations(['setKind','setMaxPrice', 'setMinPrice', 'setApartmentAll', 'setApartmentAtic', 'setApartmentFirst', 'setApartmentMiddle', 'setHouseAll', 'setHouseRustic', 'setHouseTerraced', 'setHouseChalet', 'setIsNew', 'setSecondHand']),

        toggleModal(name) {
            if (this.active == '' || this.active != name){
                this.active = name;
                return;
            } 
            
            if (this.active == name)
                this.active = '';
        },

        toggle(name){
            if (name == 'apartmentAll'){
                this.setApartmentAll(!this.apartmentAll)
            }
            
            if (name == 'apartmentAtic'){
                this.setApartmentAtic(!this.apartmentAtic)
            }
            
            if (name == 'apartmentFirst'){
                this.setApartmentFirst(!this.apartmentFirst)
            }
            
            if (name == 'apartmentMiddle'){
                this.setApartmentMiddle(!this.apartmentMiddle)
            }
            
            if (name == 'houseAll'){
                this.setHouseAll(!this.houseAll)
            }
            
            if (name == 'houseRustic'){
                this.setHouseRustic(!this.houseRustic)
            }
            
            if (name == 'houseTerraced'){
                this.setHouseTerraced(!this.houseTerraced)
            }
            
            if (name == 'houseChalet'){
                this.setHouseChalet(!this.houseChalet)
            }
            
            if (name == 'isNew'){
                this.setIsNew(!this.isNew)
            }
            
            if (name == 'secondHand'){
                this.setSecondHand(!this.secondHand)
            }
            
        },
        close(){
            this.active = '';
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.filters-modal {
    width: 350px;

    .modal-body {

        h1,
        label {
            font-size: 0.75rem;
            font-weight: 600;
        }
    }
    
    hr{
        width: 100%;
        height: 1px;
        border: none;
        border-top: 1px solid $gray-light;
        margin-block: 20px 15px;
    }
}

.filters-grid {
    display: grid;
    margin: 10px;
    gap: 6px;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

    >.full-width {
        grid-column: 1 / -1;
    }

    section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        row-gap: 6px;
    }
}


.checkbox {
    font-size: 0.8rem;

    &.indent {
        padding-left: 10px;
    }
}
</style>