<template>
    <div class="app-detail">
        <Menu :isMobile="isMobile" />

        <Media v-if="isMobile" :single="true" :pictures="$context.pictures" @clickedPicture="showPicture" />

        <Media :single="false" :pictures="$context.pictures" @clickedPicture="showPicture" />

        <div id="unit-container">
            <div id="main">
                <div id="unit-header">
                    <div class="first-line">
                        <div>
                            <span class="cost">{{ $formatCurrency($context.cost) }}</span><span v-if="$context.contract == 'rent'"
                                class="mes">/mes</span>
                        </div>
                        <div class="code">
                            <Tag />
                            <span style="margin-right:15px;">Ref: {{ $context.id }}</span>
                            <Pill :content="$context.status" />
                        </div>
                    </div>
                    <div class="features">
                        <Feature icon="room"     :line1="bedrooms" />
                        <Feature icon="bathroom" :line1="bathrooms" />
                        <Feature icon="area"     :line1="area" />
                        <Feature icon="floor"    :line1="floor" />
                    </div>
                </div>
                <div id="unit-content">
                    <h1 class="title">
                        {{ $context.title }}
                    </h1>
                    <h3 class="town">
                        {{ $context.location.town }}
                    </h3>

                    <div v-if="isMobile" id="unit-location">
                        <div class="placeholder" ref="mapContainer">

                        </div>
                    </div>

                    <div class="description"
                        v-html="(descriptionPieces > 1 && !showMore ? cutDescription[0] + '...' : cutDescription[0] + cutDescription[1])">
                    </div>

                    <span class="showMore" @click="toggleShowMore()"
                        v-html="showMore ? 'Mostrar menos' : 'Leer más'"></span>

                </div>

                <div id="unit-features">
                    <h1 class="title">Caracterísiticas</h1>
                    <Feature icon="kind" line1="Tipo de inmueble" :line2="$context.kind" />
                    <Feature icon="condition" line1="Estado" line2="Buen estado" />
                    <Feature icon="heating" line1="Calefacción" line2="Bomba de calor" />
                    <Feature icon="elevator" line1="Ascensor" line2="Sí" />
                    <Feature icon="furnished" line1="Amueblado" line2="Sí" />
                    <Feature icon="ac" line1="Aire acondicionado" line2="No" />
                    <Feature v-if="$context.energy.consumption" icon="energy" line1="Consumo de energía"
                        :line2="$context.energy.consumption + 'Mw h m<sup>2</sup>/año'" />

                    <div id="pills">
                        <Pill content="Armarios" />
                        <Pill content="Parquet" />
                        <Pill content="Electrodomésticos" />
                        <Pill content="Horno" />
                        <Pill content="Lavadora" />
                        <Pill content="Microondas" />
                    </div>
                </div>

                <div id="unit-conditions">
                    <h1 class="title">Condiciones de{{ tipoContrato }}</h1>
                    <Feature icon="euro" line1="Fianza" line2="2 meses" />
                    <Feature icon="hourglass" line1="Tipo de contrato" line2="Temporada" />
                    <Feature icon="paw" line1="Admite mascotas" line2="Sí" />
                </div>

                <div v-if="!isMobile" id="unit-location">
                    <h1 class="title">Ubicación aproximada</h1>
                    <div class="placeholder" ref="mapContainer">

                    </div>
                </div>

            </div>

            <!-- sidebar -->

            <div id="sidebar">
                <Contact :type="type"/>
            </div>

        </div>

        <div id="same-neighborhood">
            <div class="same-neighborhood-header">
                <h1 class="title">Otros inmuebles en {{ $context.location.neighborhood }}</h1>
                <div class="buttons">
                    <RoundButton v-if="sameNeighborhoodIndex > 0" icon="left" @clicked="decrementSameNeighborhood"/>
                    <RoundButton v-if="sameNeighborhoodIndex < (sameNeighborhoodPages - 1)" icon="right" @clicked="incrementSameNeighborhood"/>
                </div>
            </div>
            <div class="cards-overflow" ref="same-neighborhood">
                <div class="cards" :style="{transform: `translateX(${-sameNeighborhoodIndex*neighborhoodGalleriesWidth}px)`}">
                    <Card v-for="unit, i in this.sameNeighborhood"
                        :key="`same_${i}`" 
                        :index="i" 
                        :cardData="unit"
                        size="sm" />
                </div>
            </div>
        </div>

        <div v-if="this.sameNeighborhoodRented.length > 0" id="history">
            <div class="history-header">
                <h1 class="title">Viviendas alquiladas recientemente en {{ $context.location.neighborhood }} [Si no hubiera resultasdos]
                    <div class="history-subheader">
                        En este momento, no disponemos de más viviendas que coincidan con tus preferencias.<br>
                        Sin embargo, te mostramos algunas opciones que han sido alquiladas recientemente.
                    </div>
                </h1>
                <div class="buttons">
                    <RoundButton v-if="historyIndex > 0 " icon="left" @clicked="decrementHistory"/>
                    <RoundButton v-if="historyIndex < (historyIndex - 1) " icon="right" @clicked="incrementHistory"/>
                </div>
            </div>

            <div class="cards-overflow" ref="history">
                <div class="cards" :style="{transform: `translateX(${-historyIndex*historyGalleriesWidth}px)`}">
                    <Card v-for="unit, i in this.sameNeighborhoodRented"
                        :key="`same_${i}`" 
                        :index="i" 
                        :cardData="unit"
                        rented 
                        size="sm" />
                    
                </div>
            </div>
        </div>

        <Footer :unit="$context" />

        <div v-if="isMobile" id="contact">
            <Button 
                solid 
                fullWidth 
                @clicked="showContactModal=true">
                <Mail/>Contactar
            </Button>
        </div>

        <Gallery 
            v-if="showGallery" 
            :pictures="$context.pictures" 
            :indexStart="galleryIndexStart"
            @closeMe="closeGallery" />

        <ContactModal 
            v-if="showContactModal"
            type="detail"
            :back="isMobile"
            :close="!isMobile"
            @close="showContactModal=false"/>
    </div>
