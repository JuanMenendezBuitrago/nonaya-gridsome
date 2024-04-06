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
            <div id="map" >
                <div ref="mapContainer">
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import Sort           from '~/components/icons/Sort.vue';
import ButtonWithIcon from '~/components/ButtonWithIcon.vue';
import Menu           from '~/components/Menu.vue';
import Card           from '~/components/Card.vue';

import { Loader } from '@googlemaps/js-api-loader';


export default {
    components: {
        ButtonWithIcon,
        Menu,
        Card,
        Sort
    },
    data() {
        return {
            map: null,
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
    },

    methods: {
        initMap() {
            this.map = new google.maps.Map(this.$refs.mapContainer, {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });
        }
    },

    mounted() {
        const loader = new Loader({
            apiKey: process.env.GRIDSOME_MAPS_API_KEY,
            version: 'weekly'
        });

        loader.load().then(() => {
            this.initMap();
        });
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
    column-gap: 30px;

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
            column-gap: 0.5rem;

            &>svg {
                align-self: center;
            }

            .button {
                width: fit-content;
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
        align-self: flex-start;
        position: sticky;
        top: 20px;

        &>div{
            height:90vh;
        }
    }
}
</style>