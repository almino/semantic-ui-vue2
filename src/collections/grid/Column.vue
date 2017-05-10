<template lang="html">
    <div v-bind:class="[getFloatClasses(), getAlignClasses(), getWidthClasses(), 'column']">
      <slot></slot>
    </div>
</template>

<script>
import Width from '../../mixins/commons/width.js'
import Align from '../../mixins/commons/align.js'
import Float from '../../mixins/commons/float.js'

export default {
    mixins: [Width, Align, Float],
}
</script>
