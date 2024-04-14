<template>
    <div :class="{
            'card'   : true,
            'size-sm': size=='sm', 
            'size-md': size=='md'
        }"
        @click="moreInfo"
>
        <div
            :class="{'pictures-frame': true, swipable: isMobile }" 
            ref="frame">
            <div :class="{
                    'pictures-ui': true,
                    'carrousel-buttons': !rented && pictureCount > 1,
                    'rented'   : rented,
                    'last'     : !rented && last ,
                    'first'    : !rented && first
                }">
    
                <Pill        v-if="rented" content="Alquilado"/>
                <RoundButton v-show="!rented && pictureCount > 1 && currentPictureIndex > 0" icon="left"                   @clicked="decreaseIndex"/>
                <RoundButton v-show="!rented && pictureCount > 1 && currentPictureIndex < (pictureCount - 1)" icon="right" @clicked="increaseIndex"/>
            </div>

            <div class="pictures-flex-wrapper">
                <div :class="{
                        'pictures-flex-row': true,
                        'grayscale': grayscale
                     }"
                     :style="{
                        transform: `translateX(${-currentPictureIndex*frameWidth}px)`
                     }" >
                    <div  v-for="(picture,i) in pictures" :key="`pic${i}`"
                          class="picture"
                         :style="{width: `${frameWidth}px`, height: `${frameHeight}px`}">
                        <img 
                             :src="picture" 
                             :style="{width: `${frameWidth}px`, height: `${frameHeight}px`}"
                             alt="" >
                    </div>
                </div>
            </div>
        </div>

        <div class="data">
            <h1 class="price">1.200€</h1>
            <div class="location">
                <Location/> Piso en Carrer de Berga<br v-if="size=='sm'">
                Vila de Gràcia, Barcelona
            </div>
            <div v-if="size=='sm'" class="features">
                <span>{{ cardData.habs }} habs.</span>
                <span>{{ cardData.bathrooms }} baños</span>
                <span>{{ cardData.m2 }}m<sup>2</sup></span>
            </div>
            <div v-if="size=='md'" class="features">
                <Feature icon="room"     :line1="bedrooms" />
                <Feature icon="bathroom" :line1="bathrooms" />
                <Feature icon="area"     :line1="area" />
                <Feature icon="floor"    :line1="floor" />
            </div>
            <div class="description">
                {{ cardData.description }}
            </div>
            <Button v-if="contact"
                active 
                fullWidth
                @clicked="$emit('clicked-contact')">Contactar</Button>
        </div>
    </div>
</template>

<script>
import Location    from '~/components/icons/Location.vue';
import Feature     from '~/components/Feature.vue';
import RoundButton from '~/components/RoundButton.vue';
import Button      from '~/components/Button.vue';
import Pill        from '~/components/Pill.vue';

export default {
    name: 'Card',

    components : {
        Location,
        Pill,
        Button,
        RoundButton,
        Feature
    },

    props: {
        rented:{
            type:     Boolean,
            required: false,
            default:  false,
        },        

        grayscale:{
            type:     Boolean,
            required: false,
            default:  false,
        },

        cardData:{
            required: true
        },

        size: {
            type:     String,
            required: false,
        },

        contact:{
            type:     Boolean,
            required: false,
            default:  false,
        },

        isMobile:{
            type:     Boolean,
            required: false,
            default:  false,
        },
    },

    data(){
        return{
            pictures: [],
            currentPictureIndex : 0,
            frameHeight: 0,
            frameWidth: 0,
            swipe: {
                touchstartX: 0,
                touchendX: 0,
                area: null,
            }
        }
    },

    computed: {
        bedrooms() {
            let amount = this.cardData.habs;
            let result = amount + ' hab' + (amount > 1 ? 's.' : '.');
            return (result);
        },

        bathrooms() {
            let amount = this.cardData.bathrooms;
            let result = amount + ' baño' + (amount > 1 ? 's' : '');
            return (result);
        },

        area() {
            let amount = this.cardData.m2;
            let result = `${amount}m<sup>2</sup>`;
            return (result);
        },

        floor() {
            let amount = this.cardData.floor;
            let sup = (amount == 1 || amount == 3) ? 'er' : 'o';
            let result = amount + `<sup>${sup}</sup> piso`;
            return (result);
        },

        pictureCount(){
            return this.cardData.pictures.length;
        },

        last(){
            return this.currentPictureIndex == (this.pictures - 1) ;
        },

        first(){
            return this.currentPictureIndex == 0;
        }
    },

    methods: {
        handleCarrousel() {            
            this.frameHeight = this.$refs.frame.clientHeight;
            this.frameWidth  = this.$refs.frame.clientWidth;
            this.pictures = this.cardData.pictures;

        },

        handleTouchStart(event){
            this.swipe.touchstartX = event.touches[0].clientX;
        },

        handleTouchEnd(event) {
            this.swipe.touchendX = event.changedTouches[0].clientX;
            this.handleGesure();
        },

        handleGesure() {
            if (this.swipe.touchendX < this.swipe.touchstartX) {
                this.increaseIndex();
            }
            if (this.swipe.touchendX > this.swipe.touchstartX) {
                this.decreaseIndex();
            }
        },

        increaseIndex() {
            if (this.currentPictureIndex < this.pictures.length - 1)
                this.currentPictureIndex++;
        },

        decreaseIndex() {
            if (this.currentPictureIndex > 0)
                this.currentPictureIndex--;
        },

        moreInfo(){

        }
    },

    mounted() {
        // Add event listener for window resize event
        window.addEventListener('resize', this.handleCarrousel);
        window.addEventListener('load', this.handleCarrousel);

        this.handleCarrousel()

        this.swipe.area = this.$refs.frame;
        this.swipe.area.addEventListener('touchstart', this.handleTouchStart, false);
        this.swipe.area.addEventListener('touchend', this.handleTouchEnd, false);


    },

    beforeDestroy() {
        // Remove event listener when component is destroyed
        window.removeEventListener('resize', this.handleCarrousel);
        window.removeEventListener('load', this.handleCarrousel);
        this.swipe.area.removeEventListener('touchstart', this.handleTouchStart);
        this.swipe.area.removeEventListener('touchend', this.handleTouchEnd);
    }
}

