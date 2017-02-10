<template lang="html">
    <div class="column">
      <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        width: {
          type: Number,
          required: false
        }
    }
}
</script>
