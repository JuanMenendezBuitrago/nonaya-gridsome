<template>
    <div>
        <Menu />
        <Media :pictures="$page.unit.pictures" />
        <div class="container">
            <div class="main">
                <div id="unit-header">
                    <div class="first-line">
                        <div>
                            <span class="cost">{{ $page.unit.cost }}€</span><span v-if="$page.unit.contract == 'rent'"
                                class="mes">/mes</span>
                        </div>
                        <div class="code">
                            <Tag />
                            <span style="margin-right:15px;">Ref: {{ $page.unit.id }}</span>
                            <Pill :content="$page.unit.status" />
                        </div>
                    </div>
                    <div class="features">
                        <Feature icon="room" :line1="bedrooms" />
                        <Feature icon="bathroom" :line1="bathrooms" />
                        <Feature icon="area" :line1="area" />
                        <Feature icon="floor" :line1="floor" />
                    </div>
                </div>
                <div id="unit-content">
                    <h1 class="title">
                        {{ $page.unit.title }}
                    </h1>
                    <h3 class="town">
                        {{ $page.unit.location.town }}
                    </h3>
                    <div class="description"
                        v-html="(descriptionPieces > 1 && !showMore ? cutDescription[0] + '...' : cutDescription[0] + cutDescription[1])">
                    </div>

                    <span class="showMore" @click="toggleShowMore()"
                        v-html="showMore ? 'Leer menos' : 'Leer más'"></span>

                </div>
                <div id="unit-features">
                    <h1 class="title">Caracterísiticas</h1>
                    <Feature icon="kind" line1="Tipo de inmueble" :line2="$page.unit.kind" />
                    <Feature icon="condition" line1="Estado" line2="foo" />
                    <Feature icon="heating" line1="Calefacción" line2="bar" />
                    <Feature icon="elevator" line1="Ascensor" line2="baz" />
                    <Feature icon="furnished" line1="Amueblado" line2="foo bar" />
                    <Feature icon="ac" line1="Aire acondicionado" line2="bar" />
                    <Feature icon="energy" line1="Consumo de energía"
                        :line2="$page.unit.energy.consumption + 'Mw h m<sup>2</sup>/año'" />

                    <div class="pills">
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
                    <Feature icon="euro" line1="Fianza" line2="foo" />
                    <Feature icon="hourglass" line1="Tipo de contrato" line2="bar" />
                    <Feature icon="paw" line1="Admite mascotas" line2="foo" />
                </div>
                <div id="unit-location">
                    <h1 class="title">Ubicación aproximada</h1>
                    <div class="placeholder">
                        mapa
                    </div>
                </div>
            </div>
            <div id="sidebar">
                <div class="form">
                    <h2>¡Quiero visitarlo!</h2>
                    <form action="">
                        <input type="text" placeholder="Nombre">
                        <input type="text" placeholder="Email">
                        <input type="text" placeholder="Teléfono con Whatsapp">
                        <textarea style="width:100%;" placeholder="Mensaje"></textarea>
                        <a href="" class="button">Contactar</a>
                        <div class="result">Hemos recibido tu solicitud de visita. Nos pondremos
                            en contacto contigo para organizar una visita al piso
                            siguiendo el orden de las solicitudes recibidas.</div>
                    </form>
                </div>
            </div>
        </div>
        <div id="same-neighbourhood">
            <div class="same-neighbourhood-header">
                <h1 class="title">Inmuebles en Gracia</h1>
                <div class="buttons">
                    <RoundButton icon="left" />
                    <RoundButton icon="right" />
                </div>
            </div>
            <div class="cards">
                <Card size="sm" :data="data"></Card>
                <Card size="sm" :data="data"></Card>
                <Card size="sm" :data="data"></Card>
                <Card size="sm" :data="data"></Card>
            </div>
        </div>

        <div id="history">
            <div class="history-header">
                <h1 class="title">Viviendas alquiladas recientemente en Gracia
                    <div class="history-subheader">
                    En este momento, no disponemos de más viviendas que coincidan con tus preferencias.<br>
                    Sin embargo, te mostramos algunas opciones que han sido alquiladas recientemente.
                </div>
                </h1>
                <div class="buttons">
                    <RoundButton icon="left" />
                    <RoundButton icon="right" />
                </div>
            </div>

            <div class="cards">
                <Card size="sm" :data="data" rented grayscale></Card>
                <Card size="sm" :data="data" rented grayscale></Card>
                <Card size="sm" :data="data" rented grayscale></Card>
                <Card size="sm" :data="data" rented grayscale></Card>
            </div>
        </div>   
        <Footer :unit="$page.unit"/>     
    </div>
