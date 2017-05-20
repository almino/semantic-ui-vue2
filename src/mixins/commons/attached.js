import Constants from './constants.js';

const enums = [
    Constants.top,
    Constants.bottom,
    Constants.left,
    Constants.right
];

export default {
    props: {
        attached: {
            type: [Boolean, String],
            validator(value) {
                return value === true || enums.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getAttachedClasses() {
            if (this.attached === true) {
                return Constants.attached;
            }
            return this.attached ? [this.attached, Constants.attached].join(' ') : false;
        },
    },
}
