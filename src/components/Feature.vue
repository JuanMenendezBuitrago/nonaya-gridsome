<template>
    <div class="wrapper">
        <div class="icon">
            <Floor v-if="icon=='floor'"/>
            <Area v-if="icon=='area'"/>
            <Room v-if="icon=='room'"/>
            <Bathroom v-if="icon=='bathroom'"/>
            <Heating v-if="icon=='heating'"/>
            <Kind v-if="icon=='kind'"/>
            <Ac v-if="icon=='ac'"/>
            <Furnished v-if="icon=='furnished'"/>
            <Elevator v-if="icon=='elevator'"/>
            <Condition v-if="icon=='condition'"/>
            <Energy v-if="icon=='energy'"/>
            <Euro v-if="icon=='euro'"/>
            <Hourglass v-if="icon=='hourglass'"/>
            <Paw v-if="icon=='paw'"/>
        </div>
        <div class="texts" :class="{'two-rows': line2}">
            <span v-html="line1" class="line1"></span>
            <span v-html="line2" v-if="line2" class="line2"></span>
        </div>
    </div>
</template>

<script>
import Room     from '~/components/icons/Room.vue';
import Bathroom from '~/components/icons/Bathroom.vue';
import Area     from '~/components/icons/Area.vue';
import Floor    from '~/components/icons/Floor.vue';
import Kind     from '~/components/icons/Kind.vue';
import Heating  from '~/components/icons/Heating.vue';
import Ac       from '~/components/icons/Ac.vue';
import Elevator from '~/components/icons/Elevator.vue';
import Condition from '~/components/icons/Condition.vue';
import Furnished from '~/components/icons/Furnished.vue';
import Energy    from '~/components/icons/Energy.vue';
import Paw       from '~/components/icons/Paw.vue';
import Euro      from '~/components/icons/Euro.vue';
import Hourglass from '~/components/icons/Hourglass.vue';

export default {
    components: {
        Room,
        Bathroom,
        Area,
        Floor,
        Ac,
        Kind,
        Heating,
        Elevator,
        Furnished,
        Condition,
        Energy,
        Euro,
        Paw,
        Hourglass
    },
    props:{
        line1: {
            type: String,
            required: true,
        },
        line2:{
            type: String,
            required: false,
        },
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';
    .wrapper{
        display: flex;
        justify-content: flex-start;
        align-items:center;
        margin-right: 15px;
        svg{
            width: 1.75rem;
            height:auto;
            path{
                fill: $gray-darker;
            }
        }
    }
    .icon{
        margin-right: 10px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .texts{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-size: 0.75rem;
        line-height: 0.75rem;
        &.two-rows{
            justify-content: space-between;

            .line1{
                color: $gray-darker;
            }
        }
        .line2{
            font-weight: 600;
            font-size: 0.8rem;
        }
    }
</style>