<template lang="html">
    <div v-bind:class="[
        'ui',
        'menu',
        getWidthsClasses('item'),
        {secondary},
        {pointing},
        {tabular},
        {text},
        {vertical},
        {pagination},
        getFixedClasses(),
        {stackable},
        {inverted},
        getColorClass(),
        {fluid},
        {compact},
        getAttachedClasses(),
        {size},
        {fitted},
        {borderless}]">
        <slot></slot>
    </div>
</template>

<script>
    import Widths from '../mixins/commons/widths'
    import Secondary from '../mixins/commons/secondary'
    import Pointing from '../mixins/commons/pointing'
    import Tabular from '../mixins/commons/tabular'
    import Text from '../mixins/commons/text'
    import Vertical from '../mixins/commons/vertical'
    import As from '../mixins/commons/as'
    import Fixed from '../mixins/commons/fixed'
    import Stackable from '../mixins/commons/stackable'
    import Inverted from '../mixins/commons/inverted'
    import Color from '../mixins/commons/color'
    import Fluid from '../mixins/commons/fluid'
    import Compact from '../mixins/commons/compact'
    import Attached from '../mixins/commons/attached'
    import Size from '../mixins/commons/size'
    import Fitted from '../mixins/commons/fitted'
    import Borderless from '../mixins/commons/borderless'

    export default {
        mixins: [Widths, Secondary, Pointing, Tabular, Text, Vertical, As, Fixed, Stackable, Inverted, Color, Fluid, Compact, Attached, Size, Fitted, Borderless],
        props: {
            pagination: {
                type: Boolean,
                required: false,
                default: false,
            }
        }
    }
</script>
