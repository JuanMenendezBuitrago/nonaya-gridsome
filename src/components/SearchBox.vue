<template>
    <div class="input-text" style="position: relative;">
        <div class="text-field" :class="{ isFocussed }" :ref="reference">
            <Search />
            <input type="text" placeholder="Busca por ciudad/barrio" 
                v-model="text" 
                @focus="focus()" 
                @blur="blur()"
                @keydown.esc="blur()" />
            <Close v-if="query.length > 0" @click.native="resetQuery" />
        </div>
        <slot></slot>
    </div>
</template>

<script>
import Close from '~/components/icons/Close.vue';
import Search from '~/components/icons/Search.vue';

import { mapGetters, mapMutations } from 'vuex';


export default {
    components: {
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
        },
        reference: {
            type: String,
            required: false,
        }
    },
    data() {
        return {
            text: "",
            isFocussed: false,
            searchOptions: {
                shouldSort: true,
                // tokenize: true,
                // matchAllTokens: true,
                includeMatches: true,
                threshold: 0.3,
                location: 0,
                distance: 500,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ['town', 'province']
            }
        }
    },

    watch: {
        text(newValue, oldValue) {
            this.setQuery(newValue);
            this.performSearch();
        },

        location(newValue, oldValue){
            console.log('location: ' + newValue);
            this.text = newValue;
        }
    },

    computed: {
        ...mapGetters(['query', 'city', 'neighborhood', 'activeModal']),

        location() {
            return(`${this.city}, ${this.neighborhood}`);
        }
    },

    methods: {
        ...mapMutations(['setQuery', 'setQueryResults', 'setCity', 'setNeighborhood']),

        focus() {
            this.isFocussed = true;
            if (this.query){
                this.text = this.query;
            }
            this.$emit('focussed');
        },

        blur() {
            this.isFocussed = false;
            if(!this.activeModal == 'search'){
                this.$emit('blured');
            }else{
                if(this.city && this.neighborhood){
                    this.text = `${this.city}, ${this.neighborhood}`
                }
            }
        },

        resetQuery() {
            this.text = '';
            this.setQuery('');
            this.resetLocation();

        },

        resetLocation() {
            this.setCity('');
            this.setNeighborhood('');
        },

        performSearch() {
            this.$search(this.query, this.$realStateData, this.searchOptions)
                .then(results => {
                    let unique = results.reduce((accumulator, current) => {
                        const duplicateIndex = accumulator.findIndex(item => {
                            return item.item.town === current.item.town && item.item.province === current.item.province
                        });

                        if (duplicateIndex === -1) {
                            accumulator.push(current);
                        }

                        return accumulator;
                    }, []);
                    this.setQueryResults(unique)
                });
        }
    }

}
</script>

<styles lang="scss">
@import '~/assets/variables.scss';

.input-text {


    .left,
    .right {
        svg {
            path {
                fill: $orange;
            }
        }
    }

    .text-field {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0.5rem;
        border: 1px solid $gray-light;
        border-radius: 3px;
        background-color: $gray-lighter;

        &.isFocussed {
            border-color: $orange;
            background-color: $orange-light;
            justify-content: flex-start;

            input {
                background-color: $orange-light;
                color: $orange;
                text-align: start;
                
                &::placeholder{ 
                    color: $orange;
                }
            }

            svg {
                path {
                    fill: $orange;
                }
            }
        }

        input {
            border-style: none;
            flex: 1;
            text-align: center;
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
    }

    svg {
        width: 1.25rem;
        height: auto;
    }
}
</styles>