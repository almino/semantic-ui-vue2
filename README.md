# Semantic UI's Components

Components and mixins to use with Vue 2

## Installation

```bash
$ npm install semantic-ui-vue2
```

Include Semantic UI's CSS in your HTML. See [official docs](http://semantic-ui.com/introduction/getting-started.html#include-in-your-html).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.7/semantic.min.css">
```

## Usage

### Imports

Import the global mixin to use all the components. See [example](#example) below.

#### Components

Import individual components.

- `Grid` – component
- `Row` – component
- `Column` – component
- `Checkbox` – component
- `Dropdown` – component
- `Input` – component
- `Label` – component
- `Form` – component
- `Field` – component

```javascript
import {ComponentName} from 'semantic-ui-vue2'

export default {
    components: {
        'component-name': ComponentName,
                …
    },
    …
}
```

#### Collections

Mixins to import related components at once

- `Grid` – `ui-grid`, `ui-row`, `ui-column`
- `Form` – `ui-form`, `ui-field`

```javascript
import {Collections} from 'semantic-ui-vue2'

export default {
    mixins: [Collections.CollectionName]
    …
}
```

### Example

`App.vue`:

```html
<template lang="html">
    <ui-grid container>
        <ui-row>
            <ui-column>
                Lorem ipsum dolor sit amet
            </ui-column>
        </ui-row>
    </ui-grid>
</template>

<script>
import {Mixin} from 'semantic-ui-vue2'

export default {
    mixins: [Mixin]
}
</script>
```

Result:

```html
<div class="ui grid container">
    <div class="row">
        <div class="column">
            Lorem ipsum dolor sit amet
        </div>
    </div>
</div>
```
