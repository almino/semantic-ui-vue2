import Constants from './constants.js';

const enums = [
    Constants.left,
    Constants.right
];

export default {
    props: {
        labeled: {
            type: [Boolean, String],
            required: false,
            default: false,
            validator(value) {
                if (typeof value == 'boolean') {
                    return true;
                }
                return enums.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getLabeledClasses() {
            if (this.labeled === true) {
                return Constants.labeled;
            }
            return this.labeled ? [this.labeled, Constants.labeled].join(' ') : false;
        },
    },
}
