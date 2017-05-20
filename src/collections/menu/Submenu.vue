<template lang="html">
    <component :is="getComponentType()" v-bind:class="['menu', getColorClass(), {right}]">
        <slot></slot>
    </component>
</template>

<script>
    import As from '../../mixins/commons/as'
    import Color from '../../mixins/commons/color'
    import Right from '../../mixins/commons/right'

    export default {
        mixins: [As, Color, Right]
    }
</script>
