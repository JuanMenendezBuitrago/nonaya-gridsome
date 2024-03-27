<template>
    <div class="button" :class="{flat, active, 'full-width': fullWidth}">
        {{ text }}
    </div>
</template>

<script>

export default {
    props: {
        active: {
            type: Boolean,
            required: false,
        },
        fullWidth: {
            type: Boolean,
            required: false,
        },        
        text: {
            type: String,
            required: true,
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.8rem;
        
        border-width: 1px;
        border-style:  solid;
        border-color: $gray;
        border-radius: 5px;
        
        color: $gray;
        font-weight: 600;
        
        cursor: pointer;
        &.full-width{
            width: 100%;
        }
        &.flat{
            border: none;
        }

        &.active{
            color: $orange;
            border-color: $orange;
        }
    }
</styles>