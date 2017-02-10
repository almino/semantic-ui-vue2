<template lang="html">
  <div v-bind:class="['ui', 'grid', { 'container' : container }]">
    <slot></slot>
  </div>
</template>

<script>
export default {
    props: {
        container: {
          type: Boolean,
          default: false
        }
    }
}
</script>
