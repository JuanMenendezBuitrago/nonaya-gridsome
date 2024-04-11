<template>
    <div class="contact-form">
        <h2>¡Quiero visitarlo!</h2>
        <form action="">
            <input type="text" placeholder="Nombre">
            <input type="text" placeholder="Email">
            <input type="text" placeholder="Teléfono con Whatsapp">
            <textarea style="width:100%;" placeholder="Mensaje"></textarea>
            <Button solid fullWidth>Contactar</Button>
            <div class="result" v-if="showResult">Hemos recibido tu solicitud de visita. Nos pondremos
                en contacto contigo para organizar una visita al piso
                siguiendo el orden de las solicitudes recibidas.</div>
        </form>
    </div>
</template>

<script>
import Button from '~/components/Button.vue'

export default {
    components: {
        Button
    },

    data() {
        return {
            showResult: false
        }
    }
}
</script>


<style lang="scss">
@import '~/assets/variables.scss';

.contact-form {
    background-color: $blue-light;
    padding: 25px;
    margin-left: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    h2 {
        text-align: center;
        margin-top: 0;
    }

    form {
        display: flex;
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

}
</style>