<template>
    <svg width="1em" height="1em" viewBox="0 0 24 24" :class="{checked, unchecked: !checked}">
        <path 
            d="m10.5 13.4l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-5.6 5.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z">
        </path>
    </svg>
</template>

<script>
export default {
    name: 'CheckIcon',

    props: {
        checked: {
            type: Boolean,
            required: false,
            default: true
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

.checked{
    path{
        fill: $orange,
    }
}

.unchecked{
    path{
        fill: $gray,
    }
}
</style>