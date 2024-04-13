<template>
    <div :class="{ 'contact-form': true, list: type == 'list', detail: type == 'detail' }">

        <h2>
            <ArrowLeft v-if="back" @click.native="$emit('back')" />
            <span>{{ headers[type] }}</span>
            <Close v-if="close" @click.native="$emit('close')"/>
        </h2>

        <form action="">
            <input type="text" placeholder="Nombre">
            <input type="text" placeholder="Email">
            <input type="text" placeholder="Teléfono con Whatsapp">
            <textarea style="width:100%;" placeholder="Mensaje"></textarea>

            <Button solid fullWidth>{{ buttonText[type] }}</Button>

            <div class="result" v-if="showResult">Hemos recibido tu solicitud de visita. Nos pondremos
                en contacto contigo para organizar una visita al piso
                siguiendo el orden de las solicitudes recibidas.</div>
        </form>
    </div>
</template>

<script>
import Button from '~/components/Button.vue'
import ArrowLeft from '~/components/icons/ArrowLeft.vue'
import Close from '~/components/icons/Close.vue'

export default {
    components: {
        Button,
        ArrowLeft,
        Close
    },

    props: {
        close: {
            type: Boolean,
            default: false,
            required: false
        },

        back: {
            type: Boolean,
            default: false,
            required: false
        },

        type: {
            type: String,
            required: true,
            validator: function (value) {
                return ['detail', 'list'].includes(value);
            }
        }
    },

    data() {
        return {
            showResult: false,
            headers: {
                'list': 'Contacta ahora',
                'detail': '¡Quiero visitarlo!'
            },
            buttonText: {
                'list': 'Enviar mensaje',
                'detail': 'Contactar'
            }
        }
    }
}
</script>


<style lang="scss">
@import '~/assets/variables.scss';

.contact-form {
    padding: 25px;
    margin-left: 15px;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    
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

    &.detail {
        background-color: $blue-light;
    }
    
    &.list {
        input,
        textarea {
            border: 1px solid $gray;
        }
        background-color: white;
    }

    h2 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        margin-top: 0;

        span {
            flex: 1;
        }

        path {
            fill: $black;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        font-size: 0.75rem;
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

@media (max-width:430px) {
    .contact-form {
        margin: 0;
    }
}
</style>