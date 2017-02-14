//  ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)"

export default {
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: String
        }
    },
    methods: {
        updateValue(value) {
            // If the value was not already normalized,
            // manually override it to conform
            if (value !== this.value) {
                this.$refs.input.value = value
            }

            // Emit the number value through the input event
            this.$emit('input', value)
        }
    }
}
