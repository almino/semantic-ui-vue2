export default {
    props: {
        as: {
            type: String,
            required: false,
        },
    },
    methods: {
        getSemanticColumns(value) {
            if (typeof value === 'undefined') {
                return columns;
            }

            return columns[value - 1];
        },
        getComponentType(defaultType = 'div') {
            return this.as? this.as : defaultType;
        }
    },
}
