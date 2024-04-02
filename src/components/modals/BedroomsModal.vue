<template>
    <BaseModal :activator="activator" >
        <template v-slot:header>
            <h1>Habitaciones</h1>
        </template>        
        <template v-slot:body>
            <div class="bedrooms-buttons">
                <div :class="{checked: bedrooms == 0}" @click.stop="setAmount(0)">Todo</div>
                <div :class="{checked: bedrooms == 1}" @click.stop="setAmount(1)">1+</div>
                <div :class="{checked: bedrooms == 2}" @click.stop="setAmount(2)">2+</div>
                <div :class="{checked: bedrooms == 3}" @click.stop="setAmount(3)">3+</div>
            </div>
            <div 
                class="bedrooms-checkbox" 
                :class="{checked: exact}" 
                :style="{visibility : (bedrooms > 0) ? 'visible' : 'hidden'}" 
                @click.stop="toggleCheckbox($event)">
                <Checkbox :checked="exact"/> Número exacto de habitaciones
            </div>
        </template>
        <template v-slot:footer>
            <Button flat solid text="Mostrar viviendas" />
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from './BaseModal.vue';
import Button from '../Button.vue';
import ButtonWithIcon from '../ButtonWithIcon.vue';
import Checkbox from '../icons/Checkbox.vue';

import { mapGetters, mapMutations } from 'vuex';


export default {
    components: {
        BaseModal,
        Button,
        ButtonWithIcon,
        Checkbox
    },
    props: {
        activator: {
            type: String,
            required: false
        }
    },
    data(){
        return {
            value: 0,
            exact: false
        }
    },
    computed: {
        ...mapGetters(['bedrooms'])
    },

    methods:{
        ...mapMutations(['setBedrooms', 'setActiveModal']),

        setAmount(amount) {
            this.setBedrooms(amount);
        }, 

        toggleCheckbox(event) {
            this.exact = !this.exact;
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.bedrooms-buttons{
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 5px 10px;

    &>div{
        flex: 1;
        text-align: center;
        padding: 10px 20px;
        border-top: 1px solid $gray;
        border-bottom: 1px solid $gray;
        border-left: 1px solid $gray;
        cursor: pointer;

        &.checked{
            background-color: $orange;
            color: white;
            border-color: $orange;
            &+div{
                border-left-color: $orange;
            }
            &:hover{
                color: white;
            }
        }

        &:hover{
            &+div{
                border-left-color: $orange;
            }
            border-color: $orange;
            color: $orange;
        }



        &:first-child{
            &:hover{
                border-color: $orange;
            }
            border-radius: 5px 0 0 5px;
        }
        &:last-child{
            &:hover{
                border-color: $orange;
            }
            border-radius: 0 5px 5px 0;
            border-right: 1px solid $gray;
        }
    }
}

.bedrooms-checkbox{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 5px;
    padding: 5px 10px;
    cursor: pointer;
    
    svg{
        width: 1.2rem;
        height: auto;
    }
    
    path{
        fill: $gray;
    }

    &:hover{
        color: $orange;
        path{
            fill: $orange;
        }
    }

    &.checked{
        path{
            fill: $orange;
        }
    }
}
.modal-list-item{
    padding: calc(5px + 0.3rem) calc(10px + 0.8rem);
    cursor: pointer;

    &:hover{
        background-color: $orange;
        color: white;
    }
}

.price-form{
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 5px;
    padding: 10px;
    &>label{
        font-size: 0.6rem;
        font-weight: 600;
        width: calc(50% - 5px);
    }
    &>div{
        width: calc(50% - 5px);
    }
}

</style>