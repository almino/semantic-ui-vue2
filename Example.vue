<template>
    <div>
        <div class="ui container">
            <div class="ui segment">
                <ui-checkbox v-model="grid.container">container</ui-checkbox>
                <ui-checkbox v-model="grid.equalWidth">equal width</ui-checkbox>
                <ui-input type="number" min="1" max="16" v-model="grid.column">
                    <div class="ui label" slot="right-label">columns per row</div>
                </ui-input>
                <ui-dropdown selection v-bind:items="alignments" v-model="grid.align"></ui-dropdown>
            </div>
        </div>
        <ui-grid
            v-bind:container="grid.container"
            v-bind:equal-width="grid.equalWidth"
            v-bind:column="grid.column"
            v-bind:align="grid.align"
            v-bind:float="grid.float"
            v-bind:centered="grid.centered">
            <ui-column v-for="i in columns" key="i">{{ i }}</ui-column>
        </ui-grid>
    </div>
</template>

<script>
    import Constants from './src/mixins/commons/constants.js'
    import { Mixin } from './index.js'

    export default {
        mixins: [Mixin],
        data() {
            return {
                alignments: [
                    Constants.bottom,
                    Constants.center,
                    Constants.left,
                    Constants.middle,
                    Constants.right,
                    Constants.top,
                ],
                grid: {
                    container: false,
                    equalWidth: false,
                    column: 16,
                    align: '',
                    float: undefined,
                    centered: false,
                },
            }
        },
        computed: {
            columns() {
                return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu lectus, porttitor sit amet erat congue.'.split(' ')
            }
        }
    }
</script>

<style lang="less" scoped>
    /* Shows content box (not negative margins) */
    .grid {
    position: relative;
    }
    .grid:before {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: #F0F0F0;
    content: '';
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    box-shadow: 0px 0px 0px 1px #DDDDDD inset;
    }
    .ui.divided.grid:before,
    .celled.grid:before {
    display: none;
    }
    .ui.aligned .column:after {
    // display: none !important;
    }
    .grid .column:not(.row):not(.grid):after {
    background-color: rgba(86, 61, 124, .15);
    box-shadow: 0px 0px 0px 1px rgba(86, 61, 124, 0.2) inset;
    content: "";
    display: block;
    min-height: 50px;
    }
    @media only screen and (max-width: 768px) {
    .stackable.grid:before {
        width: 100%;
        left: 0em;
    }
    }

    .ui {
        &.segment {
            & > * {
                margin-left: 1em;

                &:first-child {
                    margin-left: 0;
                }
            }
        }

    }
</style>



