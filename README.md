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

#### Props

| Name     | Type                                                                                                       | Default Value | Description                       |
|----------|------------------------------------------------------------------------------------------------------------|---------------|-----------------------------------|
| disabled | PropTypes.bool                                                                                             |               | Is button disabled                |
| type     | PropTypes.oneOf(['button', 'submit', 'link', 'label'])                                                     | 'button'      | Button type                       |
| state    | PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']) | 'primary'     | responsible for button background |
| size     | PropTypes.oneOf(['small', 'medium', 'big',])                                                               | 'medium'      | Button size                       |
| onClick  | PropTypes.func                                                                                             |               | Button click callback             |

### Card

### Dialog

### Input

### Paginator

### Select
Customized select control. It has options list, which appends to top of dom tree by `createPortal` function.

#### Customization
To customize select styles just write styles from `wrc-select` class, or you can overwrite some sass variables:
```
$options-list-max-height, $select-list-max-height, $select-height, $select-background-color, $options-list-background-color, $options-list-border-color, $options-border-width, $options-list-border-top-left-radius, $options-list-border-top-right-radius, $options-list-border-bottom-left-radius, $options-list-border-bottom-right-radius, $option-padding, $option-color, $option-border-bottom, $option-focused-color, $option-focused-bg, $option-selected-color, $option-selected-bg, $dropdown-z-index
```

#### Props

| Name                 | Type             | Default Value              | Description                                                                                                                                 |
|----------------------|------------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| options              | PropTypes.array  |                            | Select options list                                                                                                                         |
| enableSearch         | PropTypes.bool   |                            | If it is true, then search input will be displayed                                                                                          |
| optionNameFn         | PropTypes.func   |                            | Function to customize displaying select options in options list                                                                             |
| nameAccessor         | PropTypes.string | 'name'                     | If don't use optionNameFn, nameAccessor shold be key of option Name                                                                         |
| valueAccessor        | PropTypes.string | 'id'                       | Key, which contain value of option object                                                                                                   |
| triggerClassName     | PropTypes.string |                            | Class name of div, which display select placeholder or selected value                                                                       |
| optionsListClassName | PropTypes.string | 'wrc-select__options-list' |                                                                                                                                             |
| searchFn             | PropTypes.func   |                            | Function, which get search input value, current option and select props, which should return true if option satisfies the search conditions |

### Table

### Tooltip
Use tooltips for displaying some addition information, validation messages, e.t.c

#### Customization
To customize tooltip styles just write styles from `wrc-tooltip` class, or you can overwrite some sass variables:
```
$tooltip-border-radius, $tooltip-z-index, $tooltip-padding, $tooltip-caret-botder
```

#### Props

| Name      | Type                                                                                                       | Default Value | Description                                |
|-----------|------------------------------------------------------------------------------------------------------------|---------------|--------------------------------------------|
| position  | PropTypes.oneOf(['top', 'bottom', 'right', 'left'])                                                        | 'top'         | Is tooltip on top or on bottom from target |
| state     | PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']) | 'dark'        | Tooltip background color                   |
| body      | ropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func])                                   |               | Tooltip message                            |
| bodyStyle | PropTypes.object                                                                                           |               |                                            |