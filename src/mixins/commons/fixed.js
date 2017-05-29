import Constants from './constants.js';

const enums = [
    Constants.top,
    Constants.bottom,
    Constants.left,
    Constants.right
];

export default {
    props: {
        fixed: {
            type: String,
            validator(value) {
                return enums.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getFixedClasses() {
            return this.fixed ? [this.fixed, Constants.fixed].join(' ') : false;
        },
    },
}
