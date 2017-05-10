import Constants from './constants.js';

const alignments = [
    Constants.bottom,
    Constants.center,
    Constants.left,
    Constants.middle,
    Constants.right,
    Constants.top,
];

export default {
    props: {
        align: {
            type: [String, Array],
        }
    },
    methods: {
        getAlignClasses() {
            // Do we have a value?
            if (typeof this.align == 'undefined') {
                return false;
            }

            // We can't work with the prop itself
            var prop = this.align;
            // We work only with accepted values
            var regexp = new RegExp(alignments.join('|'));

            // We don't want arrays, for now
            if (this.align.constructor === Array) {
                prop = this.align.join(' ');
            }

            // Cast as array
            prop = prop.split(/[^a-z]/).filter(Boolean);

            // Remove words not accepted
            for (var i = 0; i < prop.length; i++) {
                if (!prop[i].match(regexp)) {
                    prop.splice(i, 1);
                }
            }

            // If we don't have nothing to work
            if (prop.length < 1) {
                return false;
            }

            var glue = ' ' + Constants.aligned;
            return prop.join(glue + ' ') + glue;
        },
    },
}