</template>



<script>

import Gallery     from '~/components/Gallery.vue';
import Menu        from '~/components/Menu.vue';
import Footer      from '~/components/Footer.vue';
import Media       from '~/components/Media.vue';
import Feature     from '~/components/Feature.vue';
import Pill        from '~/components/Pill.vue';
import Card        from '~/components/Card.vue';
import Tag         from '~/components/icons/Tag.vue';
import Mail        from '~/components/icons/Mail.vue';
import RoundButton from '~/components/RoundButton.vue';
import Button      from '~/components/Button.vue';
import Contact     from '~/components/Contact.vue';
import ContactModal from '~/components/modals/ContactModal.vue';

import { Loader } from '@googlemaps/js-api-loader';


export default {
    components: {
        Gallery,
        Menu,
        Media,
        Feature,
        Pill,
        Tag,
        Mail,
        Card,
        RoundButton,
        Footer,
        Button,
        Contact,
        ContactModal
    },

    data() {
        return {
            type: 'detail',
            screenHeight: 0,
            screenWidth: 0,

            neighborhoodGalleriesWidth: 0,
            historyGalleriesWidth: 0,
            historyIndex: 0,
            sameNeighborhoodIndex: 0,
            historyPages: 0,
            sameNeighborhoodPages: 0,

            galleryIndexStart: 0,
            showGallery: false,
            showContactModal: false,
            contactType:'',
            maxWords: 100,
            showMore: false,
            mapLoader: null,

            sections: {
                features:{
                    energy : {
                        type: String ,
                        title: 'Consumo de energía',
                        values:['energy.certificate_display',
                                'energy.consumption']
                    },
                    unit_type: {
                        type: String,
                        title: 'Tipo de inmueble',
                        values:['kind']
                    },
                    elevator: {
                        type: Boolean,
                        title: 'Ascensor',
                        values:['ascensor','escaleras']
                    },
                    condition: {
                        type: String,
                        title: 'Estado',
                        values:['tag.finca reformada',
                                'tag.a estrenar',
                                'tag.obra nueva',
                                'tag.buen estado',
                                'tag.reformado',
                                'tag.recién pintado']
                    },
                    furnished: {
                        type: String,
                        title: 'Amueblado',
                        values:['tag.amueblado', 
                                'tag.no amueblado', 
                                'tag.semi-amueblado']
                    },
                    ac: {
                        type: Boolean,
                        title: 'Aire acondicionado',
                        values:['tag.aire acondicionado']
                    },
                    heating: {
                        type: String,
                        title: 'Calefacción',
                        values:['tag.calefacción individual: bomba de frío/calor',
                                'tag.calefacción gas natural central',
                                'tag.calefacción gas natural individual',
                                'tag.calefacción eléctrica',
                                'tag.calefacción gasoil',
                                'tag.calefacción individual',
                                'tag.calefacción central',
                                'tag.aerotermia']
                    },
                    garden: {
                        type: Boolean, //TODO
                        title: 'Jardín',
                        values:['tag.jardín',
                                'tag.jardín comunitario',
                                'tag.zona verde',]
                    },
                    patio: {
                        type: Boolean, //TODO
                        title: 'Patio comunitario',
                        values:['tag.patio de uso']
                    },
                    balcony: {
                        type: Boolean,
                        title: 'Balcón',
                        values:['tag.balcón']
                    },
                    terrace: {
                        type: Boolean,
                        title: 'Terraza',
                        values:['tag.terraza']
                    },
                    pool: {
                        type: Boolean,
                        title: 'Piscina',
                        values:['tag.piscina comunitaria',
                                'tag.piscina']
                    },
                    parking: {
                        type: String,
                        title: 'Parking',
                        values:['tag.edificio con garaje',
                                'tag.plaza garaje incluida',]
                    },
                    storage: {
                        type: String,
                        title: 'Trastero',
                        values:['tag.trastero',
                                'tag.trastero incluido']
                    }
                }, 
                conditions:{
                    deposit: {
                        type: String,
                        title: 'Depósito',
                        values:[]
                    },
                    pets: {
                        type: Boolean,
                        title: 'Mascotas',
                        values:['tag.animales',
                                'tag.no mascotas']
                    },
                    contract_type: {
                        type: String,
                        title: 'Tipo de contrato',
                        values:[]
                    }
                },
                description:{
                    deposit: {
                        type: String,
                        values:['bedrooms']
                    },
                    pets: {
                        type: Boolean,
                        values:['bathrooms']
                    },
                    contract_type: {
                        type: String,
                        values:['area']
                    },
                    contract_type: {
                        type: String,
                        values:['floor']
                    }
                }
            },
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
    computed: {
        isMobile() {
            return this.screenWidth > 0 && this.screenWidth < 431
        },

        cutDescription() {
            let text = this.$context.description.replace(/\n/g, '<br>');
            let words = text.split(' ');

            if (words.length <= this.maxWords) {
                return [text];
            }

            let textoRecortado = words.slice(0, this.maxWords - 20).join(' ');
            let textoRestante = words.slice(this.maxWords - 20).join(' ');

            return [textoRecortado, textoRestante];
        },

        descriptionPieces() {
            return this.cutDescription.length;
        },

        bedrooms() {
            let amount = this.$context.bedrooms;
            let result = amount + ' hab' + (amount > 1 ? 's.' : '.');
            return (result);
        },

        bathrooms() {
            let amount = this.$context.bathrooms;
            let result = amount + ' baño' + (amount > 1 ? 's' : '');
            return (result);
        },

        area() {
            let amount = this.$context.area;
            let result = `${amount}m<sup>2</sup>`;
            return (result);
        },

        floor() {
            let amount = this.$context.floor;
            let sup = (amount == 1 || amount == 3) ? 'er' : 'o';
            let result = amount + `<sup>${sup}</sup> piso`;
            return (result);
        },

        tipoContrato() {
            return this.$context.contract == 'rent' ? 'l alquiler' : 'la venta';
        },


        sameNeighborhood() {
            return this.$context.allUnits.filter(unit => {
                return unit.location.neighborhood == this.$context.location.neighborhood && unit.location.town == this.$context.location.town
            })
        },

        sameNeighborhoodRented() {
            return this.$context.allUnits.filter(unit => {
                return unit.location.neighborhood == this.$context.location.neighborhood && unit.location.town == this.$context.location.town && !unit.isActive && unit.renting 
            })
        }
        


    },

    methods: {
        toggleShowMore() {
            this.showMore = this.showMore ? false : true;
        },

        initMap() {
            this.map = new google.maps.Map(this.$refs.mapContainer, {
                center: {
                    lat: parseFloat(this.$context.location.geo_lat),
                    lng: parseFloat(this.$context.location.geo_lng)
                },
                zoom: 15,
                disableDefaultUI: true, 
                zoomControl: true
            });

            // Define circle options
            const circleOptions = {
                strokeWeight: 0,
                fillColor: "0000AA",
                fillOpacity: 0.25,
                map: this.map,
                center: {
                    lat: parseFloat(this.$context.location.geo_lat),
                    lng: parseFloat(this.$context.location.geo_lng)
                },
                radius: 500 // Example radius in meters
            };

            // Create circle
            const circle = new google.maps.Circle(circleOptions);
        },

        closeGallery() {
            this.showGallery = false;
        },

        showPicture(index) {
            this.galleryIndexStart = index;
            this.showGallery       = true;
        },

        updateDimensions() {
            this.screenWidth  = window.innerWidth;
            this.screenHeight = window.innerHeight;

            if(this.$refs['history']){
                this.historyGalleriesWidth = this.$refs['history'].clientWidth;
            }
            if(this.$refs['same-neighborhood']){
                this.neighborhoodGalleriesWidth = this.$refs['same-neighborhood'].clientWidth;
            }

        },

        incrementSameNeighborhood(){
            const pages = Math.ceil(this.$refs['same-neighborhood'].childNodes[0].clientWidth / this.$refs['same-neighborhood'].clientWidth)
            if (this.sameNeighborhoodIndex < pages - 1){
                this.sameNeighborhoodIndex = this.sameNeighborhoodIndex + 1;
            }
        },

        decrementSameNeighborhood(){
            if (this.sameNeighborhoodIndex > 0){
                this.sameNeighborhoodIndex = this.sameNeighborhoodIndex - 1;
            }
        },
        
        incrementHistory() {
            const pages = Math.ceil(this.$refs['history'].childNodes[0].clientWidth / this.$refs['history'].clientWidth)
            if (this.historyIndex < pages - 1){
                this.historyIndex = this.historyIndex + 1;
            }
        },

        decrementHistory() {
            if (this.historyIndex > 0){
                this.historyIndex = this.historyIndex - 1;
            }
        },

        setCarrouselsData() {
            this.historyPages = this.$refs['history'] ? Math.ceil(this.$refs['history'].childNodes[0].clientWidth / this.$refs['history'].clientWidth) : 0
            this.sameNeighborhoodPages = this.$refs['same-neighborhood'] ? Math.ceil(this.$refs['same-neighborhood'].childNodes[0].clientWidth / this.$refs['same-neighborhood'].clientWidth) : 0

        }
    },

    mounted() {


        this.mapLoader = new Loader({
            apiKey: process.env.GRIDSOME_MAPS_API_KEY,
            version: 'weekly',
            mapId: 'DEMO_MAP_ID',
            libraries: ['maps', 'marker']
        });

        this.mapLoader.load().then(() => {
            this.initMap();
        });

        this.updateDimensions();
        this.setCarrouselsData();
    

        window.addEventListener('resize', this.updateDimensions);
    },



    beforeDestroy() {
        window.removeEventListener('resize', this.updateDimensions);
    }

}
</script>

<style lang="scss">
@import '~/assets/variables.scss';


#unit-container {
    display: flex;
    margin: 0 auto;
    width: 75vw;
    height: 100%;

    #main {
        flex: 2;
    }

    #sidebar {
        flex: 1;
    }
}

