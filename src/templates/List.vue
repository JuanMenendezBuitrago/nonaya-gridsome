<template>
    <div class="app-list">
        <div>
            <Menu 
            :filters  = "true" 
            :isMobile = isMobile
            :hero     = "$context.hero"
            :searchType = "$context.searchType"
            :location   = location />
        </div>
        <div id = "list-container">
            <div id = "list-content">
                <h1>Viviendas en alquiler en {{ location }} </h1>
                <h3>{{ $context.units.length }} pisos y casas en alquiler</h3>
                <div class="sort">
                    <Sort /> Ordenar
                    <ButtonWithIcon 
                        icon = "down" 
                        ref = "sort"
                        reference = "sort"
                        :text = "( sortText || sort.text)"
                        @clicked = "toggleShowSort">
                        <SortByModal 
                            activator = "sort"
                            :noCoords = "true"
                            @selected = "setSort"/>
                    </ButtonWithIcon>
                </div>
                <Card v-for="(unit, index) in units" :key="`unit_${index}`"
                    size="md" 
                    :index="index"
                    :isMobile = isMobile
                    :cardData="{
                        floor:     unit.floor,
                        habs:      unit.bedrooms,
                        bathrooms: unit.bathrooms,
                        slug:      unit.slug,
                        m2:        unit.area,
                        cost:      unit.cost,
                        street:    unit.location.street,
                        town:      unit.location.town,
                        description: unit.description,
                        pictures :   unit.pictures
                    }" 
  
                    contact
                    @clicked-contact="showContactModal=true"></Card>
            </div>
            <div id="map" >
                <div ref="mapContainer">
                </div>
            </div>
        </div>
        <ContactModal 
            v-if="showContactModal"
            type   = "list"
            :back  = "isMobile"
            :close = "!isMobile"
            @close = "showContactModal=false"/>
    </div>
</template>


<script>
import Sort           from '~/components/icons/Sort.vue';
import ButtonWithIcon from '~/components/ButtonWithIcon.vue';
import Menu           from '~/components/Menu.vue';
import Card           from '~/components/Card.vue';
import ContactModal   from '~/components/modals/ContactModal.vue';
import SortByModal    from '~/components/modals/SortByModal.vue';

import { Loader }     from '@googlemaps/js-api-loader';
import { mapGetters, mapMutations } from 'vuex';

export default {
    components: {
        ButtonWithIcon,
        Menu,
        Card,
        ContactModal,
        SortByModal,
        Sort
    },

    data() {
        return {
            screenWidth: 0,
            screenHeight: 0,
            map: null,
            showContactModal: false,
            showSort: false,
            units: [],
            sort: {
                text: 'Más barato',
                way:  1,
                by:   'cost',
            },
            filters: {
                minPrice: 0,
                maxPrice: 1000,
                minBedrooms: 1,
                maxBedrooms: 3,
                minBathrooms: 1,
                maxBathrooms: 2,
                contract: 'rent',
                type: 'piso',
                town: 'Barcelona',
                neighborhood: 'Gracia',
            }
        }
    },

    watch:{
        changedSort(new_val, old_val){
            console.log('foo')
            this.refresh();
        }
    },

    computed:{
        ...mapGetters(['activeModal', 'sortText', 'sortBy', 'sortByWay']),

        location() {
            if (this.$context.searchType == 'city') 
                return this.$context.units[0].location.town

            if (this.$context.searchType == 'district') 
                return `${this.$context.units[0].location.district}, ${this.$context.units[0].location.town}`

            if (this.$context.searchType == 'neighborhood') 
                return `${this.$context.units[0].location.neighborhood}, ${this.$context.units[0].location.town}`
        },

        isMobile() {
            return this.screenWidth > 0 && this.screenWidth < 431
        },

        isEnough() {
            const counter = {
                available: 0,
                total:     0
            }
            const conditions = this.$context.units.reduce((acc, curr) => {
                acc.available += curr.status == 'available' ? 1 : 0;
                acc.total     += 1;
                return acc;
            }, counter);

            return conditions.available > 0 || conditions.total > 2;
        },

        changedSort() {
            return this.sortBy + this.sortByWay + this.sortText;
        },

    },

    methods: {
        ...mapMutations(['setActiveModal', 'setSortByWay', 'setSortBy', 'setSortText']),

        toggleShowSort() {
            if (this.activeModal == 'sort') {
                this.setActiveModal('');
            }
            else {
                this.setActiveModal('sort');
            }
        },

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

        },

        updateDimensions() {
            this.screenWidth  = window.innerWidth;
            this.screenHeight = window.innerHeight;
        },

     

        setSort(sortData) {
            this.setSortText ( sortData.sortText);
            this.setSortByWay( sortData.sortByWay);
            this.setSortBy   ( sortData.sortBy);
            this.setActiveModal('');
        },

        refresh(){
            let result = this.units.sort((unit_a,unit_b) => {
                return (unit_a[this.sortBy] - unit_b[this.sortBy]) * this.sortByWay
            });
            
            this.units = [...result];
        }
    },

    created() {
        if (this.isEnough)
            console.log('OK')
        else
            console.log('redirect')

        this.units = [...this.$context.units]
        this.refresh();
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
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.updateDimensions);
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
                width: 1.25rem;
                height: auto;
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