<template lang="html">
  <div v-bind:class="['ui', getEqualWidthClasses(), getColumnClasses(), 'grid', { 'container' : container }]">
    <slot></slot>
  </div>
</template>

<script>
import EqualWidth from '../mixins/commons/equal-width.js'
import Column from '../mixins/commons/column.js'

export default {
    mixins: [EqualWidth, Column],
    props: {
        container: {
            type: Boolean,
            default: false
        }
    },
}
</script>
