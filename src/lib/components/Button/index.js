import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { WRCThemeContext } from '../Theme';

function getButtonClassNames(props, defaultClassName = 'wrc-button') {
  return classnames(
      defaultClassName,
      `${defaultClassName}--${props.state}`,
      {
        [`${defaultClassName}--${props.size}`]: props.state !== 'link',
        [`${defaultClassName}--disabled`]: !!props.disabled
      },
      props.className,
    );
}

/**
 * Button wrapper class
 */
const Button = forwardRef((props, ref) => {
  const context = useContext(WRCThemeContext).theme.button || {};
  const buttonClassName = context.buttonClassName;

  if(props.type === 'label') {
    return (
      <span ref={ref} className={getButtonClassNames(props, buttonClassName)}>{props.children}</span>
    );

  }
  else if (props.type === 'link') {
    const {type, state, ...linkProps} = props;
    return (
      <a ref={ref} role="link" {...linkProps } className={getButtonClassNames(props, buttonClassName)} />
    );
  }
  const { state, ...buttonProps } = props;
  return (<button role="button" ref={ref} {...buttonProps} className={getButtonClassNames(props, buttonClassName)} />);
})

Button.propTypes = {
  /** Is button disabled */
  disabled: PropTypes.bool,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'link', 'label']),
  /** responsible for button background */
  state: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  /** Button size */
  size: PropTypes.oneOf(['small', 'medium', 'big',]),
  /** Click button callback */
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'button',
  state: 'primary',
  size: 'medium',
}

export default Button;
