import Random from './props/random.js'
import FocusEvents from './events/focus.js'
import KeyboardEvents from './events/keyboard.js'
import MouseEvents from './events/mouse.js'
import FormEvents from './events/form.js'
import Type from './props/type.js'

export default {
    mixins: [FocusEvents, KeyboardEvents, MouseEvents, FormEvents],
    props: {
        id: Random,
        accept: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        alt: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        autocomplete: {
            type: String,
            required: false,
            // default: 'off',
            validator(value) {
                return ['on', 'off'].indexOf(value) > -1
            }
        },
        autofocus: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        checked: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        dirname: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        form: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        formaction: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        formenctype: {
            type: String,
            required: false,
            // default: false,
            validator(value) {
                return [
                    'application/x-www-form-urlencoded',
                    'multipart/form-data',
                    'text/plain',
                ].indexOf(value) > -1
            }
        },
        formmethod: {
            type: String,
            required: false,
            // default: false,
            validator(value) {
                return [
                    'get',
                    'post',
                ].indexOf(value) > -1
            }
        },
        formnovalidate: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        formtarget: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        list: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        max: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        maxlength: {
            type: Number,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        min: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        name: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        pattern: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        placeholder: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        readonly: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        required: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // }
        },
        src: {
            type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        step: {
            type: Number,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
        type: Type,
        value: {
            // type: String,
            required: false,
            // default: false,
            // validator(value) {
            //     return true
            // }
        },
    },
    methods: {
        // ref="input" v-bind:value="value" v-on:input="emitInput($event.target.value)"
        emitInput(value) {
            // If the value was not already normalized,
            // manually override it to conform
            if (value !== this.value) {
                this.$refs.input.value = value
            }

            // Emit the number value through the input event
            this.$emit('input', value)
        },
    }
}
