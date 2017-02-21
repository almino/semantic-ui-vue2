export default {
    methods: {
        arrayFlatten() {
            var result = [];

            for (var i = 0; i < arguments.length; i++) {
                if (Array.isArray(arguments[i])) {
                    result = result.concat(this.arrayFlatten(...arguments[i]));
                } else {
                    result.push(arguments[i]);
                }
            }

            return result;
        },

    }
}