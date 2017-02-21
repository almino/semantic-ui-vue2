export default {
    methods: {
        // v-on:focus="emitFocus"
        emitFocus() {
            this.$emit('focus')
        },
        // v-on:blur="emitBlur"
        emitBlur() {
            this.$emit('blur')
        },
    }
}
