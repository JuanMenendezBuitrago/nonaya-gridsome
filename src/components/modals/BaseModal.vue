<template>
    <div
        :style="top && left ? { top: top + 'px', left: scrolledLeft + 'px' } : {}"
        :class="{show: (show || isActive), modal: true, 'hide-overflow': hideOverflow }">

        <div class="modal-header borderless" v-if="$slots.header">
            <slot name="header"></slot>
        </div>

        <div class="modal-body" v-if="$slots.body">
            <slot name="body"></slot>
        </div>

        <div class="modal-footer right" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {

    props: {
        activator: {
            type: String,
            required: false
        },

        hideOverflow: {
            type: Boolean,
            required: false,
            default: false
        },

        show: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return {
            top: 0,
            left: 0,
            scrollStart: 0
        }
    },

    watch: {
        isActive(newVal, oldVal) {
            this.scrollStart = this.scrolledPixels || 0;
            if(newVal === true) {
                this.setCoordinates();
            }
        }
    },

    computed: {
        ...mapGetters([
            'activeModal', 'scrolledPixels', 'touchDelta'
        ]),

        isActive() {
            return this.activeModal == this.activator
        },
        
        scrolledLeft() {
            console.log('scrolledPixels: ' + this.scrolledPixels )
            console.log('scrollStart: ' + this.scrollStart)
            console.log('scrolledLeft: ' + this.left - (this.scrolledPixels - this.scrollStart))
            return this.left - (this.scrolledPixels - this.scrollStart);
        }
    },

    methods: {
        ...mapMutations(['setScrolledPixels']),
        setCoordinates() {
            let currentParent = this.$parent;

            while (currentParent != null) {

                if (currentParent.$refs && currentParent.$refs[this.activator]) {
                    console.log(currentParent.$refs[this.activator].$el.getBoundingClientRect().left);
                    this.top = currentParent.$refs[this.activator].$el.getBoundingClientRect().bottom + window.scrollY;
                    this.left = currentParent.$refs[this.activator].$el.getBoundingClientRect().left;
                    return;
                }
                currentParent = currentParent.$parent;
            }
        }
    },

    mounted() {
        this.setCoordinates();
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal {
    transition: all 0.3s ease;
    transform-origin: top left;
    transform: scale(0.8);
    visibility: hidden;
    opacity: 0;
    overflow: visible;

    min-width: 100px;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    position: absolute;
    z-index: 1000;
    background-color: white;
    border-radius: 5px;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

    &.hide-overflow {
        overflow: hidden;
    }

    &.show {
        transform: scale(1);
        visibility: visible;
        z-index: 2000;
        opacity: 1;
    }
}

.modal-header,
.modal-footer {
    padding: 10px;
}

.modal-body {
    padding: 0;
    font-size: 0.8rem;
}

.modal-header {
    border-bottom: 1px solid $gray-light;
    padding-bottom: 5px;

    h1 {
        font-size: 0.8rem;
        margin: 0;
    }

    &.borderless {
        border-bottom: none;
    }
}

.modal-footer {
    display: flex;
    border-top: 1px solid $gray-light;
    padding-top: 5px;
    font-size: 0.8rem;

    &.borderless {
        border-top: none;
    }

    &.right {
        justify-content: flex-end;
    }

    &.left {
        justify-content: flex-start;
    }

    &.center {
        justify-content: center;
    }
}
</style>