</script>

<style lang="scss">
@import '~/assets/variables.scss';

.card{
    display: flex;
    flex-direction: column;
    align-items: stretch;

    border-radius: 5px;
    box-shadow: 0px 2px 3px rgb(200, 200, 200) ;
    overflow: hidden;
    font-size: 0.75rem;

    
    &.size-sm{
        width: calc((75vw / 4) - 20px);

        .pictures-frame{
            height: 150px
        }

        .picture{
            width: calc((75vw / 4) - 20px);
        }

        .data{
            min-height: 150px;
        }

        .description{
            display: none;
        }
    }

    &.size-md{
        width: calc((100% - 15px) / 2);
        
        height: 70vh;
        margin-bottom: 15px;

        .pictures-frame{
            flex: 1;
        }

        .picture{
            width: calc((100% - 15px) / 2);
        }

        .data{
            flex: 1;
        }

        .description{
            padding-bottom: 20px;
        }

        .features{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .frame{
                margin-right: 0;
            }
            .icon{
                margin-right: 0;
            }
            svg{
                margin-right: 5px;
            }
        }
    }

    .pictures-frame{
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .pictures-flex-row{
        transition: transform 0.3s ease;

        max-width: max-content;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .picture{
        img{
            object-fit: cover;
        }
    }

    .pictures-flex-wrapper{
        position: absolute;
        z-index: 50;
        top   : 0;
        left  : 0;
        bottom: 0;
        right : 0;

        overflow: hidden;
    }

    .pictures-ui{
        position: absolute;
        z-index: 100;
        top   : 0;
        left  : 0;
        bottom: 0;
        right : 0;

        padding: 10px;

        &.carrousel-buttons{
            display: flex;
            justify-content: space-between;
            align-items: center;

            &.first{
                justify-content: flex-end;
            }

            &.last{
                justify-content: flex-start;
            }
        }

        &.rented{
            display: flex;
            justify-content: center;
            align-items: center;
        }



        .pill{
            background-color: $black;
            color: white;
            margin: 0;
        }
    } 

    .grayscale{
        filter: grayscale(1);
    }

    .data{
        margin: 15px;
        display: flex;
        flex-direction: column;
        h1{
            font-size: 1rem;
            font-weight: 600;
            margin-top: 0;
        }

        .location{
            color: $gray-darker;        
            svg{
                width: 0.75rem;
                height: 0.75rem;
            }
        }
        .features{
            margin:5px 0 15px;
            color: $gray-darkest;
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            span{
                margin-right:15px;
            }
            svg{
                width: 1.2rem;
                height: 1.2rem;
            }
        }
        .description{
            flex: 1;
        }
    }
}


@media (max-width:430px) {
    .card.size-md{
        width: 100% !important;
        height: 50vh;
    }

    .card.size-sm{
        width: 55vw !important;
        height: 35vh;
    }
}
</style>