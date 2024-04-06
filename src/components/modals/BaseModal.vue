<template>
    <div 
        class="modal" 
        :style="top ? {top: top + 'px'}:{}" 
        :class="{show: (show || isActive), 'hide-overflow': hideOverflow }">
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

export default{

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
        show:{  
            type: Boolean,
            required: false,
            default: false
        }
    },

    data() {
        return{
            top: 0,
        }
    },

    computed: {
        ...mapGetters([
            'activeModal'
        ]),

        isActive(){
            return this.activeModal == this.activator
        }
    },
    mounted() {
        let currentParent = this.$parent;
        
        while (currentParent != null) {
            if (currentParent.$refs && currentParent.$refs[this.activator]) {
                this.top = currentParent.$refs[this.activator].offsetHeight;
                return;
            }
            currentParent = currentParent.$parent;
        }
    }

}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

    .modal{
        transition: all 0.3s ease;
        transform-origin: top left;
        transform: scale(0.8);
        visibility: hidden;
        opacity: 0;
        overflow: visible ;

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

        box-shadow: 0 1px 2px rgba(0,0,0, 0.5);

        &.hide-overflow{
            overflow: hidden;
        }
        &.show{
            transform: scale(1);
            visibility: visible;
            z-index: 2000;
            opacity: 1;
        }
    }

    .modal-header,
    .modal-footer{
        padding:10px;
    }

    .modal-body{
        padding:0;
    }

    .modal-header{
        border-bottom: 1px solid $gray-light;
        padding-bottom: 5px;

        h1{
            font-size: 0.8rem;
            margin: 0;
        }
        &.borderless{
            border-bottom: none;
        }
    }

    .modal-body{

    }

    .modal-footer{
        display: flex;
        border-top: 1px solid $gray-light;
        padding-top: 5px;
        &.borderless{
            border-top: none;
        }
        &.right{
            justify-content: flex-end;
        }
        &.left{
            justify-content: flex-start;
        }
        &.center{
            justify-content: center;
        }
    }
</style>