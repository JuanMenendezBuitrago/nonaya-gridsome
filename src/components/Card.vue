<template>
    <div class="card" :class="{sm: size=='sm', md: size=='md'}">
        <div class="picture" :class="{grayscale: grayscale}" :style="{backgroundImage: `url(${data.picture})`}">
            <Pill v-if="rented" content="Alquilado"/>
        </div>
        <div class="text">
            <h1 class="price">1.200€</h1>
            <div class="location">
                <Location/> Piso en Carrer de Berga<br v-if="size=='sm'">
                Vila de Gràcia, Barcelona
            </div>
            <div v-if="size=='sm'" class="features">
                <span>{{ data.habs }} habs.</span>
                <span>{{ data.bathrooms }} baños</span>
                <span>{{ data.m2 }}m<sup>2</sup></span>
            </div>
            <div v-if="size=='md'" class="features">
                <Feature icon="room" :line1="bedrooms" />
                <Feature icon="bathroom" :line1="bathrooms" />
                <Feature icon="area" :line1="area" />
                <Feature icon="floor" :line1="floor" />
            </div>
            <div class="description">
                {{ data.description }}
            </div>
            <Button text="Contactar" active fullWidth/>
        </div>
    </div>
</template>

<script>
import Location from '~/components/icons/Location.vue';
import Feature from '~/components/Feature.vue';
import Button from '~/components/Button.vue';
import Pill from '~/components/Pill.vue';

export default {
    components : {
        Location,
        Pill,
        Button,
        Feature
    },
    props: {
        rented:{
            type: Boolean,
            required: false,
            default: false,
        },        
        grayscale:{
            type: Boolean,
            required: false,
            default: false,
        },
        data:{
            required: true
        },
        size: {
            type: String,
            required: false,
        }
    },

    computed: {
        bedrooms() {
            let amount = this.data.habs;
            let result = amount + ' hab' + (amount > 1 ? 's.' : '.');
            return (result);
        },

        bathrooms() {
            let amount = this.data.bathrooms;
            let result = amount + ' baño' + (amount > 1 ? 's' : '');
            return (result);
        },

        area() {
            let amount = this.data.m2;
            let result = `${amount}m<sup>2</sup>`;
            return (result);
        },

        floor() {
            let amount = this.data.floor;
            let sup = (amount == 1 || amount == 3) ? 'er' : 'o';
            let result = amount + `<sup>${sup}</sup> piso`;
            return (result);
        },
    }
}

</script>

<style lang="scss">
@import '~/assets/variables.scss';

.card{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 5px;
    box-shadow: 0px 2px 3px rgb(200, 200, 200) ;
    overflow: hidden;
    font-size: 0.75rem;

    
    &.sm{
        width: calc((75vw / 4) - 20px);

        .picture{
            flex: 4;
        }

        .text{
            flex: 3;
        }
    }

    &.md{
        width: calc((100% - 15px) / 2);
        height: 70vh;
        margin-bottom: 15px;

        .picture, .text{
            flex: 1;
        }

        .features{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .wrapper{
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

    .picture{
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        &.grayscale{
            filter: grayscale(1);
        }
        .pill{
            background-color: $black;
            color: white;
            margin: 0;
        }
    } 
    .text{
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

</style>