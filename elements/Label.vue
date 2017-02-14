<template lang="html">
    <div v-bind:class="['ui', getSizeClasses(), 'label']">
        <slot></slot>
    </div>
</template>

<script>
import Size from '../mixins/common/eight-sizes.js'

export default {
    mixins: [Size]
}
</script>
