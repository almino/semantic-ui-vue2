<template lang="html">
        <transition
            v-on:before-enter="dimmer.animating = true"
            enter-active-class="animating transition fade in"
            enter-to="classes.visible"
            v-on:after-enter="dimmer.animating = false"
            v-on:before-leave="dimmer.animating = true"
            leave-active-class="animating transition fade out"
            leave-to="transition hidden"
            v-on:after-leave="dimmer.animating = false">
            <div
                v-bind:class="classes.dimmer"
                key="2"
                v-show="dimmer.visible"
                v-on:click.self="closable ? hide() : false"
                v-bind:style="style">
                <transition
                    v-on:before-enter="modal.animating = true"
                    enter-active-class="animating transition scale in"
                    enter-to="classes.visible"
                    v-on:after-enter="modal.animating = false"
                    v-on:before-leave="modal.animating = true"
                    leave-active-class="animating transition scale out"
                    leave-to="transition hidden"
                    v-on:after-leave="modal.animating = false">
                    <div
                        v-bind:class="classes.modal"
                        v-show="modal.visible"
                        v-bind:style="style">
                        <i class="close icon" v-if="closable" v-on:click="hide"></i>
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
    import Constants from '../mixins/common/constants.js'

    const sizes = [
        Constants.fullscreen,
        Constants.large,
        Constants.medium,
        Constants.small,
    ];

    export default {
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
                    return (value > 0 && value) < (sizes.length + 1) || sizes.indexOf(value) > -1;
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
            duration: {
                type: Number,
                default: 500,
            },
        },
        data() {
            return {
                dimmer: {
                    visible: false,
                    animating: false,
                    animated: false,
                },
                modal: {
                    visible: false,
                    animating: false,
                    animated: false,
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
                    modal = [Constants.ui]

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

                dimmer.push(Constants.dimmer);
                modal.push(Constants.modal);

                return {dimmer, modal}
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

                this.toggleVisibility(this.dimmer)
            },
            show() {
                if (this.dimmer.animating || this.modal.animating) {
                    return false;
                }

                this.dimmer.visible = true
                // this.modal.visible = true

                this.toggleVisibility(this.modal)
            }
        },
        created() {
            /* Make sure modal is visible when component is created (based on attribute) */
            this.dimmer.visible = this.active
            this.modal.visible = this.active
        },
    }
</script>