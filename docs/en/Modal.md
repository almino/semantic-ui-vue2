# Modal

A modal displays content that temporarily blocks interactions with the main view of a site

## Requirements

- `semantic/components/modal[.min].css` or `semantic/src/definitions/modules/modal.less`
- `semantic/components/transition[.min].css` or `semantic/src/definitions/modules/transition.less`

## Attributes

Type |Attribute | Default | Description
-----|----------|---------|------------
`Boolean` | `basic` | `false` | A modal can reduce its complexity
`String` | `header` | `null` | A modal can have a header
`String` | `image` | `null` | A modal can contain image content
`String` or `Number` | `size` | `null` | A modal can vary in size
`Boolean` | `active` | `false` | An active modal is visible on the page
`Boolean` | `closable` | `false` | Setting to false will not allow you to close the modal by clicking on the dimmer
`String` | `transition` | `'scale'` | Named transition to use when animating menu in and out, full list can be found in [ui transitions](https://semantic-ui.com/modules/transition.html) docs.
`Number` | `duration` | `400` | Duration of animation
`Boolean` | `inverted` | `false` | A modal can be inverted


## Events

* `visible` &ndash; Is emmited after a modal has finished showing animating.
* `hidden` &ndash; 	Is emmited after a modal has finished hiding animation.
* `hide` &ndash; Is emmited after a modal starts to hide.
* `show` &ndash; Is emmited when a modal starts to show.

## Methods

* `hide` &ndash; Hides the modal
* `show` &ndash; 	Shows the modal
* `toggle` &ndash; Toggles the modal

## Slots

* default &ndash; A modal can contain content
* `header` &ndash; A modal can have a header
* `actions` &ndash; A modal can contain a row of actions
