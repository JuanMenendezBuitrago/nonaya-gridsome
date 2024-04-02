<template>
    <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="35" height="35">
        <path v-if="checked" fill="#1d262d"
            d="m10.6 13.4l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.5q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z">
        </path>  
        <path v-else fill="#1d262d"
            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5z">
        </path>  
    </svg>
</template>

<script>
export default {
    name: 'Checkbox',

    props:{
        checked:{
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped></style>
