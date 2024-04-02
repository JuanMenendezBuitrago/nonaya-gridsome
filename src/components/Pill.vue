<template>
    <div class="pill" :class="{reserved:content=='reserved', available:content=='available'}">
        {{ text }}
    </div>
</template>

<script>
export default {
    props: {
        content: {
            required: true
        }
    },

    computed : {
        text() {
            if (this.content == 'reserved')
                return 'Reservado';
            if (this.content == 'available')
                return 'Disponible';

            return this.content;
        }
    }
}
</script>

<style scoped lang="scss">
@import '~/assets/variables.scss';

.pill {
    font-size: 0.75rem;
    color: $gray-darker;
    background-color: $gray-lighter;
    border-radius: 1rem;
    padding: 0.4rem 1rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 15px;

    &.available{
        color: $green;
        background-color: $green-light;
    }
}
</style>