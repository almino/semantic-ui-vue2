<template lang="html">
        <transition
            v-on:before-enter="dimmer.animating = true"
            enter-active-class="animating transition fade in"
            enter-to="classes.visible"
            v-on:after-enter="dimmerAfterEnter"
            v-on:before-leave="dimmer.animating = true"
            leave-active-class="animating transition fade out"
            leave-to="transition hidden">
            <div v-bind:class="classes.dimmer" key="2" v-show="dimmer.visible" v-on:click.self="hide">
                <transition
                    v-on:before-enter="modal.animating = true"
                    enter-active-class="animating transition scale in"
                    enter-to="classes.visible"
                    v-on:after-enter="modal.animating = false"
                    v-on:before-leave="modal.animating = true"
                    leave-active-class="animating transition scale out"
                    leave-to="transition hidden"
                    v-on:after-leave="modalAfterLeave">
                    <div v-bind:class="classes.modal" v-show="modal.visible">
                        <i class="close icon" v-on:click="hide"></i>
                        <div class="header" v-if="header || $slots.header">
                            <slot name="header">{{ header }}</slot>
                        </div>
                        <div class="content">
                            <slot></slot>
                        </div>
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
    // import LodashArray from 'lodash/array'

    export default {
        props: {
            header: {
                type: String,
            },
            active: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                // classes: {
                //     visible: [Constants.visible, Constants.active],
                //     dimmer: [Constants.ui, Constants.dimmer],
                //     modal: [Constants.ui, Constants.modal, Constants.transition]
                // },
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
                // visibility: {
                //     dimmer: false,
                //     modal: false,
                // },
                // animated: {
                //     dimmer: false,
                //     modal: false,
                // }
            }
        },
        computed: {
            classes() {
                var
                    visible = [Constants.visible, Constants.active],
                    dimmer = [Constants.ui, Constants.dimmer],
                    modal = [Constants.ui, Constants.modal, Constants.transition]

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

                return {dimmer, modal}
            },
        },
        methods: {
            dimmerAfterEnter(el, done) {
                this.dimmer.animating = false
                this.modal.visible = true
            },
            modalAfterLeave(el, done) {
                this.dimmer.visible = false
            },
            hide() {
                this.modal.visible = false
            },
            show() {
                this.dimmer.visible = true
            }
        },
        created() {
            /* Make sure modal is visible when component is created (based on attribute) */
            this.dimmer.visible = this.active
        },
        mounted() {},
    }
</script>