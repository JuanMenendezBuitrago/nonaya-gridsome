<template>
        <footer>
            <div class="footer-header">
                <h1 class="title">Otras viviendas que también te pueden interesar...</h1>
            </div>
            <div class="footer-content">
                <div>
                    <span>Pisos en Gràcia</span>
                    <span>Pisos en Camp d'en Grassot i Gràcia Nova</span>
                </div>
                <div>
                    <span>Pisos de 3 habitaciones en Barcelona</span>
                    <span>Áticos en Barcelona</span>
                </div>
                <div>
                    <span>Pisos en Barcelona con terraza</span>
                    <span>Pisos en Barcelona con aire acondicionado</span>
                </div>
            </div>
        </footer>
</template>

<script>
export default{
    props : {
        unit: {
            required: true
        }
    },

    components: {},
    data(){
        return {

        }
    }
}
</script>


<style lang="scss">
@import '~/assets/variables.scss';

footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    font-size: 0.75rem;
    padding-bottom: 60px;
    width: 75vw;
    margin: 30px auto;

    .footer-content{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        &>div{
            display: flex;
            flex-direction: column;
            flex: 1;    
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

}


@media (max-width:430px) {
    footer{
        padding-bottom: 0;
    }
    .footer-content{
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        row-gap: 10px;
        &>div{
            row-gap: 10px;
        }
    }
}
</style>