import Constants from './constants.js';

const columns = [
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
];

export default {
    props: {
        widths: {
            type: [String, Number],
            required: false,
            validator(value) {
                return (value > 0 && value < 17) || columns.indexOf(value) > -1;
            }
        },
    },
    methods: {
        getSemanticColumns(value) {
            if (typeof value === 'undefined') {
                return columns;
            }

            return columns[value - 1];
        },
        getWidthsClasses(type) {
            if (typeof this.widths === 'undefined') {
                return '';
            }

            var classes = [type];

            if (isNaN(this.widths)) {
                classes.unshift(this.widths);
            } else {
                classes.unshift(this.getSemanticColumns(this.widths));
            }

            return classes;
        },
    },
}
