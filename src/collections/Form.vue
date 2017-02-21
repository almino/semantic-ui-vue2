<template lang="html">
    <form v-bind:class="['ui', getEqualWidthClasses(), getSizeClasses(),
        { 'loading' : loading }, { 'inverted' : inverted }, 'form',
        { 'success' : success }, { 'error' : error }, { 'warning' : warning }]">
        <slot></slot>
    </form>
</template>

<script>
import Loading from '../mixins/commons/states/loading.js'
import Success from '../mixins/commons/states/success.js'
import Error from '../mixins/commons/states/error.js'
import Warning from '../mixins/commons/states/warning.js'
import Size from '../mixins/commons/sizes/eight.js'
import EqualWidth from '../mixins/commons/equal-width.js'
import Inverted from '../mixins/commons/inverted.js'

export default {
    mixins: [Loading, Success, Error, Warning, Size, EqualWidth, Inverted],
}
</script>
