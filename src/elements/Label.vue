<template lang="html">
    <component v-bind:is="as" v-bind:class="['ui', getSizeClasses(), 'label']">
        <slot></slot>
    </component>
</template>

<script>
import Size from '../mixins/commons/sizes/eight.js'
import As from '../mixins/commons/props/as.js'

export default {
    mixins: [As, Size]
}
</script>