#unit-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: fit-content;
    margin-bottom: 5px;

    .first-line {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .code {
            display: flex;
            align-items: baseline;

            span {
                color: $gray-darker;
                font-size: 0.75rem;
            }
        }

        svg {
            height: 0.88rem;
            box-sizing: border-box;

            path {
                fill: $gray-darker;
            }
        }
    }

    .cost {
        font-size: 1.9rem;
        font-weight: 600;
    }

    .mes {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .features {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        column-gap: 30px;
        margin: 10px 0;

        svg {
            margin-right: 6px;
        }
    }
}

#unit-features {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 15px;
    margin-bottom: 30px;
    row-gap: 15px;

    h1 {
        width: 100%;
    }

    .wrapper {
        width: 33%;
        margin: 10px 0;
    }

    .feature-wrapper {
        width: 30%;
        justify-content: flex-start;
        column-gap: 6px;
    }
}

#pills {
    width: 100%;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
}

#unit-content {
    font-size: 0.75rem;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 30px;
    margin-bottom: 30px;

    h1 {
        margin: 0;
    }

    h3 {
        margin-top: 0;
        color: $gray-dark;
    }

    .showMore {
        display: inline-block;
        color: $orange;
        font-weight: 600;
        margin: 15px 15px 15px 0;
        cursor: pointer;
    }
}

