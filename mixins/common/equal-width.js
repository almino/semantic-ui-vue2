import Constants from './constants.js';

export default {
    props: {
        equalWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        getEqualWidthClasses() {
            return [Constants.equal, Constants.width];
        }
    }
}
