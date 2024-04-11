<template>
    <div style="position: relative;">
        <div class="dropdown-button" 
            :class="{ flat, selected, simple, withFilters: count > 0 }" 
            :ref="reference"
            @click.stop="$emit('clicked', reference)">
            <Config     
                v-if="icon == 'filter'" />
            <ArrowLeft  
                v-if="icon == 'left'" />

            {{ text + (count > 0 ? `(${count})` : '') }}

            <ArrowRight  
                v-if="icon == 'right'" />
            <ChevronDown 
                v-if="icon == 'down'" 
                selected="selected" />
            <ChevronUp   
                v-if="icon == 'up'" 
                selected="selected" />
        </div>
    </div>
</template>

<script>
import ChevronDown from '~/components/icons/ChevronDown.vue';
import ChevronUp   from '~/components/icons/ChevronUp.vue';
import Config      from '~/components/icons/Config.vue';
import ArrowRight  from '~/components/icons/ArrowRight.vue';
import ArrowLeft   from '~/components/icons/ArrowLeft.vue';

export default {

    components: {
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
        reference: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true,
        },
        count: {
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



.dropdown-button {
    transition: all .2s ease-in;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    white-space: nowrap;
    column-gap: 0.5rem;

    border: 1px solid $gray;
    border-radius: 3px;

    padding: 0.3rem 0.8rem;
    cursor: pointer;
    color: $black;

    svg {
        width: 1.25rem;
        height: auto;

        path {
            fill: $black;
            transition: all .2s ease-in;
        }
    }

    &:hover {
        color: $orange;
        path{
            fill: $orange;
        }
    }



    &.selected {
        border-color: $orange;
        background-color: $orange-light;
        color: $orange;

        svg {
            path {
                fill: $orange;
            }
        }
    }

    &.flat {
        border: none;
    }

    &.simple {
        background-color: transparent;
    }

    &.withFilters {
        font-weight: 600;
    }

    &:hover,
    &.active{
        border-color: $orange;
        .left,
        .right {
            svg {
                path {
                    fill: $orange;
                }
            }
        }
    }
}
</styles>