<template>
    <div class="card">
        <div class="picture" :class="{grayscale: grayscale}" :style="{backgroundImage: `url(${data.picture})`}">
            <Pill v-if="rented" content="Alquilado"/>
        </div>
        <div class="text">
            <h1 class="price">1.200€</h1>
            <div class="description">
                <Location/> Piso en Carrer de Berga<br>
                Vila de Gràcia, Barcelona
            </div>
            <div class="features">
                <span>{{ data.habs }} habs.</span>
                <span>{{ data.bathrooms }} baños</span>
                <span>{{ data.m2 }}m<sup>2</sup></span>
            </div>
        </div>
    </div>
</template>

<script>
import Location from '~/components/icons/Location.vue';
import Pill from '~/components/Pill.vue';

export default {
    components : {
        Location,
        Pill
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
    }
}

</script>

<style lang="scss">
@import '~/assets/variables.scss';

.card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: calc((75vw / 4) - 20px);
    border-radius: 5px;
    box-shadow: 0px 2px 3px rgb(200, 200, 200) ;
    overflow: hidden;

    .picture{
        display: flex;
        flex: 4;
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
        flex: 3;
        h1{
            font-size: 1rem;
            font-weight: 600;
            margin-top: 0;
        }
        svg{
            width: 0.75rem;
            height: 0.75rem;
        }
        .description{
            color: $gray-darker;
        }
        .features{
            color: $gray-darkest;
            display: flex;
            justify-content: flex-start;
            align-items: baseline;
            span{
                margin-right:15px;
            }
        }
    }
}

</style>