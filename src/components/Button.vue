<template>
    <a :class="{button: true, flat, active, 'full-width': fullWidth, solid, orange: solid}"
        @click.stop="$emit('clicked')">
        <slot></slot>
    </a>
</template>

<script>

export default {
    name: 'Button',

    props: {
        active: {
            type: Boolean,
            required: false,
        },
        solid: {
            type: Boolean,
            required: false,
        },        
        fullWidth: {
            type: Boolean,
            required: false,
        },        
        flat: {
            type: Boolean,
            required: false,
            default: false
        }
    }

}
</script>

<styles scoped lang="scss">
    @import '~/assets/variables.scss';

    .button{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 6px;
        justify-content: center;
        padding: 0.5rem 0.8rem;
        
        border-width: 1px;
        border-style:  solid;
        border-color: $gray;
        border-radius: 5px;
        
        color: $gray;
        font-weight: 600;

        width: max-content;
        
        cursor: pointer;

        &.full-width{
            width: 100%;
        }
        &.flat{
            border: none;       
        }

        &.solid.orange,
        &:hover,
        &:active{
            background-color: $orange;
            color: white  !important;
            path{
                stroke: white;
            }
        }
        
        &.active{
            color: $orange;
            border-color: $orange;
            path{
                stroke: white;
            }
        }
    }
</styles>