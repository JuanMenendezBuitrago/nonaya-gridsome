<template>
    <label class="toggle-control" @click.stop="clicked">
        <input type="checkbox" :checked="value">
        <span class="control"></span>
    </label>
</template>

<script>
export default {
    name: 'switch',
    data(){
        return{
            value: false,
        }
    },

    methods: {
        clicked(){
            if (this.value)
                this.$emit('checked')
            else
                this.$emit('unchecked')
        }
    },

    mounted(){
        this.value = this.checked;
    }
}
</script>

<style lang="scss">
@import '~/assets/variables.scss';


.toggle-control {
    display: block;
    position: relative;
    padding-left: $toggle-width;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select: none;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    input:checked~.control {
        background-color: $toggle-background-color-on;

        &:after {
            left: $toggle-width - $toggle-control-size - $toggle-gutter;
        }
    }

    .control {
        position: absolute;
        top: 0;
        left: 0;
        height: $toggle-height;
        width: $toggle-width;
        border-radius: $toggle-radius;
        background-color: $toggle-background-color-off;
        transition: background-color $toggle-control-speed $toggle-control-ease;

        &:after {
            content: "";
            position: absolute;
            left: $toggle-gutter;
            top: $toggle-gutter;
            width: $toggle-control-size;
            height: $toggle-control-size;
            border-radius: $toggle-radius;
            background: $toggle-control-color;
            transition: left $toggle-control-speed $toggle-control-ease;
        }
    }
}

/* Center the control */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #222229;
    color: white;
}
</style>