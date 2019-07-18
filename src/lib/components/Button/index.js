import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';

function getButtonClassNames(props, defaultClassName = 'wrc-button', theme) {
  const useBEM = theme ? theme.useBEM : false;
  const btnSizes = !!theme && !!theme.button && theme.button.sizeLabels ? theme.button.sizeLabels : {};
  const size = btnSizes[props.size] || props.size;
  let advancedClassNames;
  if(!!useBEM) {
    advancedClassNames = classnames(
      `${defaultClassName}--${props.state}`,
      {
        [`${defaultClassName}--${size}`]: props.state !== 'link',
        [`${defaultClassName}--outline`]: !!props.outline,
        [`${defaultClassName}--disabled`]: !!props.disabled,
      }
    );
  } else {
    advancedClassNames = classnames(`${defaultClassName}-${size}`, props.outline ? `${defaultClassName}-outline-${props.state}` : `${defaultClassName}-${props.state}`);
  }
  return classnames(
      defaultClassName,
      advancedClassNames,
      props.className,
    );
}

/**
 * Button wrapper class
 */
const Button = forwardRef((props, ref) => {
  const theme = useContext(WRCThemeContext).theme;
  const context = theme.button || {};
  const buttonClassName = context.buttonClassName;

  if(props.type === 'label') {
    return (
      <span ref={ref} className={getButtonClassNames(props, buttonClassName, theme)}>{props.children}</span>
    );

  }
  else if (props.type === 'link') {
    const {type, state, outline, ...linkProps} = props;
    return (
      <a ref={ref} role="link" {...linkProps } className={getButtonClassNames(props, buttonClassName, theme)} />
    );
  }
  const { state, outline, ...buttonProps } = props;
  return (<button role="button" ref={ref} {...buttonProps} className={getButtonClassNames(props, buttonClassName, theme)} />);
})

Button.propTypes = {
  /** Is button disabled */
  disabled: PropTypes.bool,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'link', 'label']),
  /** responsible for button background */
  state: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'large',]),
  /** Click button callback */
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  state: 'primary',
  size: 'medium',
}

export default Button;
