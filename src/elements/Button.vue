<template>
    <component :is="getComponentType('button')" :class="['ui', 'button', {primary}, {secondary}, {animated}, getLabeledClasses(), getColorClass(), getIconClasses(), {basic}, {positive}, {negative}, {inverted}, {active}, {disabled}, {loading}, size, getFloatClasses(), {compact}, {fluid}, {circular}]"
        v-on:mouseenter="emitMouseEnter"
        v-on:mouseover="emitMouseOver"
        v-on:mousemove="emitMouseMove"
        v-on:mousedown="emitMouseDown"
        v-on:mouseup="emitMouseUp"
        v-on:click="emitClick"
        v-on:mouseleave="emitMouseLeave"
        v-on:mouseout="emitMouseOut"
    >
        <slot></slot>
    </component>
</template>

<script>
    import MouseEvents from '../mixins/commons/events/mouse'
    import Primary from '../mixins/commons/primary'
    import Secondary from '../mixins/commons/secondary'
    import Animated from '../mixins/commons/animated'
    import As from '../mixins/commons/as'
    import Labeled from '../mixins/commons/labeled'
    import Color from '../mixins/commons/color'
    import Icon from '../mixins/commons/icon'
    import Basic from '../mixins/commons/basic'
    import Positive from '../mixins/commons/positive'
    import Negative from '../mixins/commons/negative'
    import Inverted from '../mixins/commons/inverted'
    import Active from '../mixins/commons/active'
    import Disabled from '../mixins/commons/disabled'
    import Loading from '../mixins/commons/loading'
    import Size from '../mixins/commons/size'
    import Float from '../mixins/commons/float'
    import Compact from '../mixins/commons/compact'
    import Fluid from '../mixins/commons/fluid'
    import Circular from '../mixins/commons/circular'

    export default {
        mixins: [MouseEvents, Primary, Secondary, Animated, As, Labeled, Color, Icon, Basic, Positive, Negative, Inverted, Active, Disabled, Loading, Size, Float, Compact, Fluid, Circular]
    }
</script>
