<template>
    <div
        v-bind:class="[
            {visible},
            'ui',
            {active},
            {search},
            {selection},
            'dropdown'
        ]" v-on:click.self="toggle"
        v-on:keyup.down="selectPrevious"
        v-on:keydown.down="selectNext"
        v-bind:tabindex="search ? '' : 0"
        v-click-outside="hide">
        <input type="hidden" v-bind:name="name" v-if="selection">
        <i class="dropdown icon" v-on:click="toggle"></i>
        <input type="search" class="search" autocomplete="off" tabindex="0"
            ref="search"
            v-model="term"
            v-on:focus="show"
            v-on:blur="hide"
            v-on:keyup.down="selectPrevious"
            v-on:keydown.down="selectNext"
            v-if="search">
        <div v-bind:class="[
            { 'default' : typeof selected.value == 'undefined' },
            'text',
            { filtered },
        ]">{{ selected.text || selected.value || placeholder }}</div>
            <transition
                v-on:before-enter="beforeEnter"
                v-on:after-enter="afterEnter"
                enter-active-class="animating slide down in"
                leave-active-class="animating slide down out"
                v-on:before-leave="beforeLeave"
                v-on:after-leave="afterLeave">
                <div
                    v-bind:class="[{visible}, 'transition', 'menu']"
                    tabindex="-1"
                    v-show="isVisible">
                    <slot>
                        <template v-show="$items.length > 0">
                            <div
                                v-bind:class="[
                                    { 'disabled' : item.disabled },
                                    { 'active selected' : selected == item && !disabled },
                                    'item'
                                ]"
                                v-bind:tabindex="(index + 2) * -1"
                                v-on:focus="setSelected(item)"
                                v-for="(item, index) in $items">
                                {{ item.name ? item.name : item.value }}
                            </div>
                        </template>
                        <div class="message" v-show="$items.length < 1" v-html="messages.noResults"></div>
                    </slot>
                </div>
            </transition>
    </div>
</template>

