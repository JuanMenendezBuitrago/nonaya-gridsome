<template>
    <div class="button-with-icon" :class="{flat, selected, simple, withFilters: filterCount > 0}">
        <Config v-if="icon=='filter'" style="margin-right: 0.5rem"/>
        <ArrowLeft v-if="icon=='left'" style="margin-right: 0.5rem"/>
        {{ text + (filterCount > 0 ? `(${filterCount})` : '') }}
        <ArrowRight v-if="icon=='right'" style="margin-left: 0.5rem"/>
        <ChevronDown v-if="icon=='down'" style="margin-left: 0.5rem" :selected="selected"/>
        <ChevronUp v-if="icon=='up'" style="margin-left: 0.5rem" selected="selected"/>
    </div>
</template>

<script>
import ChevronDown from '~/components/icons/ChevronDown.vue';
import ChevronUp   from '~/components/icons/ChevronUp.vue';
import Config      from '~/components/icons/Config.vue';
import ArrowRight  from '~/components/icons/ArrowRight.vue';
import ArrowLeft   from '~/components/icons/ArrowLeft.vue';

export default {
    components:{
        ChevronDown,
        ChevronUp,
        Config,
        ArrowLeft,
        ArrowRight
    },
    props: {
        simple: {
            type: Boolean,
            required: false,
            default: false
        },
        flat: {
            type: Boolean,
            required: false,
            default: false
        },
        selected: {
            type: Boolean,
            required: false,
            default: false
        },
        text: {
            type: String,
            required: true,
        },
        filterCount:{
            type: Number,
            required: false,
        },
        icon: {
            type: String,
            required: false,
            validator: function (value) {
                // The value must match one of these strings
                return ['down', 'up', 'left', 'right', 'filter'].includes(value);
            }
        }
    }

}
</script>

<styles scoped lang="scss">
    @import '~/assets/variables.scss';
    .left, .right{
        svg {
            path{
                fill: $orange;
            }
        }
    }
    
    .button-with-icon{
        display: flex;
        flex-direction: row;
        align-items: center;

        border: 1px solid $gray;
        border-radius: 3px;

        padding: 0.3rem 0.8rem;
        margin-right: 0.5rem;
        cursor: pointer;
        color: $black;

        svg{
            width: 1.25rem;
            height: auto;
            path{
                fill: $black;
            }
        }

        
        &.selected{
            border-color: $orange;
            background-color: $orange-light;
            color: $orange;
            svg {
                path{
                    fill: $orange;
                }
            }
        }
        
        &.flat{
            border: none;
        }
        
        &.simple{
            background-color: transparent;
        }
        
        &.withFilters{
            font-weight: 600;
        }
        
    }
    
</styles>