export default {
    props: {
        type: {
            type: String,
            required: false,
            default: 'text',
            validator(value) {
                return [
                    'button',
                    'checkbox',
                    'color',
                    'date',
                    'datetime-local',
                    'email',
                    'file',
                    'hidden',
                    'image',
                    'month',
                    'number',
                    'password',
                    'radio',
                    'range',
                    'reset',
                    'search',
                    'submit',
                    'tel',
                    'text',
                    'time',
                    'url',
                    'week',
                ].indexOf(value) > -1
            }
        },
    }
}