<template>
    <div id="gallery-overlay"">
        <div id="back">
            <ButtonWithIcon icon="left" text="Volver" @clicked="closeMe"/>
        </div>
        <RoundButton 
            icon="left" 
            :show="activeIndex > 0"
            @click.native="decrease"/>
        <img v-for="(picture, i) in pictures" :key="`pic_${i}`" 
         :src="picture" alt="" :style="{display: i== shownIndex ? 'block' : 'none' }">
        <RoundButton 
            icon="right" 
            :show="activeIndex < pictures.length - 1"
            @click.native="increase"/>
    </div>
</template>

<script>
import RoundButton    from '~/components/RoundButton.vue';
import ButtonWithIcon from '~/components/ButtonWithIcon.vue';

export default {
    name: 'Gallery',
    components: {
        RoundButton,
        ButtonWithIcon
    },
    props: {
        pictures: {
            type:     Array,
            required: true
        },
        indexStart: {
            type:     Number,
            required: false,
            default:  -1
        }
    },

    data() {
        return {
            activeIndex: -1
        }
    },

    computed: {
        shownIndex() {
            console.log('* shownIndex()')
            if ( this.activeIndex < 0 && this.indexStart < 0){
                this.activeIndex = 0
                return this.activeIndex
            }

            if ( this.activeIndex < 0 && this.indexStart >= 0){
                this.activeIndex = this.indexStart
                return this.activeIndex
            }

            return this.activeIndex
        }    
    },

    methods: {
        increase() {
            if (this.activeIndex < this.pictures.length - 1){
                this.activeIndex++;
            }
        },

        decrease() {
            if (this.activeIndex > 0){
                this.activeIndex--;
            }
        },

        closeMe() {
            this.$emit('closeMe');
        }
    },

    mounted(){
        console.log('mounted')
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

    #gallery-overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);

        display: flex;
        justify-content: space-around;
        align-items: center;


        img{
            height: 80%;
            width: auto;
        }
    }

    #back{
        position: absolute;   
        top: 15px;
        left: 15px;

        .dropdown-button{
            color: white;
            border-color: white;
            path{
                fill: white;
            }
        }
    }
</style>