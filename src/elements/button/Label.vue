<template>
    <component :is="getComponentType('a')" :class="['ui', 'basic', 'label', {right}, {pointing}, getColorClass()]"
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
    import MouseEvents from '../../mixins/commons/events/mouse'
    import As from '../../mixins/commons/as'
    import Pointing from '../../mixins/commons/pointing'
    import Right from '../../mixins/commons/right'
    import Color from '../../mixins/commons/color'

    export default {
        mixins: [MouseEvents, As, Pointing, Right, Color]
    }
</script>
