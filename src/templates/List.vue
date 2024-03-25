<template>
    <div>
        <Menu :filter="true"/>
    </div>
</template>


<script>
import Menu from '~/src/components/Menu.vue'
import { store } from '~/data/store.js';

export default {
    components: {
        Menu
    }
}
</script>

<style lang="scss">

</style>