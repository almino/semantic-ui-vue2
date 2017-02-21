<template lang="html">
    <div v-bind:class="[getWidthClasses(), 'column']">
      <slot></slot>
    </div>
</template>

<script>
import Width from '../../mixins/commons/width.js'

export default {
    mixins: [Width],
}
</script>
