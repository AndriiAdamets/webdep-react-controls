import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const RadioIndicator = ({ checked }) => (
  <div className={classnames(
    'wrc-radio__indicator', {'wrc-radio__indicator--checked': !!checked}
    )}>
  </div>
);

/**
 * Radio is component for render input with 'radio' type
 */
const Radio = forwardRef((props, ref) => {
  const { label, indicator, ...inputProps } = props;
  const Indicator = indicator || RadioIndicator;

  return (
    <label className="wrc-radio">
      <Indicator {...props} />
      <input {...inputProps} type="radio" role="radio"
        className="wrc-radio"
        ref={ref} />
      <div className="wrc-radio__label">
        {label}
      </div>
    </label>
  );
});

Radio.propTypes = {
  /** Handler for change input value */
  onChange: PropTypes.func,
  /** Is input checked or not */
  checked: PropTypes.bool,
  /** is checkbox disabled */
  disabled: PropTypes.bool,
  /** Checkbox input text */
  label: PropTypes.string,
}

export default Radio;
