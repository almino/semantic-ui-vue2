export default {
    methods: {
        // v-on:mouseenter="emitMouseEnter"
        emitMouseEnter() {
            this.$emit('mouseenter')
        },
        // v-on:mouseover="emitMouseOver"
        emitMouseOver() {
            this.$emit('mouseover')
        },
        // v-on:mousemove="emitMouseMove"
        emitMouseMove() {
            this.$emit('mousemove')
        },
        // v-on:mousedown="emitMouseDown"
        emitMouseDown() {
            this.$emit('mousedown')
        },
        // v-on:mouseup="emitMouseUp"
        emitMouseUp() {
            this.$emit('mouseup')
        },
        // v-on:click="emitClick"
        emitClick() {
            this.$emit('click')
        },
        // v-on:dblclick="emitDoubleClick"
        emitDoubleClick() {
            this.$emit('dblclick')
        },
        // v-on:contextmenu="emitContextMenu"
        emitContextMenu() {
            this.$emit('contextmenu')
        },
        // v-on:wheel="emitWheel"
        emitWheel() {
            this.$emit('wheel')
        },
        // v-on:mouseleave="emitMouseLeave"
        emitMouseLeave() {
            this.$emit('mouseleave')
        },
        // v-on:mouseout="emitMouseOut"
        emitMouseOut() {
            this.$emit('mouseout')
        },
        // v-on:select="emitSelect"
        emitSelect() {
            this.$emit('select')
        },
        // v-on:pointerlockchange="emitPointerLockChange"
        emitPointerLockChange() {
            this.$emit('pointerlockchange')
        },
        // v-on:pointerlockerror="emitPointerLockError"
        emitPointerLockError() {
            this.$emit('pointerlockerror')
        },
    }
}
