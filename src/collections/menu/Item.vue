<template lang="html">
    <component :is="getComponentType()" v-bind:class="['item', {active}, {link}, {fitted}, {borderless}, getColorClass(), {right}]">
        <slot></slot>
    </component>
</template>

<script>
    import Active from '../../mixins/commons/active'
    import Link from '../../mixins/commons/link'
    import As from '../../mixins/commons/as'
    import Fitted from '../../mixins/commons/fitted'
    import Borderless from '../../mixins/commons/borderless'
    import Color from '../../mixins/commons/color'
    import Right from '../../mixins/commons/right'

    export default {
        mixins: [Active, As, Link, Fitted, Borderless, Color, Right],
    }
</script>
