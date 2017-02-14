<template lang="html">
    <div v-bind:class="['ui', getSlotsClasses(), getIconClasses(), getSizeClasses(),
        { 'fluid' : fluid }, { 'inverted' : inverted },
        { 'transparent' : transparent }, { 'disabled' : disabled }, 'input',
        { 'focus' : focus }, { 'loading' : loading }, { 'error' : error }]">
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
            v-on:keydown="emitKeyDown" v-on:keypress="emitKeyPress"
            v-on:keyup="emitKeyUp" v-on:mouseenter="emitMouseEnter"
            v-on:mouseover="emitMouseOver" v-on:mousemove="emitMouseMove"
            v-on:mousedown="emitMouseDown" v-on:mouseup="emitMouseUp"
            v-on:click="emitClick" v-on:dblclick="emitDoubleClick"
            v-on:contextmenu="emitContextMenu" v-on:wheel="emitWheel"
            v-on:mouseleave="emitMouseLeave" v-on:mouseout="emitMouseOut"
            v-on:select="emitSelect"
            v-on:pointerlockchange="emitPointerLockChange"
            v-on:pointerlockerror="emitPointerLockError"
            v-on:focus="emitFocus" v-on:blur="emitBlur"
            ref="input" v-bind:value="value" v-on:input="emitInput($event.target.value)" />
        <slot name="right-label"></slot>
        <slot name="right-action"></slot>
        <i v-bind:class="[dIcon.value, 'icon']" v-if="dIcon.value"></i>
    </div>
</template>

<script>
import Input from '../mixins/common/input.js'
import Focus from '../mixins/common/states/focus.js'
import Loading from '../mixins/common/states/loading.js'
import Error from '../mixins/common/states/error.js'
import Icon from '../mixins/common/icon.js'
import Inverted from '../mixins/common/inverted.js'
import Size from '../mixins/common/sizes/six.js'

export default {
    mixins: [Input, Focus, Loading, Error, Icon, Inverted, Size],
    data() {
        return {
            dIcon: {
                value: this.icon,
                position: this.iconPosition
            },
        }
    },
    props: {
        transparent: {
            type: Boolean,
            required: false,
            default: false
            // validator(value) {
            //     return true
            // }
        },
        fluid: {
            type: Boolean,
            required: false,
            default: false
            // validator(value) {
            //     return true
            // }
        }
    },
    created() {
        if (this.loading && !this.icon) {
            this.dIcon.value = 'notched circle loading';
            this.dIcon.position = 'left';
        }

        if (this.leftIcon) {
            this.dIcon.value = this.leftIcon;
            this.dIcon.position = 'left';
        }
    },
    methods: {
        getIconClasses() {
            if (this.dIcon.value) {
                return (this.dIcon.position == 'right' ? 'icon' : this.dIcon.position + ' icon')
            }

            return false
        },
        getSlotsClasses() {
            var classes = [],
                labeled = 'labeled',
                action = 'action'

            if (this.$slots.hasOwnProperty('right-label')) {
                classes.push('right')
            }

            if (this.$slots.hasOwnProperty('left-label') || this.$slots.hasOwnProperty('right-label')) {
                classes.push(labeled)
            }

            if (this.$slots.hasOwnProperty('left-action')) {
                classes.push('left')
            }

            if (this.$slots.hasOwnProperty('left-action') || this.$slots.hasOwnProperty('right-action')) {
                classes.push(action)
            }

            return classes;
        }
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
