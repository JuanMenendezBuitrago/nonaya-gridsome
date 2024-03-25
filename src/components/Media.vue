<template>
    <div id="pictures">
        <div class="photo1" :style="{backgroundImage: `url('${pictures[0]}')`}">
            <div><Camera/>{{ pictures.length }} Fotos</div>
        </div>
        <div class="photo2" :style="{backgroundImage: `url('${pictures[1]}')`}"></div>
        <div class="photo3" :style="{backgroundImage: `url('${pictures[2]}')`}"></div>
        <div class="photo4" :style="{backgroundImage: `url('${pictures[3]}')`}"></div>
        <div class="photo5" :style="{backgroundImage: `url('${pictures[4]}')`}">
            <div>
                + {{ pictures.length - 5 }} fotos
            </div>
        </div>
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
        }
    }
}

</script>

<style  lang="scss">
#pictures {
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 5px 5px;
    grid-template-areas:
        "photo1 photo1 photo2 photo3"
        "photo1 photo1 photo4 photo5";
    width: 100%;
    height: 65vh;

    .photo1 {
        grid-area: photo1;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        div{
            display: inline-flex;
            align-items: center;
            margin: 0 0 15px 12vw;
            font-size: 0.9rem;
            font-weight: 600;
            color: white;
            border-radius: 5px;
            padding: 10px;
            background-color: rgba(0,0,0,0.5);
        }
        svg{
            margin-bottom: 5px;
            margin-right: 5px;
            path{
                fill: #fff;
            }
        }
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
        background-position: center;
    }

}
</style>