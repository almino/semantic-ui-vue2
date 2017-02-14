<template lang="html">
    <div v-bind:class="['ui', getSlotsClasses(), getIconClasses(), getSizeClasses(),
        { 'fluid' : fluid }, { 'inverted' : inverted },
        { 'transparent' : transparent }, { 'disabled' : disabled }, 'input',
        { 'focus' : focus }, { 'loading' : dLoading }, { 'error' : error }]">
        <slot name="left-label"></slot>
        <slot name="left-action"></slot>
        <input v-bind:type="'text'" v-bind:placeholder="placeholder" v-bind:disabled="disabled"
            ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)" />
        <slot name="right-label"></slot>
        <slot name="right-action"></slot>
        <i v-bind:class="[dIcon.value, 'icon']" v-if="dIcon.value"></i>
</div>
</template>

<script>
import Input from '../mixins/common/input.js'
import Size from '../mixins/common/six-sizes.js'
import Icon from '../mixins/common/icon.js'

export default {
    mixins: [Input, Icon, Size],
    data() {
        return {
            dIcon: {
                value: this.icon,
                position: this.iconPosition
            },
            dLoading: this.loading
        }
    },
    props: {
        focus: {
            type: Boolean,
            required: false,
            default: false
        },
        loading: {
            type: Boolean,
            required: false,
            // default: dLoading
        },
        error: {
            type: Boolean,
            required: false,
            default: false
        },
        transparent: {
            type: Boolean,
            required: false,
            default: false
            // validator(value) {
            //     return true
            // }
        },
        inverted: {
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
