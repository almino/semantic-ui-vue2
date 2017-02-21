<template lang="html">
        <transition
            v-on:before-enter="dimmer.animating = true"
            v-bind:enter-active-class="animation.active.enter.dimmer"
            v-on:after-enter="dimmer.animating = false"
            v-on:before-leave="dimmer.animating = true"
            v-bind:leave-active-class="animation.active.leave.dimmer"
            v-on:after-leave="dimmer.animating = false">
            <div
                v-bind:class="classes.dimmer"
                key="2"
                v-show="dimmer.visible"
                v-on:click.self="closable ? hide() : false"
                v-bind:style="style">
                <transition
                    v-on:before-enter="modal.animating = true"
                    v-bind:enter-active-class="animation.active.enter.modal"
                    v-on:after-enter="modal.animating = false"
                    v-on:before-leave="modal.animating = true"
                    v-bind:leave-active-class="animation.active.leave.modal"
                    v-on:after-leave="modal.animating = false">
                    <div
                        v-bind:class="classes.modal"
                        v-show="modal.visible"
                        v-bind:style="style">
                        <i v-bind:class="[{ 'grey' : inverted }, 'close', 'icon']"
                            v-if="closable" v-on:click="hide"></i>
                        <div class="header" v-if="header || $slots.header">
                            <slot name="header">{{ header }}</slot>
                        </div>
                        <div class="image content" v-if="image || $slots.image">
                            <img class="image" v-bind:src="image" v-if="!$slots.image">
                            <div class="description"><slot></slot></div>
                        </div>
                        <div class="content" v-else><slot></slot></div>
                        <div class="actions" v-if="$slots.actions">
                            <slot name="actions"></slot>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
</template>

<script>
    import Constants from '../mixins/commons/constants.js'
    import Klass from '../mixins/commons/klass.js'

    const sizes = [
        Constants.fullscreen,
        Constants.large,
        Constants.medium,
        Constants.small,
    ];

    const transitions = [
        [Constants.horizontal, Constants.flip].join(' '),
        [Constants.vertical, Constants.flip].join(' '),
        [Constants.fade, Constants.up].join(' '),
        Constants.fade,
        Constants.scale,
    ];

    export default {
        mixins: [Klass],
        props: {
            basic: {
                type: Boolean,
                default: false,
            },
            header: {
                type: String,
            },
            image: {
                type: String,
            },
            size: {
                type: [String, Number],
                required: false,
                // default: false,
                validator(value) {
                    return (value > 0 && value) < (sizes.length + 1) || sizes.indexOf(value) > -1
                }
            },
            active: {
                type: Boolean,
                default: false,
            },
            closable: {
                type: Boolean,
                default: true,
            },
            transition: {
                type: String,
                default: 'scale',
                validator(value) {
                    return transitions.indexOf(value) > -1
                },
            },
            duration: {
                type: Number,
                default: 400,
            },
            inverted: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                dimmer: {
                    visible: false,
                    animating: false,
                },
                modal: {
                    visible: false,
                    animating: false,
                },
                style: {
                    animationDuration: this.duration + 'ms',
                }
            }
        },
        computed: {
            classes() {
                var
                    visible = [Constants.visible, Constants.active],
                    dimmer = [Constants.ui],
                    modal = [Constants.ui],
                    active = [Constants.animating, Constants.transition]

                /* http://semantic-ui.com/modules/modal.html#basic */
                if (this.basic) {
                    modal.push(Constants.basic);
                }

                /* http://semantic-ui.com/modules/modal.html#variations */
                if (typeof this.size !== 'undefined' && this.size != 3) {
                    modal.push(isNaN(this.size) ? this.size : sizes[this.size - 1])
                }

                if (this.active) {
                    modal.push(Constants.active)
                }

                if (this.inverted) {
                    dimmer.push(Constants.inverted)
                    modal.push(Constants.inverted)
                }

                /* Shows dimmer */
                if (this.dimmer.visible) {
                    dimmer.push(visible)
                }

                /* Show modal (if dimmer is also visible) */
                if (this.dimmer.visible && this.modal.visible) {
                    modal.push(visible)
                }

                /* Make sure animation works when dimmer is leaving */
                if (!this.dimmer.visible && this.dimmer.animating) {
                    dimmer.push(visible)
                }

                /* Make sure animation works when modal is leaving */
                if (!this.modal.visible && this.modal.animating && !this.dimmer.animating) {
                    modal.push(visible)
                }

                dimmer.push(Constants.modals, Constants.page, Constants.dimmer);
                modal.push(Constants.modal);

                return {dimmer, modal}
            },
            animation() {
                    var
                        klass = [Constants.animating, Constants.transition],
                        enter = Constants.in,
                        leave = Constants.out,
                        dimmer = Constants.fade,
                        modal = this.transition;

                    return {
                        active: {
                            enter: {
                                dimmer: this.arrayToClass(klass, dimmer, enter),
                                modal: this.arrayToClass(klass, modal, enter),
                            },
                            leave: {
                                dimmer: this.arrayToClass(klass, dimmer, leave),
                                modal: this.arrayToClass(klass, modal, leave),
                            },
                        },
                    }
            },
        },
        watch: {
            'modal.animating' : function(val, old) {
                if (!val && this.modal.visible) {
                    this.$emit('visible', this)
                }
            },
            'dimmer.animating' : function(val, old) {
                if (!val && !this.dimmer.visible) {
                    this.$emit('hidden', this)
                }
            },
        },
        methods: {
            toggleVisibility(el) {
                setTimeout(function() {
                    // console.log('disabling dimmer via timeout')
                    el.visible = !el.visible
                }, (25 / 100) * this.duration)
            },
            hide() {
                if (this.dimmer.animating || this.modal.animating) {
                    return false;
                }

                this.modal.visible = false
                // this.dimmer.visible = false

                this.$emit('hide', this)

                this.toggleVisibility(this.dimmer)
                this.toggleClass(document.body, Constants.dimmed)
            },
            show() {
                if (this.dimmer.animating || this.modal.animating) {
                    return false;
                }

                this.dimmer.visible = true
                // this.modal.visible = true

                this.$emit('show', this)

                this.toggleVisibility(this.modal)
                this.toggleClass(document.body, Constants.dimmed)
            },
            toggle() {
                this.dimmer.visible ? this.hide() : this.show()
            }
        },
        created() {
            /* Make sure modal is visible when component is created (based on attribute) */
            this.dimmer.visible = this.active
            this.modal.visible = this.active

            this.toggleClass(document.body, Constants.dimmable)
        },
    }
</script>