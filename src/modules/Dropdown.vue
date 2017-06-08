<template>
    <div
        v-bind:class="[
            {visible},
            'ui',
            {active},
            {search},
            {selection},
            { 'upward' : isUpward },
            'dropdown'
        ]" v-on:click.self="toggle"
        v-on:keydown.up="search ? false : selectPrevious()"
        v-on:keydown.down="search ? false : selectNext()"
        v-bind:tabindex="search ? '' : 0"
        v-click-outside="hide">
        <input type="hidden" v-bind:name="name" v-if="selection">
        <i class="dropdown icon" v-on:click="toggle"></i>
        <input type="search" class="search" autocomplete="off" tabindex="0"
            ref="search"
            v-model="term"
            v-on:focus="show"
            v-on:blur="hide"
            v-on:keydown.up="selectPrevious"
            v-on:keydown.down="selectNext"
            v-if="search">
        <div v-bind:class="[
            { 'default' : typeof selected.value == 'undefined' },
            'text',
            { filtered },
        ]">{{ selected.text || selected.value || placeholder || text }}</div>
            <transition
                v-on:before-enter="beforeEnter"
                v-on:after-enter="afterEnter"
                v-bind:enter-active-class="enterActiveClass"
                v-bind:leave-active-class="leaveActiveClass"
                v-on:before-leave="beforeLeave"
                v-on:after-leave="afterLeave">
                <div
                    ref="menu"
                    v-bind:class="[{visible}, 'transition', 'menu']"
                    tabindex="-1"
                    v-show="isVisible">
                    <slot>
                        <template v-show="$items.length > 0">
                            <div
                                ref="items"
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
    import Constants from '../mixins/commons/constants.js'
    import ClickOutside from '../mixins/commons/click-outside/'
    import Input from '../mixins/commons/input/'
    import Arrai from '../mixins/commons/arrai.js'

    export default {
        mixins: [ClickOutside, Input, Arrai],
        props: {
            text: {
                type: String,
            },
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
            transition: {
                type: String,
                default () {
                    var classes = [Constants.slide]

                    classes.push(this.isUpward ? Constants.up : Constants.down)

                    return classes.join(' ')
                },
            },
            upward: {
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
                /* Stores the selected item */
                selected: this.value,
                /* Automatically show upward */
                isUpward: this.upward,
                /* Default option selected */
                default: this.value,
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
                            if (typeof item.value == 'undefined' || item.value.length < 1 && this.selection) {
                                /* Show warning on JavaScript console */
                                console.warn(`Object must have a value property. Schema:
{
    // name displayed in dropdown
    "name"      : "Beyoncé Knowles",
    // selected value
    "value"     : "${Math.floor(Math.random() * 10)}" // User ID,
    // name displayed after selection (optional)
    "text"      : "Beyoncé"
    // array of strings to test using user's input as a regexp (optional)
    "search"    : ['Beyonce Knowles'] // no diacritcs version
    // whether field should be displayed as disabled (optional)
    "disabled"  : false
}
Ignoring item: `, item)

                                /* Skip this item */
                                continue
                            }

                            sanitized = item
                    } else {
                        /* Working with basics */
                        sanitized = {
                            value: item,
                        }

                        if (item == this.value) {
                            this.selected = sanitized
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
                    this.$emit('noresult', this.term);
                }

                return items
            },
            enterActiveClass() {
                var classes = [Constants.animating]

                if (typeof this.$vnode.componentOptions.propsData.transition == 'undefined') {
                    classes.push(Constants.slide)
                    classes.push(this.isUpward ? Constants.up : Constants.down)
                } else {
                    classes.push(this.transition)
                }

                classes.push(Constants.in)

                return this.arrayFlatten(classes).join(' ');
            },
            leaveActiveClass() {
                var classes = [Constants.animating]

                if (typeof this.$vnode.componentOptions.propsData.transition == 'undefined') {
                    classes.push(Constants.slide)
                    classes.push(this.isUpward ? Constants.up : Constants.down)
                } else {
                    classes.push(this.transition)
                }

                classes.push(Constants.out)

                return this.arrayFlatten(classes).join(' ');
            },
        },
        watch: {
            isVisible(newVal) {
                this.active = newVal
            },
            selected(newVal, oldVal) {
                if (newVal != oldVal && typeof newVal.value != 'undefined') {
                    this.$emit('input', newVal.value)
                    this.$emit('change')
                }
            },
            term(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.$emit('search', newVal)
                }
            }
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

                if (typeof this.$vnode.componentOptions.propsData.upward == 'undefined') {
                    // get the window height https://gist.github.com/joshcarr/2f861bd37c3d0df40b30
                    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

                    var bottom = this.$el.getBoundingClientRect().bottom

                    // menu element
                    var menu = this.$refs.menu

                    // put the menu element into the DOM
                    menu.style.visibility = 'hidden'
                    menu.style.display = 'block'

                    this.isUpward = (menu.offsetHeight + bottom > windowHeight)
                    
                    menu.removeAttribute('style')
                }
            },
            hide() {
                if (
                    !this.fullTextSearch
                    && this.filtered
                    && this.$items.length > 0
                    && !this.isSelected()
                ) {
                    this.selected = this.$items[0]
                }

                this.isVisible = false
            },
            clear() {
                this.$emit('input', null)
            },
            restoreDefaults() {
            },
            setSelected(value) {
                if (this.isObject(value) && typeof value.value != 'undefined' && !value.disabled) {
                    this.selected = value
                    this.term = ''
                    this.hide()
                } else {
                    var found = this.$items.filter((val) => val.value == value)

                    if (found.length > 0) {
                        this.selected = found[0]
                    }
                }
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
                this.$emit('show')
            },
            afterEnter() {
                if (this.isSelected()) {
                    this.scrollIntoView(this.$items.indexOf(this.selected))
                }

                this.visible = true
                this.animating = false

                this.$emit('shown')
            },
            beforeLeave() {
                this.animating = true
                this.$emit('hide')
            },
            afterLeave() {
                this.animating = false
                this.visible = false

                if (this.isSelected() && this.term.length > 0) {
                    this.term = ''
                }

                this.$emit('hidden')
            },
            selectPrevious() {
                var pos = this.$items.indexOf(this.selected)

                if (pos > 0) {
                    this.selected = this.$items[--pos]
                    // this.$refs.items[pos].scrollIntoView(false)
                    this.scrollIntoView(pos)
                }
            },
            selectNext() {
                let pos = this.$items.indexOf(this.selected)

                if (++pos < this.$items.length) {
                    this.selected = this.$items[pos]
                    // this.$refs.items[pos].scrollIntoView(false)
                    this.scrollIntoView(pos)
                }
            },
            isSelected() {
                return this.isObject(this.selected)
                        && !(
                                Object.keys(this.selected).length === 0
                                && this.selected.constructor === Object
                            )
            },
            isObject(instance) {
                return !Array.isArray(instance) && instance === Object(instance)
            },
            scrollIntoView(pos) {
                var el = this.$refs.items[pos]
                var items = Math.floor(el.offsetParent.offsetHeight / el.offsetHeight)
                var scrollFixer = pos - items;

                if ((el.clientHeight * pos) - (items * el.clientHeight) >= el.offsetParent.scrollTop - scrollFixer) {
                    el.scrollIntoView(false)
                }

                if (el.offsetTop < el.offsetParent.scrollTop) {
                    el.scrollIntoView()
                }
            },
        },
        created() {
            if (typeof this.value == 'undefined' || this.value === null) {
                this.selected = {}
            }
        },
    }
</script>