import Arrai from './arrai.js'

export default {
    mixins: [Arrai],
    methods: {
        toggleClass(el, className) {
            if (!Array.isArray(className)) {
                className = className.split(' ')
            }

            for (var i = 0; i < className.length; i++) {
                if (el.classList) {
                    el.classList.toggle(className);
                } else {
                    var classes = el.className.split(' ');
                    var existingIndex = classes.indexOf(className);

                    if (existingIndex >= 0)
                        classes.splice(existingIndex, 1);
                    else
                        classes.push(className);

                    el.className = classes.join(' ');
                }
            }
        },
        addClass(el, className) {
            if (!Array.isArray(className)) {
                className = className.split(' ')
            }

            for (var i = 0; i < className.length; i++) {
                if (el.classList)
                    el.classList.add(className)
                else
                    el.className += ' ' + className
            }
        },
        arrayToClass(arrays) {
            return this.arrayFlatten(...arguments).join(' ');
        }
    }
}