import Constants from './constants.js';

const widths = [
    Constants.one,
    Constants.two,
    Constants.three,
    Constants.four,
    Constants.five,
    Constants.six,
    Constants.seven,
    Constants.eight,
    Constants.nine,
    Constants.ten,
    Constants.eleven,
    Constants.twelve,
    Constants.thirteen,
    Constants.fourteen,
    Constants.fifteen,
    Constants.sixteen,
]

export default {
    props: {
        width: {
            type: [String, Number],
            required: false,
            // default: false,
            validator(value) {
                return (value > 0 && value < 17) || widths.indexOf(value) > -1;
            }
        },
    },
    methods: {
        getSemanticWidths(value) {
            if (typeof value === 'undefined') {
                return widths;
            }

            return widths[value - 1];
        },
        getWidthClasses() {
            var classes = [Constants.wide];

            if (isNaN(this.width)) {
                classes.unshift(this.width);
            } else {
                classes.unshift(this.getSemanticWidths(this.width));
            }

            return classes;
        }
    }
}
