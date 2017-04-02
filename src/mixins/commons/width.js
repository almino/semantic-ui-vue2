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
        mobile: {
            type: [String, Number],
            required: false,
            // default: false,
            validator(value) {
                return (value > 0 && value < 17) || widths.indexOf(value) > -1;
            }
        },
        tablet: {
            type: [String, Number],
            required: false,
            // default: false,
            validator(value) {
                return (value > 0 && value < 17) || widths.indexOf(value) > -1;
            }
        },
        computer: {
            type: [String, Number],
            required: false,
            // default: false,
            validator(value) {
                return (value > 0 && value < 17) || widths.indexOf(value) > -1;
            }
        },
        widescreen: {
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
        getWidthClassesFor(type, width) {

            var classes = [];

            classes.unshift(Constants.wide, type);

            if (isNaN(width)) {
                classes.unshift(width);
            } else {
                classes.unshift(this.getSemanticWidths(width));
            }

            return classes;
        },
        getWidthClasses() {
            if (
                typeof this.width === 'undefined' &&
                typeof this.mobile === 'undefined' &&
                typeof this.tablet === 'undefined' &&
                typeof this.computer === 'undefined' &&
                typeof this.widescreen === 'undefined'
            ) {
                return false;
            }

            var classes = [];

            if (typeof this.mobile === 'undefined' &&
                typeof this.tablet === 'undefined' &&
                typeof this.computer === 'undefined' &&
                typeof this.widescreen === 'undefined'
            ) {
                classes.unshift(Constants.wide);

                if (isNaN(this.width)) {
                    classes.unshift(this.width);
                } else {
                    classes.unshift(this.getSemanticWidths(this.width));
                }
            } else {
                if (typeof this.widescreen !== 'undefined') {
                    classes.unshift(...this.getWidthClassesFor(Constants.widescreen, this.widescreen));
                }

                if (typeof this.computer !== 'undefined') {
                    classes.unshift(...this.getWidthClassesFor(Constants.computer, this.computer));
                }

                if (typeof this.tablet !== 'undefined') {
                    classes.unshift(...this.getWidthClassesFor(Constants.tablet, this.tablet));
                }

                if (typeof this.mobile !== 'undefined') {
                    classes.unshift(...this.getWidthClassesFor(Constants.mobile, this.mobile));
                }
            }

            return classes;
        }
    }
}