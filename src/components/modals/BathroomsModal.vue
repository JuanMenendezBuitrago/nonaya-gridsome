<template>
    <BaseModal :activator="activator" :centered="$isMobile()">

        <template v-slot:header>
            <h1>Baños</h1>
        </template>        

        <template v-slot:body>
            <div class="bathrooms-buttons">
                <div :class="{checked: bathrooms == 0}" @click.stop="selectAmount(0)">Todo</div>
                <div :class="{checked: bathrooms == 1}" @click.stop="selectAmount(1)">1+</div>
                <div :class="{checked: bathrooms == 2}" @click.stop="selectAmount(2)">2+</div>
                <div :class="{checked: bathrooms == 3}" @click.stop="selectAmount(3)">3+</div>
            </div>
            <div 
                :class="{'bathrooms-checkbox': true, checked: exact}" 
                :style="{visibility: (bathrooms > 0) ? 'visible' : 'hidden'}" 
                @click.stop="toggleCheckbox($event)">
                <Checkbox :checked="exact"> Número exacto de baños</Checkbox>
            </div>
        </template>

        <template v-slot:footer>
            <Button flat solid>Mostrar viviendas</Button>
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
    name: 'BathroomModal',
    
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
        ...mapGetters(['bathrooms'])
    },

    methods:{
        ...mapMutations(['setBathrooms', 'setActiveModal']),

        selectAmount(amount) {
            this.setBathrooms(amount);
        }, 

        toggleCheckbox(event) {
            this.exact = !this.exact;
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.bathrooms-buttons{
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
            background-color: $orange-light;
            color: $orange;
            border-color: $orange;
            &+div{
                border-left-color: $orange;
            }
            &:hover{
                color: $orange;
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
            border-radius: 0 5px 5px 0;
            border-right: 1px solid $gray;
            &:hover{
                border-color: $orange;
            }
            &.checked{
                border-right: 1px solid $orange;
            }
        }
    }
}

.bathrooms-checkbox{
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


</style>