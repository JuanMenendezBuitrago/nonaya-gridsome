<template>
    <span class="circle">
        <ChevronRight v-if="icon=='right'"/>
        <ChevronLeft  v-if="icon=='left'"/>
    </span>
</template>

<script>
import ChevronRight from '~/components/icons/ChevronRight.vue'
import ChevronLeft from '~/components/icons/ChevronLeft.vue'

export default {
    components: {
        ChevronLeft,
        ChevronRight
    },

    props: {
        icon: {
            required: true
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';
    .circle{
        width:30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 5px;
        box-shadow: 0 0 3px gray;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        background-color: rgba(255, 255, 255 , 0.5);

        svg{
            path{
                fill:$black;
            }
        }
    }
</style>