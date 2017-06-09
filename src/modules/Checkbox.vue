<template lang="html">
    <div v-bind:class="['ui', { 'disabled' : disabled }, { 'fitted' : fitted },
        { 'read-only' : readonly }, { 'checked' : isChecked() },
        { 'disabled' : disabled }, typeClass, 'checkbox', { 'focus' : focus },
        { 'error' : error }]">
        <input
            v-bind:id="id"
            v-bind:accept="accept"
            v-bind:alt="alt"
            v-bind:autocomplete="autocomplete"
            v-bind:autofocus="autofocus"
            v-bind:checked="isChecked()"
            v-bind:dirname="dirname"
            v-bind:disabled="disabled"
            v-bind:form="form"
            v-bind:formaction="formaction"
            v-bind:formenctype="formenctype"
            v-bind:formmethod="formmethod"
            v-bind:formnovalidate="formnovalidate"
            v-bind:formtarget="formtarget"
            v-bind:list="list"
            v-bind:max="max"
            v-bind:maxlength="maxlength"
            v-bind:min="min"
            v-bind:multiple="multiple"
            v-bind:name="name"
            v-bind:pattern="pattern"
            v-bind:placeholder="placeholder"
            v-bind:readonly="readonly"
            v-bind:required="required"
            v-bind:src="src"
            v-bind:step="step"
            v-bind:type="inputType"
            v-bind:value="inputValue"
            v-on:keydown="emitKeyDown"
            v-on:keypress="emitKeyPress"
            v-on:keyup="emitKeyUp"
            v-on:mouseenter="emitMouseEnter"
            v-on:mouseover="emitMouseOver"
            v-on:mousemove="emitMouseMove"
            v-on:mousedown="emitMouseDown"
            v-on:mouseup="emitMouseUp"
            v-on:click="emitClick"
            v-on:dblclick="emitDoubleClick"
            v-on:wheel="emitWheel"
            v-on:mouseleave="emitMouseLeave"
            v-on:mouseout="emitMouseOut"
            v-on:pointerlockchange="emitPointerLockChange"
            v-on:pointerlockerror="emitPointerLockError"
            v-on:blur="emitBlur"
            v-on:change="emitChange($event.target.value)"
            v-on:contextmenu="emitContextMenu"
            v-on:focus="emitFocus"
            v-on:input="emitInput($event.target.value)"
            v-on:invalid="emitInvalid"
            v-on:reset="emitReset"
            v-on:search="emitSearch"
            v-on:select="emitSelect"
            v-on:submit="emitSubmit"
            ref="input" />
            <label v-bind:for="id">
                <slot>{{ label }}</slot>
            </label>
    </div>
</template>

<script>
    import Constants from '../mixins/commons/constants.js'
    import Input from '../mixins/commons/input/'
    import RandomProp from '../mixins/commons/props/random.js'
    import Focus from '../mixins/commons/states/focus.js'
    import Error from '../mixins/commons/states/error.js'

    const types = [
        Constants.checkbox,
        Constants.radio,
        Constants.slider,
        Constants.toggle,
    ]

    const inputTypes = [
        Constants.checkbox,
        Constants.radio,
    ]

    export default {
        mixins: [Input, Focus, Error],
        data() {
            return {
                dIcon: {
                    value: this.icon,
                    position: this.iconPosition
                },
            }
        },
        props: {
            id: RandomProp,
            checked: {
                type: Boolean,
                default: undefined,
            },
            fitted: {
                type: Boolean,
                default: false,
            },
            inputType: {
                type: String,
                required: false,
                default() {
                    return this.type == Constants.radio ? Constants.radio : Constants.checkbox
                },
                validator(value) {
                    return inputTypes.indexOf(value) > -1
                }
            },
            label: {
                type: String,
                required: false,
            },
            type: {
                type: String,
                required: false,
                default: Constants.checkbox,
                validator(value) {
                    return types.indexOf(value) > -1;
                },
            },
        },
        computed: {
            typeClass() {
                return this.type != Constants.checkbox ? this.type : false
            },
            inputValue() {
                var attrs = this.$vnode.data.attrs

                if (typeof attrs != 'undefined' && attrs.value) {
                    return attrs.value
                }

                if (this.inputType != Constants.radio && this.trueVal) {
                    return this.trueVal
                }

                return this.value
            },
            trueVal() {
                if (typeof this.$vnode.data.attrs == 'undefined') {
                    return null;
                }

                return this.$vnode.data.attrs['true-value'];
            },
            falseVal() {
                if (typeof this.$vnode.data.attrs == 'undefined') {
                    return null;
                }

                return this.$vnode.data.attrs['false-value'];
            },
        },
        methods: {
            emitChange(value) {
                var input = this.$refs.input;

                if (this.inputType == Constants.radio && this.isChecked()) {
                    this.$emit('input', this.inputValue);
                }

                if (Array.isArray(this.value)) {
                    var result = this.value;
                    var index = this.value.indexOf(this.inputValue);

                    if (index == -1 && input.checked) {
                        result.push(this.inputValue);
                    }

                    if (index > -1 && !input.checked) {
                        result.splice(index, 1);
                    }

                    // https://forum.vuejs.org/t/custom-checkbox-component/1120/8
                    this.$emit('input', result);
                } else {
                    if (this.trueVal || this.falseVal) {
                        if (this.trueVal && input.checked) {
                            this.$emit('input', this.trueVal);
                        }
                        
                        if (this.falseVal && !input.checked) {
                            this.$emit('input', this.falseVal);
                        }
                    } else {
                        if (this.inputType == Constants.radio) {
                            this.$emit('input', this.inputValue);
                        } else {
                            this.$emit('input', !this.value);
                        }
                    }
                }

                this.$emit('change', this.isChecked());
            },
            usesVueModel() {
                return typeof this.$vnode.data.attrs != 'undefined'
                    && this.$vnode.data.attrs.value
                    && Array.isArray(this.value)
            },
            isChecked() {
                if (this.usesVueModel()) {
                    return this.value.indexOf(this.inputValue) > -1
                }

                if (this.inputType == Constants.radio) {
                    return this.value == this.$vnode.data.attrs.value;
                }

                if (this.value !== true && this.value !== false) {
                    return this.value == this.trueVal
                }

                return this.value
            },
            isUnchecked() {
                return !this.isChecked()
            },
        },
    }
</script>

<style scoped>
    .ui.checkbox label {
        cursor: pointer;
        user-select: none;
    }
</style>

<docs type="md">
    `v-model` has to be an `array` if you want to track multiple selections
</docs>

