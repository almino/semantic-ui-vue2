import Grid from './grid.js'
import Form from './form.js'

import Input from '../elements/Input.vue'
import Label from '../elements/Label.vue'

import Checkbox from '../modules/Checkbox.vue'
import Modal from '../modules/Modal.vue'
import Dropdown from '../modules/Dropdown.vue'

export default {
    mixins: [
        Grid,
        Form,
    ],
    components: {
        'ui-input': Input,
        'ui-label': Label,
        'ui-checkbox': Checkbox,
        'ui-dropdown': Dropdown,
        'ui-modal': Modal,
    },
}
