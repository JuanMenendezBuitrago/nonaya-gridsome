<template>
    <div id="menu">

        <!-- menu 1 -->

        <div id="navigation">
            <div id="logo"><RentuosLogo/></div>
            <div id="items">
                <span>Propietarios <ChevronDown/></span>
                <span>Pisos en alquiler</span>
                <span>Consejos para propietarios</span>
                <span>Gana 150€</span>
            </div>
            <div id="search">
                <a href="" class="button">Calcular alquiler</a>
                <Search/>
            </div>
        </div>

        <!-- hero -->

        <div v-if="hero" id="hero">
            <div class="content">
                <div class="left-content">
                    <div class="breadcrumb">
                        Barcelona Capital <ChevronRight/> Todos los barrios
                    </div>
                    <h1>foo bar</h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, amet voluptatum? Et harum quo architecto quam! Ad quia placeat sed commodi odit unde dolores quasi laborum? A molestiae alias nesciunt, reprehenderit cumque vitae deleniti magni obcaecati ab mollitia temporibus. Adipisci beatae voluptates recusandae velit, sunt consequatur modi fugit culpa magnam.
                </div>
                <div class="right-content">
                    <h2 class="title"><Price/>Precio medio de alquiler en Gràcia</h2>
                    <div class="box-1">
                        <h1>
                            16,45€
                        </h1>
                        <span>
                            Precio del alquiler por m<sup>2</sup>
                        </span>
                    </div>
                    <div class="box-2">
                        <h1>
                            1.316€<sub>/mes</sub>
                        </h1>
                        <span>
                            Renta de una vivienda de 80 m<sup>2</sup>
                        </span>
                    </div>
                    <div class="caption">Fuente: fotocasa.com</div>
                </div>
            </div>
        </div>

        <!-- menu 2 -->

        <div v-if="filters" id="filters">
            <ButtonWithIcon 
                icon="down" 
                :text="contractText == '' ? 'Contrato' : contractText" 
                :selected="contractText == '' ? false : true" 
                reference="contract" 
                @clicked="toggleModal('contract')">
                <ContractModal activator="contract" @selectedValue="changeContractText"/>
            </ButtonWithIcon>

            <SearchBox/>
            
            <ButtonWithIcon 
                icon="down" 
                :text="kindText == '' ? 'Tipo de inmueble' : kindText" 
                :selected="kindText == '' ? false : true" 
                reference="kind" 
                @clicked="toggleModal('kind')">
                <KindModal activator="kind" @selectedValue="changeKindText"/>
            </ButtonWithIcon>

            <ButtonWithIcon 
                icon="down" 
                text="Precio" 
                reference="price" 
                @clicked="toggleModal('price')">
                <PriceModal activator="price"/>
            </ButtonWithIcon>

            <ButtonWithIcon 
                icon="down" 
                text="Habitaciones" 
                reference="bedrooms" 
                @clicked="toggleModal('bedrooms')">
                <BedroomsModal activator="bedrooms"/>
            </ButtonWithIcon>

            <ButtonWithIcon 
                icon="down" 
                text="Baños" 
                reference="bathrooms" 
                 @clicked="toggleModal('bathrooms')">
                <BathroomsModal activator="bathrooms"/>
            </ButtonWithIcon>

            <ButtonWithIcon 
                icon="filter" 
                text="Filtros" 
                :count="filterCount" 
                reference="filters">
                <Modal activator="filters"/>
            </ButtonWithIcon>
        </div>

        <div v-else id="navigation-2"> 
            <div class="left">
                <ButtonWithIcon icon="left" text="Volver" selected/>
            </div>
            <div class="right">
                <ButtonWithIcon icon="left" text="Anterior" selected simple flat/>
                <ButtonWithIcon icon="right" text="Siguiente" selected simple flat/>
            </div>
        </div>
    </div>
</template>

