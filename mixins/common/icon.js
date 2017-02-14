import Constants from './constants.js';

export default {
    props: {
        icon: {
            type: String,
            required: false,
            // default: false
        },
        iconPosition: {
            type: String,
            required: false,
            default: Constants.right,
            validator(value) {
                return value == Constants.right || value == Constants.left
            }
        },
        leftIcon: {
            type: String,
            required: false,
            // default: 'left',
            // validator(value) {
            //     return true
            // }
        },
    },
    methods: {
        getIconClasses() {
            var classes = []

            if (this.icon) {
                if (this.iconPosition == Constants.left) {
                    classes.push(this.iconPosition);
                }

                classes.push(Constants.icon);
            }

            return classes
        }
    }
}
