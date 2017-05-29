import Grid from './grid.js'
import Form from './form.js'
import Menu from './menu.js'

import Button from '../elements/Button.vue'
import ButtonLabel from '../elements/button/Label.vue'
import ButtonGroup from '../elements/button/Group.vue'
import ButtonOr from '../elements/button/Or.vue'

import Input from '../elements/Input.vue'
import Label from '../elements/Label.vue'

import Modal from '../modules/Modal.vue'

export default {
    mixins: [
        Grid,
        Form,
        Menu,
    ],
    components: {
        'ui-button': Button,
        'ui-button-label': ButtonLabel,
        'ui-button-group': ButtonGroup,
        'ui-button-or': ButtonOr,
        'ui-input': Input,
        'ui-label': Label,
        'ui-modal': Modal,
    },
}
