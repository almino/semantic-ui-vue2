<template lang="html">
    <div v-bind:class="classes.dimmer" v-on:click.self="hide">
        <div v-bind:class="classes.modal">
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
    </div>
</template>
<script>
    import Constants from '../mixins/common/constants.js'
    import LodashArray from 'lodash/array'

    export default {
        props: {
            header: {
                type: String,
            }
        },
        data() {
            return {
                classes: {
                    dimmer: [Constants.ui, Constants.dimmer],
                    modal: [Constants.ui, Constants.modal],
                    show: [Constants.visible, Constants.active]
                }
            }
        },
        methods: {
            hide() {
                this.classes.dimmer = LodashArray.without(this.classes.dimmer, this.classes.show)
                this.classes.modal = LodashArray.without(this.classes.modal, this.classes.show)
            },
            show() {
                this.classes.dimmer.push(this.classes.show);
                this.classes.modal.push(this.classes.show);
            }
        },
        mounted() {
            console.log();
        },
    }
</script>