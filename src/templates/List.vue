<template>
    <div class="app-list">
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
                <Card size="md" :cardData="cardData"></Card>
                <Card size="md" :cardData="cardData"></Card>
                <Card size="md" :cardData="cardData"></Card>
                <Card size="md" :cardData="cardData"></Card>
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

import { Loader }     from '@googlemaps/js-api-loader';

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
                pictures: [
                    "https://witei-media.s3.amazonaws.com/pics/3941900-8eaf9fa1.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-04f0ed44.jpg",   
                    "https://witei-media.s3.amazonaws.com/pics/3941900-a6954179.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-b733e4e4.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-25738f25.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-25e3cbdb.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-44275a4f.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-86f7f991.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-38cea40f.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-d9915573.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-c6a23989.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-7c298f27.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-cd7827e1.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-4c79ba54.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-d1f61ebb.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-6f5476ad.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-543e0dfe.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-4b6ff1ab.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-17b9ac2a.jpg",
                    "https://witei-media.s3.amazonaws.com/pics/3941900-dedf2440.jpg"
                ],
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
                
            const coordinates = [
                { lat: 41.42042000000, lng: 2.17585000000, price: '$300' }, 
                { lat: 41.41475000000, lng: 2.10842000000, price: '$400' }, 
                { lat: 41.37322687440, lng: 2.09409672720, price: '$500' }, 
            ];


            const bounds = new google.maps.LatLngBounds();

            coordinates.forEach(coordinate => {
                bounds.extend(new google.maps.LatLng(coordinate.lat, coordinate.lng));

                const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
                    position: coordinate,
                    map: this.map,
                });

            });

            // Set map center to the center of bounds
            this.map.setCenter(bounds.getCenter());

            // Set appropriate zoom level based on the bounds
            this.map.fitBounds(bounds);

        }
    },

    mounted() {
        const loader = new Loader({
            apiKey: process.env.GRIDSOME_MAPS_API_KEY,
            version: 'weekly',
            mapId: 'DEMO_MAP_ID',
            libraries: ['maps', 'marker']
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
    overflow-x: hidden;

    #list-content {

        flex: 1.618;
        display: flex;
        flex-wrap: wrap;
        column-gap: 15px;
        justify-items: stretch;
        align-content: flex-start;
        width: 100%;

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

        .card{
            width: calc((100% - 15px) / 2);
        }
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

/* For screens smaller than 414px  */
@media (max-width: 430px) {
    .app-list #map {
        display: none;
    }
    .app-list #list-container {
        padding: 15px;
    }
}

/* For screens between 415px and 767px (e.g., Small tablets) */
@media (min-width: 415px) and (max-width: 767px) {
  /* Your CSS styles for small tablets here */
}

/* For screens between 768px and 1024px (e.g., iPad) */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Your CSS styles for tablets here */
}

/* For screens between 1025px and 1279px (e.g., Larger tablets and small desktops) */
@media (min-width: 1025px) and (max-width: 1279px) {
  /* Your CSS styles for larger tablets and small desktops here */
}

/* For screens between 1280px and 1366px (e.g., Common desktop and laptop screens) */
@media (min-width: 1280px) and (max-width: 1366px) {
  /* Your CSS styles for common desktop and laptop screens here */
}

/* For screens between 1367px and 1439px */
@media (min-width: 1367px) and (max-width: 1439px) {
  /* Your CSS styles for screens between 1367px and 1439px here */
}

/* For screens between 1440px and 1679px */
@media (min-width: 1440px) and (max-width: 1679px) {
  /* Your CSS styles for screens between 1440px and 1679px here */
}

/* For screens between 1680px and 1919px */
@media (min-width: 1680px) and (max-width: 1919px) {
  /* Your CSS styles for screens between 1680px and 1919px here */
}

/* For screens between 1920px and 2559px */
@media (min-width: 1920px) and (max-width: 2559px) {
  /* Your CSS styles for screens between 1920px and 2559px here */
}

/* For screens larger than 2560px */
@media (min-width: 2560px) {
  /* Your CSS styles for large screens here */
}

</style>