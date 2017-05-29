import Menu from '../collections/Menu.vue'
import MenuItem from '../collections/menu/Item.vue'
import MenuHeader from '../collections/menu/Header.vue'
import Submenu from '../collections/menu/Submenu.vue'

export default {
    components: {
        'ui-menu': Menu,
        'ui-menu-item': MenuItem,
        'ui-menu-header': MenuHeader,
        'ui-submenu': Submenu,
    }
}
