<template lang="html">
    <div v-bind:class="['header', {item}]">
        <slot></slot>
    </div>
</template>

<script>
    import As from '../../mixins/commons/as'

    export default {
        mixins: [As],
        props: {
            item: {
                type: Boolean,
                required: false,
                default: false,
            }
        }
    }
</script>
