import Constants from './constants.js';

const enums = [
    Constants.mini,
    Constants.tiny,
    Constants.small,
    Constants.large,
    Constants.huge,
    Constants.massive,
];

export default {
    props: {
        size: {
            type: String,
            validator(value) {
                return enums.indexOf(value) > -1;
            },
        }
    },
    methods: {
        getFixedClasses() {
            return this.size ? this.size : false;
        },
    },
}
