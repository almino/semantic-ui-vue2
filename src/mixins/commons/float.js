import Constants from './constants.js';

const floatings = [
    Constants.left,
    Constants.right,
];

export default {
    props: {
        float: {
            type: String,
            validator(value) {
                return floatings.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getFloatClasses() {
            return this.float ? [this.float, Constants.floated].join(' '): false;
        },
    },
}