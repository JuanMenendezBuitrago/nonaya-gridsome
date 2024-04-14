<template>
    <div
        :style="styles"
        :class="{modal: true, centered:centered, show: (show || isActive), 'hide-overflow': hideOverflow }">

        <div v-if="$slots.header" class="modal-header borderless">
            <slot name="header"></slot>
        </div>

        <div v-if="$slots.body" class="modal-body">
            <slot name="body"></slot>
        </div>

        <div v-if="$slots.footer" class="modal-footer right">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'BaseModal',

    props: {
        activator: {
            type: String,
            required: false
        },

        centered: {
            type: Boolean,
            required: false,
            default: false
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
            width: 0,
            scrollStart: 0
        }
    },

    watch: {
        isActive(newVal, oldVal) {
            this.scrollStart = this.scrolledPixels || 0;
            if(newVal === true) {
                this.setCoordinates();
            }
        },
        showMaxPrice(newVal, oldVal) {
            if(this.activator == 'price-max' && newVal === true) {
                this.setWidth();
            }
        },
        showMinPrice(newVal, oldVal) {
            if(this.activator == 'price-min' && newVal === true) {
                this.setWidth();
            }
        }
    },

    computed: {
        ...mapGetters([
            'activeModal', 'scrolledPixels', 'touchDelta', 'showMaxPrice', 'showMinPrice'
        ]),

        isActive() {
            return this.activeModal == this.activator
        },
        
        computedLeft() {
            return this.left - (this.scrolledPixels - this.scrollStart);
        },

        styles() {
            let styles = {};

            if(this.width){
                styles = { ...styles, 'min-width': this.width + 'px'};
            }
            if(this.top){
                styles = { ...styles, top: this.top + 'px'};
            }
            if(this.left && !this.centered){
                styles = {...styles, left: this.computedLeft + 'px' };
            }
            return styles;
        },

        findActivator() {
            let currentParent = this;

            while (currentParent != null) {
                if (currentParent.$refs && currentParent.$refs[this.activator]) {
                    try{
                        if(currentParent.$refs[this.activator].$el)
                            return currentParent.$refs[this.activator].$el
                        
                        return currentParent.$refs[this.activator]
                        
                    }catch(e){
                        console.log(currentParent.$refs)
                    }
                    return;
                }
                currentParent = currentParent.$parent;
            }
        }
    },

    methods: {
        ...mapMutations(['setScrolledPixels']),

        setCoordinates() {
            let activator = this.findActivator
            this.top = activator.getBoundingClientRect().bottom + window.scrollY;
            this.left = activator.getBoundingClientRect().left;
        },

        setWidth() {
            let activator = this.findActivator
            this.width = activator.getBoundingClientRect().width;
        },
    },

    mounted() {
        this.setCoordinates();
        this.setWidth()
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.modal {
    display: none;
    pointer-events: all;

    min-width: 100px;
    width:     max-content;

    flex-direction:  column;
    justify-content: flex-start;
    align-items:     stretch;

    position:         absolute;
    background-color: white;
    border-radius:    5px;

    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);

    &.hide-overflow {
        overflow: hidden;
    }

    &.show {
        display: block;
        z-index: 2000;
        opacity: 1;
    }
}

.modal-body {
    padding: 0;
    font-size: 0.8rem;
}

.modal-header {
    border-bottom: 1px solid $gray-light;
    padding: 10px;
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
    padding: 10px;
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

@media (max-width:430px) {
    .modal.centered {
        width: calc(100vw - 30px);
        left: 15px;
    }
}
</style>