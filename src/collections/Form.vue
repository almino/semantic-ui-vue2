<template lang="html">
    <form v-bind:class="['ui', getEqualWidthClasses(), getSizeClasses(),
        { 'loading' : loading }, { 'inverted' : inverted }, 'form',
        { 'success' : success }, { 'error' : error }, { 'warning' : warning }]">
        <slot></slot>
    </form>
</template>

<script>
import Loading from '../mixins/common/states/loading.js'
import Success from '../mixins/common/states/success.js'
import Error from '../mixins/common/states/error.js'
import Warning from '../mixins/common/states/warning.js'
import Size from '../mixins/common/sizes/eight.js'
import EqualWidth from '../mixins/common/equal-width.js'
import Inverted from '../mixins/common/inverted.js'

export default {
    mixins: [Loading, Success, Error, Warning, Size, EqualWidth, Inverted],
}
</script>
