<template lang="html">
    <div v-bind:class="['ui', getSlotsClasses(), getIconClasses(), getSizeClasses(),
        { 'fluid' : fluid }, { 'inverted' : inverted },
        { 'transparent' : transparent }, { 'disabled' : disabled }, 'input',
        { 'loading' : loading }, { 'error' : error }]">
        <slot name="left-label"></slot>
        <slot name="left-action"></slot>
        <input
            v-bind:id="id"
            v-bind:accept="accept"
            v-bind:alt="alt"
            v-bind:autocomplete="autocomplete"
            v-bind:autofocus="autofocus"
            v-bind:checked="checked"
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
            v-bind:type="type"
            v-bind:value="value"
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
        <slot name="right-label"></slot>
        <slot name="right-action"></slot>
        <i v-bind:class="[dIcon.value, 'icon']" v-if="dIcon.value"></i>
    </div>
</template>

<script>
import Constants from '../mixins/commons/constants.js'
import Input from '../mixins/commons/input/'
import RandomProp from '../mixins/commons/props/random.js'
import Loading from '../mixins/commons/states/loading.js'
import Error from '../mixins/commons/states/error.js'
import Icon from '../mixins/commons/icon.js'
import Inverted from '../mixins/commons/inverted.js'
import Size from '../mixins/commons/sizes/six.js'

export default {
    mixins: [Input, Loading, Error, Icon, Inverted, Size],
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
        transparent: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // },
        },
        fluid: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // },
        }
    },
    created() {
        if (this.loading && !this.icon) {
            this.dIcon.value = 'notched circle loading';
            this.dIcon.position = Constants.left;
        }

        if (this.leftIcon) {
            this.dIcon.value = this.leftIcon;
            this.dIcon.position = Constants.left;
        }
    },
    methods: {
        getIconClasses() {
            if (this.dIcon.value) {
                return (this.dIcon.position == Constants.right ? Constants.icon : this.dIcon.position + ' ' + Constants.icon)
            }

            return false
        },
        getSlotsClasses() {
            var classes = []

            if (this.$slots.hasOwnProperty('right-label')) {
                classes.push(Constants.right)
            }

            if (
                    this.$slots.hasOwnProperty('left-label') || this.$slots.hasOwnProperty('right-label')
                ) {
                classes.push(Constants.labeled)
            }

            if (this.$slots.hasOwnProperty('left-action')) {
                classes.push(Constants.left)
            }

            if (this.$slots.hasOwnProperty('left-action') || this.$slots.hasOwnProperty('right-action')) {
                classes.push(Constants.action)
            }

            return classes;
        },
        blur() {
            this.$refs.input.blur()
        },
        focus() {
            this.$refs.input.focus()
        },
    }
}
</script>

<docs lang="md">
    # Input

    ```html
    <ui-input placeholder="Search…" left-icon="search" />
    <ui-input placeholder="Search…">
    	<button class="ui button" slot="right-action">Search</button>
    </ui-input>
    <ui-input placeholder="Search…" size="large">
        <ui-label slot="left-label">Search</ui-label>
        <i class="search icon" slot="left-icon"></i>
        <ui-label slot="right-label">Search</ui-label>
    </ui-input>
    ```

    # Output

    ```html
    <div class="ui left icon input">
        <input type="text" placeholder="Search…">
        <i class="search icon"></i>
    </div>
    <div class="ui action input">
    	<input type="text" placeholder="Search…">
        <button class="ui button">Search</button>
    </div>
    <div class="ui right labeled large input">
    	<div class="ui label">Search</div>
        <input type="text" placeholder="Search…">
        <div class="ui label">Search</div>
    </div>
    ```
</docs>
