<template>
    <div class="modal" :style="top ? {top: top + 'px'}:{}">
        <div class="modal-header"></div>
        <div class="modal-body"></div>
        <div class="modal-footer">footer</div>
    </div>
</template>

<script>
export default{

    props: {
        activator: {
            type: String,
            required: false
        }
    },

    data() {
        return{
            top: 0,
        }
    }

}
</script>

<style lang="scss">
@import '~/assets/variables.scss';

    .modal{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        position: absolute;
        top: -15px;
        background-color: white;
        border-radius: 5px;

        box-shadow: 0 1px 2px rgba(0,0,0, 0.5);
    }

    .modal-header,
    .modal-body,
    .modal-footer{
        padding:10px;
    }

    .modal-header{
        border-bottom: 1px solid $gray-light;
        padding-bottom: 5px;

        &.borderless{
            border-bottom: none;
        }
    }

    .modal-body{

    }

    .modal-footer{
        border-top: 1px solid $gray-light;
        padding-top: 5px;
        &.borderless{
            border-top: none;
        }
    }
</style>