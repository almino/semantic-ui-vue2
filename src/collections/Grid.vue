<template lang="html">
  <div v-bind:class="['ui', getFloatClasses(), getAlignClasses(), getEqualWidthClasses(), getColumnClasses(), { 'centered' : centered }, 'grid', { 'container' : container }]">
    <slot></slot>
  </div>
</template>

<script>
import EqualWidth from '../mixins/commons/equal-width.js'
import Column from '../mixins/commons/column.js'
import Align from '../mixins/commons/align.js'
import Float from '../mixins/commons/float.js'
import Centered from '../mixins/commons/centered.js'

export default {
    mixins: [EqualWidth, Column, Align, Float, Centered],
    props: {
        container: {
            type: Boolean,
            default: false
        }
    },
}
</script>
