import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const CheckboxIndicator = ({ checked }) => (
  <div className={classnames(
    'wrc-checkbox__indicator', {'wrc-checkbox__indicator--checked': !!checked}
    )}>
  </div>
);

/**
 * Checkbox is component for render input with 'checkbox' type
 */
const Checkbox = forwardRef((props, ref) => {
  const { label, indicator, ...inputProps } = props;
  const Indicator = indicator;

  return (
    <label className="wrc-checkbox">
      <Indicator {...props} />
      <input {...inputProps} type="checkbox" role="checkbox"
        className="wrc-checkbox"
        ref={ref} />
      <div className="wrc-checkbox__label">
        {label}
      </div>
    </label>
  );
})

Checkbox.propTypes = {
  renderer: PropTypes.oneOf([PropTypes.func, PropTypes.node]),
  /** Handler for change input value */
  onChange: PropTypes.func,
  /** Is input checked or not */
  checked: PropTypes.bool,
  /** is checkbox disabled */
  disabled: PropTypes.bool,
  /** Checkbox input text */
  label: PropTypes.string,
}

Checkbox.defaultProps = {
  indicator: CheckboxIndicator,
}

export default Checkbox;
