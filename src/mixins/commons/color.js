import Constants from './constants.js';

const enums = [
    Constants.red,
    Constants.orange,
    Constants.yellow,
    Constants.olive,
    Constants.green,
    Constants.teal,
    Constants.blue,
    Constants.violet,
    Constants.purple,
    Constants.pink,
    Constants.brown,
    Constants.grey,
    Constants.black,
];

export default {
    props: {
        color: {
            type: String,
            validator(value) {
                return enums.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getColorClass() {
            return this.color ? this.color : false;
        },
    },
}