</template>

<page-query>

query Unit($id: ID!) {
  unit: unit(id: $id){
    id,
    title,
    kind,
    status,
    contract,
    cost,
    bedrooms,
    bathrooms,
    area,
    floor,
    pictures,
    location{
        town
    },
    energy{
        certificate_display,
        consumption
    }
    description
  }
}
</page-query>


<script>
import Menu from '~/components/Menu.vue';
import Footer from '~/components/Footer.vue';
import Media from '~/components/Media.vue';
import Feature from '~/components/Feature.vue';
import Pill from '~/components/Pill.vue';
import Card from '~/components/Card.vue';
import Tag from '~/components/icons/Tag.vue';
import RoundButton from '~/components/RoundButton.vue';

import { store } from '~/data/store.js';

export default {
    components: {
        Menu,
        Media,
        Feature,
        Pill,
        Tag,
        Card,
        RoundButton,
        Footer
    },

    data() {
        return {
            maxWords: 100,
            showMore: false,
            data: {
                habs: 3,
                bathrooms: 2,
                m2: 150,
                picture: "https://picsum.photos/200/300"
            }
        }
    },
    computed: {
        cutDescription() {
            let text = this.$page.unit.description.replace(/\n/g, '<br>');
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
            let amount = this.$page.unit.bedrooms;
            let result = amount + ' hab' + (amount > 1 ? 's.' : '.');
            return (result);
        },

        bathrooms() {
            let amount = this.$page.unit.bathrooms;
            let result = amount + ' baño' + (amount > 1 ? 's' : '');
            return (result);
        },

        area() {
            let amount = this.$page.unit.area;
            let result = `${amount}m<sup>2</sup>`;
            return (result);
        },

        floor() {
            let amount = this.$page.unit.floor;
            let sup = (amount == 1 || amount == 3) ? 'er' : 'o';
            let result = amount + `<sup>${sup}</sup> piso`;
            return (result);
        },
        tipoContrato() {
            return this.$page.unit.contract == 'rent' ? 'l alquiler' : 'la venta';
        }

    },

    methods: {
        toggleShowMore() {
            console.log('ping')
            this.showMore = this.showMore ? false : true;
            console.log(this.showMore)
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.container {
    display: flex;
    margin: 0 auto;
    width: 75vw;
    height: 100%;

    .main {
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
        margin: 10px 0;
    }
}

#unit-features {
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: flex-start;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 30px;
    margin-bottom: 30px;

    h1 {
        width: 100%;
    }

    .wrapper {
        width: 33%;
        margin: 10px 0;
    }

    .pills {
        width: 100%;
        margin-top: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;
    }
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


#same-neighbourhood, #history {
    font-size: 0.75rem;
    border-bottom: 1px solid $gray-light;
    padding-bottom: 60px;
    width: 75vw;
    margin: 30px auto;

    .history-subheader{
        font-size: 0.75rem;
        font-weight: normal;
        color: $gray-darkest;
    }

    .same-neighbourhood-header, .history-header{
        display: flex;
        justify-content: space-between;
    }
    .cards {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        height: 275px;
    }

    .buttons{
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

    h2 {
        text-align: center;
        margin-top: 0;
    }

    form {
        display: text;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        font-size: 0.75rem;

    }

    input,
    textarea,
    .button,
    .result {
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: none;
        font-size: inherit;
        color: $black;

        &:focus {
            outline: none;
            -webkit-box-shadow: none;
            box-shadow: none;
        }

        &::placeholder {
            color: $black;
        }
    }

    .result {
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .button {
        display: flex;
        justify-content: center;
        color: white;
        font-weight: 500;
        background-color: $orange;
        text-decoration: none;
        margin: 0;
    }

    .form {
        background-color: $blue-light;
        padding: 25px;
        margin-left: 15px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
}
</style>