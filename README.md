# webdep-react-controls
React wrappers for form controls
## installation

Using npm:
```
npm install webdep-react-controls --save
```

Using yarn:
```
yarn add webdep-react-controls
```

## Styles
You should import styles separately from `webdep-react-controls/build/lib/styles.css`, or, if You using `sass` in your project,
just add `@import "~webdep-react-controls/src/lib/styles/styles.scss"`

## Components documentation
You can find detailed documentation for components in `webdep-react-controls/build/docs/index.html`.

## Components

### Button
Button component is simple wrapper for regular button.

#### Customization
To customize button styles just write styles from `wrc-button` class, or you can overwrite some sass variables:
```
$btn-font-size, $btn-darken-percentage, $btn-lighten-percentage, $button-border-radius, $button-border-style, button-border-width, $link-color, $link-color-hover, $link-color-disabled,
```

### Card

### Dialog

### Input

### Paginator

### Select

### Table

### Tooltip
Use tooltips for displaying some addition information, validation messages, e.t.c