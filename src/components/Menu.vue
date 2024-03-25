<template>
    <div class="menu">
        <div class="navigation">
            <div class="logo"><RentuosLogo/></div>
            <div class="items">
                <span>Propietarios <ChevronDown/></span>
                <span>Pisos en alquiler</span>
                <span>Consejos para propietarios</span>
                <span>Gana 150€</span>
            </div>
            <div class="search">
                <a href="" class="button">Calcular alquiler</a>
                <Search/>
            </div>
        </div>
        <div v-if="filters" class="filters">
            <DropdownButton icon="down" text="Contrato" :selected="true"/>
            <DropdownButton icon="down" text="Tipo de inmueble" />
            <DropdownButton icon="down" text="Habitaciones"/>
            <DropdownButton icon="down" text="Baños"/>
            <DropdownButton icon="filter" text="Filtros" :filterCount="filterCount"/>
        </div>
        <div v-else class="navigation2"> 
            <div class="left">
                <DropdownButton icon="left" text="Volver" />
            </div>
            <div class="right">
                <DropdownButton icon="left" text="Anterior" flat/>
                <DropdownButton icon="right" text="Siguiente" flat/>
            </div>
        </div>
    </div>
</template>

<script>
import ChevronDown from '~/components/icons/ChevronDown.vue';
import Search      from '~/components/icons/Search.vue';
import RentuosLogo from '~/components/RentuosLogo.vue';
import DropdownButton from '~/components/DropdownButton.vue';

export default {
    components:{
        ChevronDown, Search, DropdownButton, RentuosLogo
    },
    props: {
        filters: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data(){
        return {
            filterCount: 1
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~/assets/variables.scss';

    .navigation, .navigation2, .filters{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        font-weight: 500;
        font-size: 0.8rem;
        border-bottom: 1px solid $gray-light;
    }

    .navigation2{
        border-bottom: none;
    }

    .left, .right{
        display: flex;
        flex-direction: row;
        .button{
            border-color: $orange;
            color: $orange;
            
        }
    }
 
    .logo{
        display: flex;
        align-items: center;
        svg{
            height:100%;
            width: auto;
        }
    }

    .items{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        span{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.5rem 1rem;
            

            svg{
                margin-left: 0.5rem;
            }
        }
    }

    .search{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        .button{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.5rem 1rem;
            border: 1px solid $gray;
            border-radius: 3px;
            margin-right: 1.5rem;
        }
        a{
            text-decoration: none;
            color: inherit;
        }
        svg{
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    .filters{
        justify-content: flex-start;
        padding: 1.25rem;
    }
</style>