<script>
    import ClickOutside from '../mixins/commons/click-outside'
    import Input from '../mixins/commons/input'
    import Arrai from '../mixins/commons/arrai.js'

    export default {
        mixins: [ClickOutside, Input, Arrai],
        props: {
            items: {
                type: Array,
                default: () => [],
            },
            selection: {
                type: Boolean,
                default() {
                    return (typeof this.$vnode.componentOptions.propsData.search != 'undefined'
                        && typeof this.$vnode.componentOptions.propsData.search == 'string')
                        || this.$vnode.componentOptions.propsData.search == true
                },
            },
            search: {
                type: Boolean,
                default: false,
            },
            fullTextSearch: {
                type: Boolean,
                default: false,
            },
            messages: {
                type: Object,
                required: false,
                default () {
                    return {
                        addResult: 'Add <b>{term}</b>',
                        count: '{count} selected',
                        maxSelections: 'Max {maxCount} selections',
                        noResults: 'No results found.'
                    }
                }
            }
        },
        data() {
            return {
                /* Toggles active class */
                active: false,
                /* Toggles visible class */
                visible: false,
                /* Toggles element visibility */
                isVisible: false,
                /* Flags animation */
                animating: false,
                /* Search term */
                term: '',
                /* Test */
                selected: this.value,
            }
        },
        computed: {
            filtered() {
                return this.term.length > 0
            },
            $items() {
                var items = []
                var sanitized

                for (var i = 0; i < this.items.length; i++) {
                    /* Makes it easier to work */
                    var item = this.items[i];

                    /* Checks if it is a object */
                    if (this.isObject(item)) {
                            /* Checks for a value property */
                            if (typeof item.value == 'undefined' || item.value.length < 1) {
                                /* Show warning on JavaScript console */
                                console.warn(`Object must have a value property. Schema:
{
    // name displayed in dropdown
    "name"  : "Beyoncé Knowles",
    // selected value
    "value" : "${Math.floor(Math.random() * 10)}" // User ID,
    // name displayed after selection (optional)
    "text"  : "Beyoncé"
    // array of strings to test using user's input as a regexp (optional)
    "disabled"  : ['Beyonce Knowles'] // no diacritcs
    // whether field should be displayed as disabled (optional)
    "disabled"  : false
}
Ignoring item: `, item)

                                /* Skip this item */
                                continue
                            }

                            /* Put value in item name if it is not defined */
                            // item.name = ((typeof item.name == 'undefined') || (item.name.length < 1)) ? item.value : item.name
                            /* Put name in item text if it is not defined */
                            // item.text = (typeof item.text == 'undefined' || item.text.length < 1) ? item.name : item.text
                            /* Disabled's default value is false */
                            // item.disabled = (typeof item.disabled == 'undefined' || typeof item.disabled != 'boolean') ? false : item.disabled
                            /* Put all proprerties in item search if it is not defined */
                            // item.search = (typeof item.search == 'undefined' || item.search.length < 1) ? [item.name, item.text, item.value] : item.search

                            sanitized = item
                    } else {
                        /* Working with basics */
                        sanitized = {
                            value: item,
                        }
                    }

                    if (this.filtered) {
                        /* Nothing is selected */
                        this.selected = {}

                        /* Subjects for regexp */
                        var subjects = this.arrayFlatten([
                            sanitized.value,
                            sanitized.name,
                            sanitized.text,
                            sanitized.search,
                        ])

                        if (!this.fullTextSearch && this.isObject(item)) {
                            subjects.shift()
                        }

                        /* Escape user input */
                        var safe = this.term.split('').map(function(string) {
                            return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
                        })

                        /* Enable full search text or not */
                        var regexp = new RegExp(this.fullTextSearch ? safe.join('.*') : ('^' + safe.join('')), 'im')

                        /* If anything found */
                        if (regexp.test(subjects.join('\n'))) {
                            items.push(sanitized)
                        }
                    } else {
                        if (sanitized.value == this.value) {
                            this.selected = sanitized;
                        }

                        items.push(sanitized)
                    }
                }

                if (items.length < 1) {
                    this.$emit('noresult');
                }

                return items
            }
        },
        watch: {
            isVisible(newVal) {
                this.active = newVal
            },
            selected(newVal, oldVal) {
                if (newVal != oldVal && typeof newVal.value != 'undefined') {
                    this.$emit('input', newVal.value)
                    this.$emit('change')
                    this.term = ''
                }
            },
        },
        methods: {
            toggle() {
                if (!this.animating) {
                    this.visible ? this.hide() : this.show()
                }
            },
            show() {
                this.isVisible = true
                if (this.search) {
                    this.$refs.search.focus()
                }
            },
            hide() {
                if (!this.fullTextSearch && this.filtered && this.$items.length > 0) {
                    this.selected = this.$items[0];
                }

                this.isVisible = false
            },
            clear() {
                this.$emit('input', null)
            },
            restoreDefaults() {
            },
            setSelected(value) {
                this.selected = value
                if (!value.disabled) {
                    this.hide()
                }
            },
            selectPrevious() {
                console.log('prev');
                var pos = this.$items.indexOf(this.selected)

                if (pos > 1)
                    this.setSelected(this.$items[--pos]);
            },
            selectNext() {
                console.log('next');
                var pos = this.$items.indexOf(this.selected)

                if (pos > this.$items.length)
                    this.setSelected(this.$items[++pos]);
            },
            getText() {
                return this.selected.text || this.selected.value
            },
            getValue() {
                return this.selected.value
            },
            beforeEnter() {
                this.visible = true
                this.animating = true
            },
            afterEnter() {
                this.visible = true
                this.animating = false
            },
            beforeLeave() {
                this.animating = true
            },
            afterLeave() {
                this.animating = false
                this.visible = false
            },
            isObject(instance) {
                return !Array.isArray(instance) && instance === Object(instance) 
            },
        },
        created() {
            if (typeof this.value == 'undefined' || this.value === null) {
                this.selected = {}
            }
        },
    }
</script>