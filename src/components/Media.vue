<template>
    <div :id="single ? 'pictures-single': 'pictures-grid'" :class="{single}">
        <div 
            class="photo1" 
            :style="{backgroundImage: `url('${pictures[0]}')`}" 
            @click="$emit('clickedPicture',0)">
            <div 
                class="show-gallery" 
                @click.stop="$emit('clickedPicture',-1)">
                    <Camera/>{{ pictures.length }} Fotos
            </div>
        </div>

        <template v-if="!single">
            <div class="photo2" :style="{backgroundImage: `url('${pictures[1]}')`}"@click="$emit('clickedPicture',1)"></div>
            <div class="photo3" :style="{backgroundImage: `url('${pictures[2]}')`}"@click="$emit('clickedPicture',2)"></div>
            <div class="photo4" :style="{backgroundImage: `url('${pictures[3]}')`}"@click="$emit('clickedPicture',3)"></div>
            <div class="photo5" :style="{backgroundImage: `url('${pictures[4]}')`}"@click="$emit('clickedPicture',4)">
                <div>
                    + {{ pictures.length - 5 }} fotos
                </div>
            </div>
        </template>
        
    </div>
</template>        

<script>
import Camera from '~/components/icons/Camera.vue';

export default {
    components: {
        Camera
    },

    props: {
        pictures: {
            required: true,
        },
        single: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}

</script>

<style  lang="scss">
@import '~/assets/variables.scss';



#pictures-grid, #pictures-single {
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows:    1fr 1fr;
    gap: 5px 5px;
    grid-template-areas:
        "photo1 photo1 photo2 photo3"
        "photo1 photo1 photo4 photo5";
    width: 100%;
    height: 65vh;

    .show-gallery{
        transition: all .2s ease-in;
        display: inline-flex;
        align-items: center;
        margin: 0 0 15px 12vw;
        font-size: 0.9rem;
        font-weight: 600;
        color: white;
        border-radius: 5px;
        padding: 10px;
        background-color: rgba(0,0,0,0.5);

        &:hover{
            cursor: pointer;
            color: $orange;
            background-color: rgba(255, 255, 255, 0.5);
            path{
                fill: $orange
            }
        }


        svg{
            margin-bottom: 5px;
            margin-right: 5px;
            path{
                fill: #fff;
            }
        }
    }

    .photo1 {
        grid-area: photo1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        
    }

    .photo2 {
        grid-area: photo2;
    }

    .photo3 {
        grid-area: photo3;
    }

    .photo4 {
        grid-area: photo4;
    }

    .photo5 {
        div {
            display: flex;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            grid-area: photo5;
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
        }
    }

    .photo1,
    .photo2,
    .photo3,
    .photo4,
    .photo5 {
        background-size: cover;
        background-position: bottom left;
        cursor: pointer;
    }
}


@media (max-width:430px) {

    #pictures-grid{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        row-gap: 15px;
        grid-template-areas:
            "photo1"
            "photo2"
            "photo3"
            "photo4"
            "photo5";
        width: 100%;
        height: max-content;
        padding: 1rem;
    
        .photo1,
        .photo2,
        .photo3,
        .photo4,
        .photo5 {
            border-radius: 10px;
            height: 61vw;
        }

        .show-gallery{
            margin: 15px;
        }
    }

    #pictures-single{
        margin-bottom: 0;
        grid-template-columns: 1fr;
        grid-template-rows:    1fr;
        grid-template-areas:   "photo1";
        row-gap: 15px;
        height: 25vh;
        width: 100%;
        height: max-content;
        padding: 1rem;

        .photo1{
            height: 61vw;
        }

        .show-gallery{
            margin: 15px;
        }        
    }
}
</style>