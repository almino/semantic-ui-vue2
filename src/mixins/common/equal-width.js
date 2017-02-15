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
            if (this.equalWidth) {
                return [Constants.equal, Constants.width];
            }

            return false;
        }
    }
}