#unit-conditions {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 30px;
    margin-bottom: 30px;
    row-gap: 15px;

    h1 {
        width: 100%;
    }

    .wrapper {
        width: 33%;
        margin: 10px 0;
    }
}

#unit-location {
    font-size: 0.75rem;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 30px;
    margin-bottom: 30px;

    .placeholder {
        background-color: $gray;
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $gray-dark;
    }
}


#same-neighborhood,
#history {
    font-size: 0.75rem;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 60px;
    width: 75vw;
    margin: 30px auto;

    .history-subheader {
        font-size: 0.75rem;
        font-weight: normal;
        color: $gray-darkest;
    }

    .same-neighborhood-header,
    .history-header {
        display: flex;
        justify-content: space-between;
    }

    .cards-overflow{
        width: 100%;
        overflow-x: hidden;
        overflow-y: visible;
        padding-block: 5px;
    }

    .cards {
        transition: transform 0.3s ease;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        gap: 10px;
        width: max-content;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding-bottom: 15px;
    }

    h1 {
        width: 100%;
    }
}


#sidebar {
    margin-left: 3rem;

    
}


@media (max-width:430px) {
    #unit-container,
    #history,
    #same-neighborhood,
    #pictures-grid {
        width: 100vw;
        padding: 0 15px;
        border-bottom: none;
        margin-bottom: 10px;
    }

    #unit-features,
    #unit-conditions {
        border-bottom: none;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .feature-wrapper {
            width: 100%;
            justify-content: flex-start;
            column-gap: 6px;
        }
    }

    #pills {
        margin-top: 1rem;
    }

    #unit-content {
        border-bottom: none;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    #sidebar {
        display: none;
    }

    .cards-overflow{
        width: 100%;
        overflow-x: scroll !important;
        overflow-y: visible;
        padding: 5px;
    }
    .cards {
        display: flex;
        flex-direction: row;
        column-gap: 6px;
        width: max-content;
    }

    .app-detail {
        display: flex;
        flex-direction: column;

        #menu {
            order: -2;
        }

        #unit-container {
            order: -1;
        }

        #pictures-grid {
            order: 0;
        }

        #pictures-single {
            order: -1;
        }
    }

    #unit-location {
        border-bottom: none;
        padding-bottom: 15px;
        margin-bottom: 0;

        .placeholder {
            height: 25vh;
        }
    }

    .same-neighborhood-header,
    .history-header{
        .buttons {
            display: none !important;
        }
    }
    .history-subheader {
        display: none;
    }

    #contact {
        background-color: white;
        padding: 15px;
        position: sticky;
        bottom: 0;
        z-index: 5000;
        box-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
    }
}
</style>