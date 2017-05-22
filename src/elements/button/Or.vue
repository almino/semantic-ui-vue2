<template>
    <div class="or" :data-text="this.text"></div>
</template>

<script>
    export default {
        props: {
            text: {
                Type: String,
                required: false,
                default: 'or'
            }
        }
    }
</script>
