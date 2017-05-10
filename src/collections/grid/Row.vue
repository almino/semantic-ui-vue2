<template lang="html">
    <div v-bind:class="[getFloatClasses(), getAlignClasses(),getEqualWidthClasses(), getColumnClasses(), 'row']">
      <slot></slot>
    </div>
</template>

<script>
import EqualWidth from '../../mixins/commons/equal-width.js'
import Column from '../../mixins/commons/column.js'
import Align from '../../mixins/commons/align.js'
import Float from '../../mixins/commons/float.js'

export default {
    mixins: [EqualWidth, Column, Align, Float],
}
</script>
