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
        column: {
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
        getColumnClasses() {
            if (typeof this.column === 'undefined') {
                return '';
            }

            var classes = [Constants.column];

            if (isNaN(this.column)) {
                classes.unshift(this.column);
            } else {
                classes.unshift(this.getSemanticColumns(this.column));
            }

            return classes;
        },
    },
}