<script>
import ChevronDown    from '~/components/icons/ChevronDown.vue';   
import ChevronRight   from '~/components/icons/ChevronRight.vue';   
import Search         from '~/components/icons/Search.vue';
import Price          from '~/components/icons/Price.vue';
import SearchBox      from '~/components/SearchBox.vue';
import RentuosLogo    from '~/components/RentuosLogo.vue';
import Modal          from '~/components/Modal.vue';
import ContractModal  from '~/components/modals/ContractModal.vue';
import KindModal      from '~/components/modals/KindModal.vue';
import BathroomsModal from '~/components/modals/BathroomsModal.vue';
import BedroomsModal  from '~/components/modals/BedroomsModal.vue';
import PriceModal     from '~/components/modals/PriceModal.vue';
import ButtonWithIcon from '~/components/ButtonWithIcon.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
    components:{
        ChevronDown, 
        Search, 
        ButtonWithIcon, 
        RentuosLogo, 
        SearchBox, 
        ChevronRight, 
        Price, 
        Modal,
        ContractModal,
        BathroomsModal,
        BedroomsModal,
        KindModal,
        PriceModal
    },
    props: {
        hero: {
            type: Boolean,
            required: false,
            default: false
        },
        filters: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data(){
        return {
            filterCount: 1,
            contractText: '',
            kindText: ''
        }
    },

    computed:{
        ...mapGetters(['activeModal'])
    },

    methods: {
        ...mapMutations(['setActiveModal']),

        toggleModal(name) {
            let activeModal = this.activeModal;
            if(activeModal == name) {
                this.setActiveModal('');
            }
            else{
                this.setActiveModal(name);
            }
        },
        changeKindText(text){
            this.kindText = text;
            this.setActiveModal('');
        },
        changeContractText(text){
            this.contractText = text;
            this.setActiveModal('');
        }
    }
}
</script>

<style lang="scss">
    @import '~/assets/variables.scss';

    #navigation, #navigation-2, #filters{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        padding: 1rem;
        font-weight: 500;
        font-size: 0.8rem;

        border-bottom: 1px solid $gray-light;
    }

    #filters{
        justify-content: flex-start;
        font-weight: 400;
        padding: 1.25rem;
        column-gap: 0.5rem;
    }

    #hero{
        width: 100%;
        height: 420px;
        display: flex;
        justify-content: center;
        align-items: center;

        background-image: url(https://picsum.photos/2000);
        background-size: cover;
        
        .content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: stretch;

            width: 75vw;
            height: 70%;
            border-radius: 15px;
            background-color: white;
            padding: 30px;

            
            .left-content {
                font-size: 0.8rem;
                flex: 1.5;
                
                
                .breadcrumb{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;

                    svg{
                        path{
                            fill: $orange;
                        }
                    }
                }

                h1{
                    font-size:1.5rem;
                }

                .text{
                    font-size: 0.75rem;
                }
            }
            .right-content {
                flex: 1;
                margin-left: 10px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 0fr 1fr 0fr;
                gap: 5px 15px;
                grid-auto-flow: row;
                grid-template-areas:
                    "title title"
                    "box-1 box-2"
                    "caption caption";
                width: 100%;
                height: 50%;
            }

            h2{
                font-size: 1rem;
                margin-bottom: 5px;
                display: flex;
                align-items: center;
                svg{
                    margin-right: 5px;
                    width:2rem;
                    height:2rem;
                }
            }

            .title { 
                grid-area: title; 
              
            }

            .box-1 { 
                grid-area: box-1; 
            }

            .box-2 { 
                grid-area: box-2; 
            }

            .box-1, .box-2{
                text-align: center;
                border-radius: 10px;
                border: 1px solid $gray-light;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                font-size: 0.8rem;
                line-height: 0.85rem;
                padding: 30px;

                h1{
                    color: $orange;
                    font-size: 1.6rem;
                    margin-bottom: 10px;
                    sub{
                        top: -5px;
                        font-size: 1rem;
                        color: inherit;
                    }
                }
            }

            

            .caption { 
                grid-area: caption; 
                font-size: 0.75rem;
                color: $gray;
                text-align: right;
            }

        }
    }
    

    #navigation-2{
        border-bottom: none;
        
        .left, .right{
            display: flex;
            flex-direction: row;
            .button{
                border-color: $orange;
                color: $orange; 
            }
        }
    }
 
    #logo{
        display: flex;
        align-items: center;

        svg{
            height:100%;
            width: auto;
        }
    }

    #items{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        
        
        span{
            transition: all .2s ease-in;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.5rem 1rem;

            &:hover{
                color: $orange;            
                svg{
                    path{
                        fill: $orange;
                    }
                }
            }
            svg{
                margin-left: 0.5rem;
                path{
                    transition: all .2s ease-in;
                    fill: $black;
                }
            }
        }
    }

    #search{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        &:hover{
            .button{
                border-color: $orange;
            }
            a{
                color: $orange;
            }
        }
        .button{
            transition: all .2s ease-in;
            display: flex;
            flex-direction: row;
            align-items: center;

            padding: 0.5rem 1rem;
            margin-right: 1.5rem;

            border: 1px solid $gray;
            border-radius: 3px;
        }
        a{
            transition: all .2s ease-in;
            text-decoration: none;
            color: inherit;
        }
        svg{
            width: 1.5rem;
            height: 1.5rem;
        }
    }

</style>