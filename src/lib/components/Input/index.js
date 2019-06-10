import React, { forwardRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
const Input = forwardRef(({ className, invalid, ...inputProps }, ref) => (
  <input {...inputProps} className={classnames('wrc-input', className, {
    'wrc-input--invalid': !!invalid,
    [`${className}--invalid`]: !!className && !!invalid,
  })} ref={ref} />
));

Input.propTypes = {
  invalid: PropTypes.bool,
}


export default Input;
