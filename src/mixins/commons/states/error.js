export default {
    props: {
        error: {
            type: Boolean,
            required: false,
            default: false,
            // validator(value) {
            //     return true
            // },
        },
        error_message: {
            type: String,
            required: false,
        }
    }
}
