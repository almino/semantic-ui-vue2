<template lang="html">
    <div v-bind:class="[getEqualWidthClasses(), getColumnClasses(), 'row']">
      <slot></slot>
    </div>
</template>

<script>
import EqualWidth from '../../mixins/commons/equal-width.js'
import Column from '../../mixins/commons/column.js'

export default {
    mixins: [EqualWidth, Column],
}
</script>
