<template>
    <div>
        <div>
            <Menu :filters="true" :hero="$context.neighborhood"/>
        </div>
        <div id="list-container">
            <div id="list-content">
                <h1>Viviendas en alquiler en Gràcia, Barcelona </h1>
                <h3>{{ numUnits }} pisos y casas en alquiler</h3>
                <div class="sort">
                    <Sort /> Ordenar
                    <ButtonWithIcon icon="down" text="Más barato" />
                </div>
                <Card size="md" :data="cardData"></Card>
                <Card size="md" :data="cardData"></Card>
                <Card size="md" :data="cardData"></Card>
                <Card size="md" :data="cardData"></Card>
            </div>
            <div id="map">

            </div>
        </div>
    </div>
</template>


<script>
import Sort from '~/components/icons/Sort.vue';
import ButtonWithIcon from '~/components/ButtonWithIcon.vue';
import Menu from '~/components/Menu.vue';
import Card from '~/components/Card.vue';
import { store } from '~/data/store.js';

export default {
    components: {
        ButtonWithIcon,
        Menu,
        Card,
        Sort
    },
    data() {
        return {
            numUnits: 4,
            cardData: {
                habs: 3,
                bathrooms: 2,
                m2: 150,
                floor: 3,
                picture: "https://picsum.photos/200/300",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quis pariatur labore laudantium ducimus necessitatibus..."
            }
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';


#list-container {
    display: flex;
    padding: 15px 30px;
    width: 100%;
    min-height: 100vh;
    align-items: stretch;

    #list-content {
        h1 {
            width: 100%;
            margin-bottom: 0;
        }

        h3 {
            margin-top: 0;
            color: $gray-dark;
            width: 100%;
        }

        .sort {
            padding: 5px;
            margin-bottom: 10px;
            display: flex;
            width: 100%;
            font-size: 0.75rem;
            justify-content: flex-start;
            align-items: baseline;

            &>svg {
                align-self: center;
                margin-right: 5px;
            }

            .button {
                width: fit-content;
                margin-left: 10px;
            }
        }

        flex: 1.618;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;

    }

    #map {
        flex: 1;
    }
}
</style>