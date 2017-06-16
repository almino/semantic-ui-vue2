<template lang="html">
    <component v-bind:is="tag" v-bind:class="['ui', getSizeClasses(), 'label']">
        <slot></slot>
    </component>
</template>

<script>
import Size from '../mixins/commons/sizes/eight.js'
import Tag from '../mixins/commons/props/tag.js'

export default {
    mixins: [Tag, Size]
}
</script>
