# Semantic UI's Components

Components and mixins to use with Vue 2

Example: `App.vue`

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
import Grid from './semantic/mixins/grid.js'

export default {
    mixins: [Grid]
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
