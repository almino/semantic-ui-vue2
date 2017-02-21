export default {
    methods: {
        // v-on:keydown="emitKeyDown"
        emitKeyDown() {
            this.$emit('keydown')
        },
        // v-on:keypress="emitKeyPress"
        emitKeyPress() {
            this.$emit('keypress')
        },
        // v-on:keyup="emitKeyUp"
        emitKeyUp() {
            this.$emit('keyup')
        },
    }
}
