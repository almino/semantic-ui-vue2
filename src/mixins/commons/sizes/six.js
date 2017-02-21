import Constants from '../constants.js';

const sizes = [
    Constants.massive,
    Constants.huge,
    Constants.big,
    Constants.large,
    Constants.small,
    Constants.mini,
];

export default {
    props: {
        size: {
            type: [String, Number],
            required: false,
            // default: false,
            validator(value) {
                return (value > 0 && value) < (sizes.length + 1) || sizes.indexOf(value) > -1;
            }
        },
    },
    methods: {
        getSemanticSizes(value) {
            if (typeof value === 'undefined') {
                return sizes;
            }

            return sizes[value - 1];
        },
        isSemanticSize(value) {
            return sizes.indexOf(value) > -1;
        },
        getSizeClasses() {
            return isNaN(this.size) ? this.size : this.getSemanticSizes(this.size);
        }
    }
}
