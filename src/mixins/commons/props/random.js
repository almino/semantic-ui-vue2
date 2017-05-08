export default {
    type: String,
    required: false,
    default () {
        return Math.random().toString(36).substring(7)
    },
}