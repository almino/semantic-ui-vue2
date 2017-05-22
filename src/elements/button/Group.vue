<template>
    <div :class="['ui', 'buttons', getIconClasses(), {vertical}, getLabeledClasses(), getWidthsClasses(), getColorClass(), {basic}]">
        <slot></slot>
    </div>
</template>

<script>
    import Icon from '../../mixins/commons/icon'
    import Vertical from '../../mixins/commons/vertical'
    import Labeled from '../../mixins/commons/labeled'
    import Widths from '../../mixins/commons/widths'
    import Color from '../../mixins/commons/color'
    import Basic from '../../mixins/commons/basic'

    export default {
        mixins: [Icon, Vertical, Labeled, Widths, Color, Basic]
    }
</script>
