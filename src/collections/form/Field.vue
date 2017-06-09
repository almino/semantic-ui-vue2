<template lang="html">
    <div v-bind:class="[getWidthClasses(), { 'inline' : inline },
        { 'required' : required }, { 'disabled' : disabled }, 'field',
        { 'error' : error }]">
        <label v-bind:for="id">
            {{ label }}
            <slot name="label"></slot>
        </label>
        <input
            v-bind:id="id"
            v-bind:accept="accept"
            v-bind:alt="alt"
            v-bind:autocomplete="autocomplete"
            v-bind:autofocus="autofocus"
            v-bind:checked="checked"
            v-bind:dirname="dirname"
            v-bind:disabled="disabled"
            v-bind:form="form"
            v-bind:formaction="formaction"
            v-bind:formenctype="formenctype"
            v-bind:formmethod="formmethod"
            v-bind:formnovalidate="formnovalidate"
            v-bind:formtarget="formtarget"
            v-bind:list="list"
            v-bind:max="max"
            v-bind:maxlength="maxlength"
            v-bind:min="min"
            v-bind:multiple="multiple"
            v-bind:name="name"
            v-bind:pattern="pattern"
            v-bind:placeholder="placeholder"
            v-bind:readonly="readonly"
            v-bind:required="required"
            v-bind:src="src"
            v-bind:step="step"
            v-bind:type="type"
            v-bind:value="value"
            v-on:keydown="emitKeyDown"
            v-on:keypress="emitKeyPress"
            v-on:keyup="emitKeyUp"
            v-on:mouseenter="emitMouseEnter"
            v-on:mouseover="emitMouseOver"
            v-on:mousemove="emitMouseMove"
            v-on:mousedown="emitMouseDown"
            v-on:mouseup="emitMouseUp"
            v-on:click="emitClick"
            v-on:dblclick="emitDoubleClick"
            v-on:wheel="emitWheel"
            v-on:mouseleave="emitMouseLeave"
            v-on:mouseout="emitMouseOut"
            v-on:pointerlockchange="emitPointerLockChange"
            v-on:pointerlockerror="emitPointerLockError"
            v-on:blur="emitBlur"
            v-on:change="emitChange($event.target.value)"
            v-on:contextmenu="emitContextMenu"
            v-on:focus="emitFocus"
            v-on:input="emitInput($event.target.value)"
            v-on:invalid="emitInvalid"
            v-on:reset="emitReset"
            v-on:search="emitSearch"
            v-on:select="emitSelect"
            v-on:submit="emitSubmit"
            ref="input" />
    </div>
</template>

<script>
import Input from '../../mixins/commons/input/'
import RandomProp from '../../mixins/commons/props/random.js'
import Error from '../../mixins/commons/states/error.js'
import Width from '../../mixins/commons/width.js'

export default {
    mixins: [Input, Error, Width],
    props: {
        label: {
            type: String,
        },
        id: RandomProp,
        inline: {
            type: Boolean,
            required: false,
            default: false,
        },
    }
}
</script>
