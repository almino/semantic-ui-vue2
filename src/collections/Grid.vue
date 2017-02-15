<template lang="html">
  <div v-bind:class="['ui', 'grid', { 'container' : container }]">
    <slot></slot>
  </div>
</template>

<script>
import EqualWidth from '../mixins/common/equal-width.js'

export default {
    mixins: [EqualWidth],
    props: {
        container: {
            type: Boolean,
            default: false
        }
    }
}
</script>
