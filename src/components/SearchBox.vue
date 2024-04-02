<template>
    <div class="text-field" :class="{focus}">
        <Search/>
        <input type="text" v-model="text" @focus="focus=true" @blur="focus=false"/>
        <Close/>
    </div>
</template>

<script>
import Close   from '~/components/icons/Close.vue';
import Search   from '~/components/icons/Search.vue';

export default {
    components:{
        Close,
        Search
    },
    props: {
        flat: {
            type: Boolean,
            required: false,
            default: false
        },
        selected: {
            type: Boolean,
            required: false,
        }
    },
    data(){
        return{
            text:"foo bar",
            focus: false
        }
    }

}
</script>

<styles lang="scss">
    @import '~/assets/variables.scss';
    .left, .right{
        svg {
            path{
                fill: $orange;
            }
        }
    }
    
    .text-field{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0.5rem;
        border: 1px solid $gray-light;
        border-radius: 3px;
        background-color: $gray-lighter;

        &.focus{
            border-color: $orange;
            background-color: $orange-light;

            input{
                background-color: $orange-light;
                color: $orange;
            }

            svg{
                path{
                    fill: $orange;
                }
            }
        }

        input {
            border-style: none;
            border-width: 0;
            background-color: $gray-lighter;
            font-size: 0.8rem;
            color: $gray-darker;

            &:focus {
                outline: none;
                -webkit-box-shadow: none;
                box-shadow: none;
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
    }

    svg{
        width: 1.25rem;
        height: auto;
    }
</styles>