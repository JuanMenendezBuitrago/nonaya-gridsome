<template>
    <div id="contact-overlay">
        <Contact :type="type" 
        :back  = "back"
        :close = "close"
        @back="$emit('close')"
        @close="$emit('close')"/>
    </div>
</template>

<script>
import Contact from '~/components/Contact.vue';

export default {
    name: 'ContactModal',

    components: {
        Contact
    },
    
    props: {
        back: {
            type: Boolean,
            default: false,
            required: false
        },
        close: {
            type: Boolean,
            default: false,
            required: false
        },
        type: {
            type: String,
            required: true,
            validator: function(value) {
                return ['detail', 'list'].includes(value);
            }
        }
    },

    data() {
        return {
            activeIndex: -1
        }
    },

    computed: {
    },

    methods: {
        closeMe() {
            this.$emit('closeMe');
        }
    },
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

    #contact-overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 6000;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }
</style>